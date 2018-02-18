/* eslint-disable no-param-reassign, no-console */
const fs = require('fs')
const Path = require('path')
const csvParse = require('csv-parse/lib/sync')
const OriginVaildator = require('./app/validators/OriginValidator.js')
const ss = require('simple-statistics')

function stripNA(input) {
  if (input.toUpperCase() === 'N/A') { return '' }
  return input
}

const activityGroupMap = {
  Imports: 'importsExports',
  Exports: 'importsExports',
  'Import / Re-exports': 'importsForReexport',
  'Re-export / Imports': 'importsForReexport',
  'Export / Re-imports': 'exportsForReimport',
  'Re-import / Exports': 'exportsForReimport',
  'N/A': 'N/A',
}

const activityMap = {
  Imports: 'imports',
  Exports: 'exports',
  'Import / Re-exports': 'imports',
  'Re-export / Imports': 'exports',
  'Export / Re-imports': 'exports',
  'Re-import / Exports': 'imports',
  'N/A': 'N/A',
}

const productMap = {
  Electricity: 'electricity',
  'Crude Oil': 'crudeOil',
  Gas: 'naturalGas',
  NGLs: 'naturalGasLiquids',
  RPPs: 'refinedPetroleumProducts',
}

const printingValidationError = (errorArray, region, point, type) => {
  // Printing error on the UI so that data can be verified
  if (region.get('isValid') === false) {
    if (typeof errorArray[region.get('error')] === 'undefined') {
      errorArray[region.get('error')] = { product: point.product, numberOfRows: 0, type }
    } else {
      errorArray[region.get('error')].numberOfRows = errorArray[region.get('error')].numberOfRows + 1
    }
  }
  return errorArray
}

const humanNumber = (v) => {
  const digits = v.toString().length - 3
  if (digits < 0) { return 0 }

  const scale = parseInt(`1${new Array(digits).fill(0).join('')}`, 10)
  return Math.ceil(v / scale) * scale
}

const parsingIssue = {};

(new Promise(resolve => resolve(csvParse(
  fs.readFileSync(Path.resolve(__dirname, 'public/data/data.csv')),
  {
    // Use the callback method to replace the file headers with our own
    columns: () => ['period', 'product', 'productSubtype', 'transport', 'origin', 'destination', 'port', 'activity', 'units', 'value'],
  },
))))
  // Map over the data and normalize it
  .then(data => data.map(point => ({
    period: stripNA(point.period),
    year: parseInt(point.period.substr(0, 4), 10),
    quarter: parseInt(point.period.substr(5, 1), 10),
    product: productMap[point.product],
    productSubtype: stripNA(point.productSubtype),
    transport: stripNA(point.transport),
    origin: stripNA(point.origin),
    destination: stripNA(point.destination),
    port: stripNA(point.port),
    activityGroup: stripNA(activityGroupMap[point.activity]),
    activity: stripNA(activityMap[point.activity]),
    originalActivity: stripNA(point.activity),
    units: stripNA(point.units),
    confidential: (point.value.toLowerCase() === 'confidential'),
    value: parseInt(stripNA(point.value), 10) || 0,
    extrapolated: false,
  })))
  // Validate points
  .then(points => points.map((point) => {
    // Data Vaildation and parsing
    const originRegion = OriginVaildator.originNameValidator(point.origin)
    const destinationRegion = OriginVaildator.originNameValidator(point.destination)

    printingValidationError(parsingIssue, originRegion, point, 'origin')
    printingValidationError(parsingIssue, destinationRegion, point, 'destination')

    return {
      ...point,
      country: originRegion.get('country') || '',
      originKey: originRegion.get('originKey') || '',
      destinationCountry: destinationRegion.get('country') || '',
      destinationKey: destinationRegion.get('originKey') || '',
    }
  }))
  // Cluster the points into visualizations and units
  .then(points => points.reduce((acc, point) => {
    if (!acc[point.product]) { acc[point.product] = {} }
    if (point.product === 'crudeOil' && point.destination === '') {
      point.destination = 'ca'
    }
    // Use an object reference to simplify the next creation
    const outProd = acc[point.product]
    if (!outProd[point.units]) { outProd[point.units] = [] }
    outProd[point.units].push(point)
    //add destination as well 
    return acc
  }, {}))
  // Calculate bins
  .then((output) => {
    // Loop over the visualizations
    const valueBins = Object.keys(output)
      // Filter out RPPs, as they don't have map tiles or need bins
      .filter(k => (k !== 'refinedPetroleumProducts'))
      .reduce((accBins, visName) => {
        accBins[visName] = {}
        // Loop over the units in this vis
        Object.keys(output[visName]).forEach((unit) => {
          // Take the values from the object for this unit
          const unitPoints = Object.values(output[visName][unit])
          const regionValues = unitPoints
            .reduce((acc, next) => {
              if (visName === 'crudeOil' || visName === 'naturalGasLiquids') {
                return {
                  ...acc,
                  [next.destination]:
                    (acc[next.destination] || 0) + next.value,
                }
              }
              return {
                ...acc,
                [next.origin || next.port]:
                  (acc[next.origin || next.port] || 0) + next.value,
              }
            }, {})
          const jenksValues = Object.keys(regionValues).map(k => regionValues[k])
          if (jenksValues.length < 5) {
            console.log(visName, jenksValues, unitPoints)
          }
          accBins[visName][unit] = ss.ckmeans(jenksValues, 5)
            .map(v => ([
              Math.min(...v),
              Math.max(...v),
            ]))
            .reduce((acc, [, max], i, arr) => {
              if (i + 1 === arr.length) { return acc.concat(max) }
              const nextMin = arr[i + 1][0]
              const maxMidpoint = ((nextMin - max) / 2) + max
              return acc.concat(maxMidpoint)
            }, [])
            .map((max, i, arr) => ([
              (i === 0) ? 0 : humanNumber(arr[i - 1]),
              humanNumber(max),
            ]))
        })
        return accBins
      }, {})
    return { data: output, bins: valueBins }
  })
  // Output validation and write the file
  .then((finalOutput) => {
    console.log('/********************* Starts: Error in validating data *********************/')
    console.log(parsingIssue)
    console.log('/********************* Finish: Error in validating data *********************/')

    fs.writeFileSync(
      Path.resolve(__dirname, 'public/data/data.json'),
      JSON.stringify(finalOutput),
    )
  })
  .catch((e) => {
    console.log('Caught error while generating data:\n', e)
  })
