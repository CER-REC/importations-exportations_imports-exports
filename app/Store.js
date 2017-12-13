
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ElectricitySortStateReducer = require('./reducers/ElectricitySortStateReducer.js')
const ElectricityDataTypeReducer = require('./reducers/ElectricityDataTypeReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  lang: LanguageReducer,
  electricitySortState: ElectricitySortStateReducer,
  electricityDataTypes: ElectricityDataTypeReducer

})

module.exports = function () {
  return Redux.createStore(reducers)
}


