
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ElectricitySortStateReducer = require('./reducers/ElectricitySortStateReducer.js')
const ElectricityDataTypeReducer = require('./reducers/ElectricityDataTypeReducer.js')
const ShowExplanationsReducer = require('./reducers/ShowExplanationsReducer.js')
const DataReducer = require('./actions/data').reducer

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricitySortState: ElectricitySortStateReducer,
  electricityDataTypes: ElectricityDataTypeReducer,
  showExplanations: ShowExplanationsReducer,
  data: DataReducer,
})

module.exports = function () {
  // Enable Redux Dev Tools if they are installed in the browser
  return Redux.createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}


