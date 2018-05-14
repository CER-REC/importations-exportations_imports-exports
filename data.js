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
  'Crude Oil Imports': 'crudeOilImports',
  'Crude Oil Exports': 'crudeOilExports',
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
  const digits = Math.ceil(v).toString().length - 3
  if (digits < 0) { return v }

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
  .then(data => data.map((point) => {
    let product = ''
    if (point.product === 'Crude Oil') {
      const productName = `${point.product} ${point.activity}`
      product = productMap[productName]
    } else {
      product = productMap[point.product]
    }
    return {
      period: stripNA(point.period),
      year: parseInt(point.period.substr(0, 4), 10),
      quarter: parseInt(point.period.substr(5, 1), 10),
      product,
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
    }
  }))
  // Strip RPP/Crude imports, since they aren't used in the visualization right now
  .then(points => points.filter((point) => (
    point.activity !== 'imports' || point.product !== 'refinedPetroleumProducts'
  )))
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
      originContinent: originRegion.get('continent') || '',
      destinationCountry: destinationRegion.get('country') || '',
      destinationKey: destinationRegion.get('originKey') || '',
      destinationContinent: destinationRegion.get('continent') || '',
    }
  }))
  // Add forAverageValue and forAverageDivisor to rate units
  .then(points => points.map((point) => {
    if (point.units === 'thousand m3/d' || point.units === 'm3/d') {
      point.forAverageValue = point.value
      point.forAverageDivisor = 1
    }
    return point
  }))
  // Cluster the points into visualizations, units, and period
  .then(points => points.reduce((acc, point) => {
    if (!acc[point.product]) { acc[point.product] = {} }
    // Use an object reference to simplify the next creation
    const outProd = acc[point.product]
    if (!outProd[point.units]) { outProd[point.units] = {} }
    const outUnit = outProd[point.units]
    if (!outUnit[point.period]) { outUnit[point.period] = [] }

    // Fix destinations for crude oil when not destined for a PADD
    if (point.product === 'crudeOil' && point.destination === '') {
      point.destination = 'ca'
    }

    outUnit[point.period].push(point)
    return acc
  }, {}))
  // Add the matching quantity for the $/measurement units
  .then((visualizations) => {
    const addValidationIssue = (label, issue) => {
      if (!parsingIssue[label]) { parsingIssue[label] = [] }
      parsingIssue[label].push(issue)
    }

    const addQuantity = (viz, priceUnit, amountUnit, matchFuncFactory) => {
      const priceData = visualizations[viz][priceUnit]
      const amountData = visualizations[viz][amountUnit]

      Object.values(priceData).forEach((period) => {
        period.forEach((point) => {
          const matchFunc = matchFuncFactory(point)
          const matchingAmountPoints = amountData[point.period].filter(matchFunc)
          if (matchingAmountPoints.length !== 1) {
            const validationLabel = `Can't calculate averages for ${viz} - ${priceUnit} and ${amountUnit}:`
            addValidationIssue(validationLabel, {
              origin: point.origin,
              destination: point.destination,
              port: point.port,
              activity: point.activity,
              period: point.period,
              matchingAmountPoints: matchingAmountPoints.length,
            })
            // 0 will be used to indicate these are missing values
            // https://trello.com/c/rLeWzKXJ/75-price-views-should-show-averages-not-totals#comment-5aa997af6f16e46bb2c971a6
            point.forAverageDivisor = 0
            point.forAverageValue = 0
          } else {
            point.forAverageDivisor = matchingAmountPoints[0].value
            point.forAverageValue = point.value * point.forAverageDivisor
          }
        })
      })
    }

    addQuantity(
      'electricity',
      'CAN$/MW.h',
      'MW.h',
      point => match => (match.origin === point.origin && match.destination === point.destination),
    )
    addQuantity(
      'naturalGas',
      'CN$/GJ',
      'thousand m3/d',
      point => match => (match.port === point.port && match.originalActivity === point.originalActivity),
    )

    return visualizations
  })
  // Remove the periods from the visualizations, now that we're done preparing for averages
  .then((visualizations) => {
    Object.keys(visualizations).forEach((vizName) => {
      Object.keys(visualizations[vizName]).forEach((unit) => {
        visualizations[vizName][unit] = [].concat(...Object.values(visualizations[vizName][unit]))
      })
    })
    return visualizations
  })
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
          const averageData = {}
          const regionValues = unitPoints
            .reduce((acc, next) => {
              if (next.forAverageDivisor) {
                const destination = next.destination || next.origin || next.port
                if (!averageData[destination]) {
                  averageData[destination] = { value: 0, divisor: 0 }
                }
                const averageDest = averageData[destination]
                averageDest.value += next.forAverageValue
                averageDest.divisor += next.forAverageDivisor

                return {
                  ...acc,
                  [destination]: (averageDest.quantity === 0)
                    ? 0
                    : Math.round(averageDest.value / averageDest.divisor),
                }
              }
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
            console.log(visName, jenksValues, regionValues)
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
            .map((max, i, arr) => (
              (unit === 'CAN$/MW.h' || unit === 'CN$/GJ')
                ? [(i === 0) ? 0 : arr[i - 1], max]
                : [(i === 0) ? 0 : humanNumber(arr[i - 1]), humanNumber(max)]
            ))
        })

        return accBins
      }, {})

    // Units with weighted averages should be uncapped on both ends
    valueBins.electricity['CAN$/MW.h'][0][0] = Number.MIN_SAFE_INTEGER
    valueBins.electricity['CAN$/MW.h'][4][1] = Number.MAX_SAFE_INTEGER
    valueBins.naturalGas['CN$/GJ'][0][0] = Number.MIN_SAFE_INTEGER
    valueBins.naturalGas['CN$/GJ'][4][1] = Number.MAX_SAFE_INTEGER

    return { data: output, bins: valueBins }
  })
  .then((output) => {
    const scalingValues = Object.keys(output.data)
      .reduce((timelineScale, visName) => {
        timelineScale[visName] = {}
        Object.keys(output.data[visName]).forEach((unit) => {
          if (!timelineScale[visName][unit]) {
            timelineScale[visName][unit] = {}
          }
          const unitPoints = Object.values(output.data[visName][unit])
          const aggregatedValueByPeriod = Object.values(unitPoints).reduce((acc, point) => {
            if (!acc[point.period]) {
              acc[point.period] = {}
            }
            if (!acc[point.period][point.activity]) {
              acc[point.period][point.activity] = {
                transport: {},
                productSubtype: {},
                activityTotal: 0,
              }
            }
            const transport = acc[point.period][point.activity].transport[point.transport] || 0
            acc[point.period][point.activity].transport[point.transport] = transport + point.value

            const transportTotal = acc[point.period][point.activity].transport.total || 0
            acc[point.period][point.activity].transport.total = transportTotal + point.value

            const productSubtype = acc[point.period][point.activity].productSubtype[point.productSubtype] || 0
            acc[point.period][point.activity].productSubtype[point.productSubtype] = productSubtype + point.value

            const productSubtypeTotal = acc[point.period][point.activity].productSubtype.total || 0
            acc[point.period][point.activity].productSubtype.total = productSubtypeTotal + point.value

            acc[point.period][point.activity].activityTotal += point.value
            return acc
          }, {})

          Object.values(aggregatedValueByPeriod).forEach((point) => {
            Object.entries(point).forEach(([activity, values]) => {
              if (!timelineScale[visName][unit][activity]) {
                timelineScale[visName][unit][activity] = {
                  transport: {},
                  productSubtype: {},
                  activityTotal: 0,
                }
                Object.entries(values.transport).forEach(([transport, value]) => {
                  if (!timelineScale[visName][unit][activity].transport) {
                    timelineScale[visName][unit][activity].transport = {}
                  }
                  const transportValue = timelineScale[visName][unit][activity].transport[transport] || 0
                  timelineScale[visName][unit][activity].transport[transport] = value > transportValue ? value : transportValue
                })
                Object.entries(values.productSubtype).forEach(([productSubtype, value]) => {
                  if (!timelineScale[visName][unit][activity].productSubtype) {
                    timelineScale[visName][unit][activity].productSubtype = {}
                  }
                  const productSubtypeValue = timelineScale[visName][unit][activity].productSubtype[productSubtype] || 0
                  timelineScale[visName][unit][activity].productSubtype[productSubtype] = value > productSubtypeValue ? value : productSubtypeValue
                })
                const activityTotal = timelineScale[visName][unit][activity].activityTotal || 0
                timelineScale[visName][unit][activity].activityTotal = activityTotal > values.activityTotal ? activityTotal : values.activityTotal
              }
            })
          })
        })
        return timelineScale
      }, {})
    output.scale = scalingValues
    return output
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
