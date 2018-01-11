const fs = require('fs')
const Path = require('path')
const CSVParse = require('csv-parse')
const OriginVaildator = require('./app/validators/OriginValidator.js')

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
  'Electricity': 'electricity',
  'Crude Oil': 'crudeOil',
  'Gas': 'naturalGas',
  'NGLs': 'naturalGasLiquids',
  'RPPs': 'refinedPetroleumProducts',
}

const parser = CSVParse({
  // Use the callback method to replace the file headers with our own
  columns: () => ['period', 'product', 'productSubtype', 'transport', 'origin', 'destination', 'port', 'activity', 'units', 'value'],
}, (err, data) => {
  if (err) { throw err }
  const output = {}
  const parsingIssue = {}
  data.forEach(point => {
    // Normalize the data. We can safely mutate args in this situation
    point.product = productMap[point.product]

    if (!output[point.product]) { output[point.product] = {} }
    // Use an object reference to simplify the next creation
    const outProd = output[point.product]
    if (!outProd[point.units]) { outProd[point.units] = [] }

    let confidential = false
    //check for the confidential data
    if(point.value.toLowerCase() === 'confidential'){
      confidential = true
    }
    //Data Vaildation and parsing
    const region = OriginVaildator.originNameValidator(point.origin)
    
    //Printing error on the UI so that data can be verified
    if(region.get('isValid') === false){
      if(typeof parsingIssue[region.get('error')] === 'undefined'){
        parsingIssue[region.get('error')]= {product: point.product , numberOfRows : 0}
      }else{
        parsingIssue[region.get('error')].numberOfRows = parsingIssue[region.get('error')].numberOfRows+1 
      }
    }


    outProd[point.units].push({
      period: stripNA(point.period),
      year: parseInt(point.period.substr(0, 4), 10),
      quarter: parseInt(point.period.substr(5, 1), 10),
      product: point.product,
      productSubtype: stripNA(point.productSubtype),
      transport: stripNA(point.transport),
      origin: stripNA(point.origin),
      country: region.get('country')||'',
      originKey: region.get('originKey')||'',
      destination: stripNA(point.destination),
      port: stripNA(point.port),
      activityGroup: stripNA(activityGroupMap[point.activity]),
      activity: stripNA(activityMap[point.activity]),
      originalActivity: stripNA(point.activity),
      units: stripNA(point.units),
      confidential: confidential,
      value: parseInt(stripNA(point.value), 10) || 0,
    })
  })

  console.log('/********************* Starts: Error in validating data *********************/')
  console.log(parsingIssue)
  console.log('/********************* Finish: Error in validating data *********************/')

  fs.writeFileSync(
    Path.resolve(__dirname, 'public/data/data.json'),
    JSON.stringify(output)
  )
})

fs.createReadStream(
  Path.resolve(__dirname, 'public/data/data.csv')
).pipe(parser)
