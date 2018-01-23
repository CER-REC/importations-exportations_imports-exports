/* eslint-disable no-param-reassign, no-console */
const fs = require('fs')
const Path = require('path')
const CSVParse = require('csv-parse')
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

const parser = CSVParse({
  // Use the callback method to replace the file headers with our own
  columns: () => ['period', 'product', 'productSubtype', 'transport', 'origin', 'destination', 'port', 'activity', 'units', 'value'],
}, (err, data) => {
  if (err) { throw err }
  const output = {}
  const parsingIssue = {}
  const valueBins = {}
  data.forEach((point) => {
    // Normalize the data. We can safely mutate args in this situation
    point.product = productMap[point.product]

    if (!output[point.product]) { output[point.product] = {} }
    // Use an object reference to simplify the next creation
    const outProd = output[point.product]
    if (!outProd[point.units]) { outProd[point.units] = [] }

    // check for the confidential data
    const confidential = (point.value.toLowerCase() === 'confidential')

    // Data Vaildation and parsing
    const originRegion = OriginVaildator.originNameValidator(point.origin)
    const destinationRegion = OriginVaildator.originNameValidator(point.destination)

    printingValidationError(parsingIssue, originRegion, point, 'origin')
    printingValidationError(parsingIssue, destinationRegion, point, 'destination')

    outProd[point.units].push({
      period: stripNA(point.period),
      year: parseInt(point.period.substr(0, 4), 10),
      quarter: parseInt(point.period.substr(5, 1), 10),
      product: point.product,
      productSubtype: stripNA(point.productSubtype),
      transport: stripNA(point.transport),
      origin: stripNA(point.origin),
      country: originRegion.get('country') || '',
      originKey: originRegion.get('originKey') || '',
      destinationCountry: destinationRegion.get('country') || '',
      destinationKey: destinationRegion.get('originKey') || '',
      destination: stripNA(point.destination),
      port: stripNA(point.port),
      activityGroup: stripNA(activityGroupMap[point.activity]),
      activity: stripNA(activityMap[point.activity]),
      originalActivity: stripNA(point.activity),
      units: stripNA(point.units),
      confidential,
      value: parseInt(stripNA(point.value), 10) || 0,
    })
  })

  const humanNumber = (v, floor = true) => {
    const digits = v.toString().length - 3
    if (digits < 0) { return 0 }

    const scale = parseInt(`1${new Array(digits).fill(0).join('')}`, 10)
    return (floor ? Math.floor(v / scale) : Math.ceil(v / scale)) * scale
  }

  Object.keys(output).filter(k => (k !== 'refinedPetroleumProducts')).forEach((visName) => {
    valueBins[visName] = {}
    Object.keys(output[visName]).forEach((unit) => {
      const values = Object.keys(output[visName][unit]).map(k => output[visName][unit][k])
      const regionValues = values
        .reduce((acc, next) => Object.assign({}, acc, {
          [next.origin]: (acc[next.origin] || 0) + next.value,
          [next.destination]: (acc[next.destination] || 0) + next.value,
          [next.port]: (acc[next.destination] || 0) + next.value,
        }), {})
      const jenksValues = Object.keys(regionValues).map(k => regionValues[k])
      console.log(visName, unit, jenksValues.length)
      /*
      // Process the bins using ckmeans, which is recommended over Jenks
      const jenksBins = ss.ckmeans(jenksValues, 5)
      console.log(jenksBins.map(v => v[0].toLocaleString()))
      */
      valueBins[visName][unit] = ss.jenks(jenksValues, 5)
        .slice(0, -1)
        .map((v, i, arr) => ([
          humanNumber(v),
          (i + 1 < arr.length) ? humanNumber(arr[i + 1]) : humanNumber(v, false),
        ]))
    })
  })
  console.log(JSON.stringify(valueBins, null, '  '))

  console.log('/********************* Starts: Error in validating data *********************/')
  console.log(parsingIssue)
  console.log('/********************* Finish: Error in validating data *********************/')

  fs.writeFileSync(
    Path.resolve(__dirname, 'public/data/data.json'),
    JSON.stringify({ data: output, bins: valueBins })
  )
})

fs.createReadStream(Path.resolve(__dirname, 'public/data/data.csv')).pipe(parser)
