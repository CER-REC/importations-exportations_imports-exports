
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ElectricitySortStateReducer = require('./reducers/ElectricitySortStateReducer.js')
const ElectricityDataTypeReducer = require('./reducers/ElectricityDataTypeReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricitySortState: ElectricitySortStateReducer,
  electricityDataTypes: ElectricityDataTypeReducer
})

module.exports = function () {
  // Enable Redux Dev Tools if they are installed in the browser
  return Redux.createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}


