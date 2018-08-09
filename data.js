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

const rateUnits = ['thousand m3/d', 'm3/d']

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

const parsingIssue = {}
// Creating a french CSV file with English Data
const englishData = fs.readFileSync(Path.resolve(__dirname, 'public/data/NEB_imports_exports_data.csv'), 'utf8')
const frenchData = englishData.split('\n')
frenchData[0] = 'Période,Produit,Sous-Type de Produit/Catégorie/Article,Mode de Transport,Origine,Destination,Port,Activité,Unité,Valeurs'
fs.writeFileSync(Path.resolve(__dirname, 'public/data/NEB_importations_exportations_les_données.csv'), frenchData.join('\n'));

(new Promise(resolve => resolve(csvParse(
  englishData,
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
      value: parseFloat(stripNA(point.value)) || 0,
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
    let destinationCountry= destinationRegion.get('country') || ''
    let destinationKey = destinationRegion.get('originKey') || ''
    if (point.product === 'crudeOilImports' && destinationCountry === 'Canada') {
      destinationCountry = 'ca'
      destinationKey = 'ca'
    }
    return {
      ...point,
      country: originRegion.get('country') || '',
      originKey: originRegion.get('originKey') || '',
      originContinent: originRegion.get('continent') || '',
      destinationCountry,
      destinationKey,
      destinationContinent: destinationRegion.get('continent') || '',
    }
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
    if ((point.product === 'crudeOilExports' || point.product === 'crudeOilImports') && point.destination === '') {
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
          let unitPoints = Object.values(output[visName][unit])
          if (visName === 'crudeOilImports') {
            // This is a dirty workaround for calculating bins by continent.
            // We group all of the values for each continent and period into a
            // single value, so that we average by (continent*periods) points
            // instead of (countries*periods) points
            unitPoints = Object.values(unitPoints.reduce((acc, next) => {
              if (!acc[`${next.originContinent}-${next.period}`]) {
                acc[`${next.originContinent}-${next.period}`] = {
                  destination: next.originContinent,
                  value: 0,
                }
              }
              acc[`${next.originContinent}-${next.period}`].value += next.value
              return acc
            }, {}))
          }

          const averageData = {}
          const regionValues = unitPoints
            .reduce((acc, next) => {
              if (next.forAverageDivisor || rateUnits.includes(unit)) {
                const destination = next.destination || next.origin || next.port
                if (!averageData[destination]) {
                  if (visName === 'naturalGasLiquids') {
                    averageData[destination] = {
                      Propane: { value: 0, divisor: 0 },
                      Butane: { value: 0, divisor: 0 },
                    }
                  } else {
                    averageData[destination] = { value: 0, divisor: 0 }
                  }
                }
                const averageDest = averageData[destination]
                if (visName === 'naturalGasLiquids') {
                  averageDest[next.productSubtype].value += (rateUnits.includes(unit) ? next.value : next.forAverageValue)
                  averageDest[next.productSubtype].divisor += (rateUnits.includes(unit) ? 1 : next.forAverageDivisor)
                  return {
                    ...acc,
                    [destination]: (averageDest['Propane'].quantity + averageDest['Butane'].quantity === 0)
                      ? 0
                      : Math.round(averageDest['Propane'].value / averageDest['Propane'].divisor) + Math.round(averageDest['Butane'].value / averageDest['Butane'].divisor),
                  }
                } else {
                  averageDest.value += (rateUnits.includes(unit) ? next.value : next.forAverageValue)
                  averageDest.divisor += (rateUnits.includes(unit) ? 1 : next.forAverageDivisor)
                  return {
                    ...acc,
                    [destination]: (averageDest.quantity === 0)
                      ? 0
                      : Math.round(averageDest.value / averageDest.divisor),
                  }
                }
              }
              if (visName === 'crudeOilExports' || visName === 'naturalGasLiquids') {
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
            let rawActivity = point.activity
            if (point.activityGroup !== 'importsExports') {
              rawActivity = point.activityGroup
            }
            if (!acc[point.period][rawActivity]) {
              acc[point.period][rawActivity] = {
                transport: {},
                productSubtype: {},
                weightedAverage: { value: 0, divisor: 0 },
                activityTotal: 0,
              }
            }
            if (point.transport !== '') {
              const transport = acc[point.period][rawActivity].transport[point.transport] || 0
              acc[point.period][rawActivity].transport[point.transport] = transport + point.value

              const transportTotal = acc[point.period][rawActivity].transport.total || 0
              acc[point.period][rawActivity].transport.total = transportTotal + point.value
            }

            if (point.productSubtype !== '') {
              const productSubtype = acc[point.period][rawActivity].productSubtype[point.productSubtype] || 0
              acc[point.period][rawActivity].productSubtype[point.productSubtype] = productSubtype + point.value
              
              const productSubtypeTotal = acc[point.period][rawActivity].productSubtype.total || 0
              acc[point.period][rawActivity].productSubtype.total = productSubtypeTotal + point.value              
            }

            const averageValue = acc[point.period][rawActivity].weightedAverage.value || 0
            acc[point.period][rawActivity].weightedAverage.value = averageValue + point.forAverageValue

            const averageDivisor = acc[point.period][rawActivity].weightedAverage.divisor || 0
            acc[point.period][rawActivity].weightedAverage.divisor = averageDivisor + point.forAverageDivisor

            if (visName !== 'crudeOilExports' || (!point.transport && !point.productSubtype)) {
              acc[point.period][rawActivity].activityTotal += point.value
            }

            return acc
          }, {})

          Object.entries(aggregatedValueByPeriod).forEach(([year, point]) => {
            Object.entries(point).forEach(([activity, values]) => {
              if (!timelineScale[visName][unit][activity]) {
                timelineScale[visName][unit][activity] = {
                  activityTotal: 0,
                }
              }
              Object.entries(values.transport).forEach(([transport, value]) => {
                if (transport !== '') {
                  if (!timelineScale[visName][unit][activity].transport) {
                    timelineScale[visName][unit][activity].transport = {}
                  }
                  if (!timelineScale[visName][unit][activity].transport) {
                    timelineScale[visName][unit][activity].transport = {}
                  }
                  const transportValue = timelineScale[visName][unit][activity].transport[transport] || 0
                  timelineScale[visName][unit][activity].transport[transport] = value > transportValue ? value : transportValue
                }
              })
              Object.entries(values.productSubtype).forEach(([productSubtype, value]) => {
                if (productSubtype !== '') {
                  if (!timelineScale[visName][unit][activity].productSubtype) {
                    timelineScale[visName][unit][activity].productSubtype = {}
                  }
                  if (!timelineScale[visName][unit][activity].productSubtype) {
                    timelineScale[visName][unit][activity].productSubtype = {}
                  }
                  const productSubtypeValue = timelineScale[visName][unit][activity].productSubtype[productSubtype] || 0
                  timelineScale[visName][unit][activity].productSubtype[productSubtype] = value > productSubtypeValue ? value : productSubtypeValue
                }
              })

              if (['CN$/GJ', 'CAN$/MW.h'].includes(unit)) {
                const activityTotal = timelineScale[visName][unit][activity].activityTotal || 0
              
                if (values.weightedAverage.divisor !== 0) {
                  const calculateWeightedAverage = values.weightedAverage.value / values.weightedAverage.divisor
                  timelineScale[visName][unit][activity].activityTotal = calculateWeightedAverage > activityTotal ? calculateWeightedAverage : activityTotal
                }
              } else {
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
