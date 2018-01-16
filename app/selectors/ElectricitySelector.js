const createSelector = require('reselect').createSelector
const Immutable = require('immutable')

//get import data for the electricity visualization
//rows from the CSV
const selectedVisualization = state => state.importExportVisualization
const { sortAggregatedLocationsSelector, arrangeBy, unitSelector } = require('./data.js')
const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')
const Constants = require('../Constants.js')

const { visualizationSettings } = require('./visualizationSettings')

const getSelectionSettings = createSelector(
  visualizationSettings,
  settings => settings.get('selection')
)

const getCountry = (state,props)=>{
  return props.country
}

const getElectrictyMapLayoutConstants = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country)=>{
    return MapLayoutGridConstant.getIn([visualization, country, 'layout'])
  }
)

const getColumns = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country)=>{
    return MapLayoutGridConstant.getIn([visualization, country, 'defaultColumns'])
  }
)

const getPadding = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country)=>{
    return MapLayoutGridConstant.getIn([visualization, country, 'sortingRowPadding'])
  }
)

const getPointsByCountry = createSelector(
  sortAggregatedLocationsSelector,
  getCountry,
  (points,country) => points.filter( point=> point.get('country') === country)
)

const getElectricityImportAndExport = createSelector(
  getPointsByCountry,
  unitSelector,
  getCountry,
  (points,unit,country) => {
    //append missing states or provinces 
    const statesOrProvinces = Constants.getIn(['dataloader','mapping','country', country])
    if(typeof statesOrProvinces !== 'undefined'){
      let missingstatesOrProvincesMap = {}
      statesOrProvinces.entrySeq().forEach(
        stateOrProvince => {
          if(typeof points.get(stateOrProvince[1]) === 'undefined'){
            const originKey = stateOrProvince[1]
            const origin = stateOrProvince[0]
            missingstatesOrProvincesMap[originKey]=   {
              units: unit,
              origin,
            }
            missingstatesOrProvincesMap[originKey]['country'] = country
            missingstatesOrProvincesMap[originKey]['originKey'] = originKey
            missingstatesOrProvincesMap[originKey]['exports'] = 0
            missingstatesOrProvincesMap[originKey]['imports'] = 0
            missingstatesOrProvincesMap[originKey]['totalCount'] = 0
            missingstatesOrProvincesMap[originKey]['confidentialCount'] = 0
          }
        }
      )
      missingstatesOrProvincesMap = Immutable.fromJS(missingstatesOrProvincesMap)
      return points.merge(missingstatesOrProvincesMap)
    }
    return points
  }
)

const createSortedLayout = createSelector(
  getElectricityImportAndExport, 
  getColumns, 
  getPadding,
  (data, columns, rowPadding)=>{
    let row = 0
    let column = 0
    let sortedArray  = []
    data.forEach(statesOrProvinces=>{
      if(column >= columns){
        column = 0
        row = row+1
        if(row%2 === 1){
          columns = columns-1  
        }
      }
      let x = row + column
      if(row !== 0){
        x = x + (row*rowPadding)
      }
      sortedArray.push( {
        name: statesOrProvinces.get('originKey'),
        exports: statesOrProvinces.get('exports') || 0,
        imports: statesOrProvinces.get('imports') || 0,
        totalCount: statesOrProvinces.get('totalCount') || 0,
        confidentialCount: statesOrProvinces.get('confidentialCount') || 0,
        x: x,
        y : row
      })
      
      //Column value is updated for the next iteration
      column = column + 1
    })
    return Immutable.fromJS(sortedArray)
  }
)

const parseLocationData = createSelector( 
  getElectricityImportAndExport,
  getElectrictyMapLayoutConstants,
  (data, layout)=>{
    let resultList = []
    if(data.size > 0 && typeof layout !== 'undefined'){
      layout.forEach(statesOrProvinces => {
        const originKey = statesOrProvinces.get('originKey')
        const result = {
          name: originKey,
          exports: data.getIn([originKey, 'exports']) || 0,
          imports: data.getIn([originKey, 'imports']) || 0,
          x: statesOrProvinces.get('x'),
          y: statesOrProvinces.get('y'),
          totalCount: statesOrProvinces.get('totalCount') || 0,
          confidentialCount: statesOrProvinces.get('confidentialCount') || 0,
        }
        resultList.push(result)
      })
    }
    return Immutable.fromJS(resultList)
  } 
)


const getElectrictyMapLayout = createSelector(
  createSortedLayout,
  parseLocationData,
  arrangeBy,
  (sortedPoints, locationPoints, sortBy)=>{
    switch(sortBy){
    case 'exports':
    case 'imports':
      return sortedPoints
    case 'location':
    default:
      return locationPoints
    }
  }
)

module.exports = {
  getElectrictyMapLayout,
  getSelectionSettings,
  getPointsByCountry
}