const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ElectricitySortStateReducer = require('./reducers/ElectricitySortStateReducer.js')
const ElectricityDataTypeReducer = require('./reducers/ElectricityDataTypeReducer.js')
const ShowExplanationsReducer = require('./reducers/ShowExplanationsReducer.js')
const DataReducer = require('./actions/data').reducer
const UIReducer = require('./actions/ui').reducer

const AmountUnitMiddleware = require('./middleware/amountUnit')
const TimelineRangeMiddleware = require('./middleware/timelineRange')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricitySortState: ElectricitySortStateReducer,
  electricityDataTypes: ElectricityDataTypeReducer,
  showExplanations: ShowExplanationsReducer,
  data: DataReducer,
  ui: UIReducer,
})

module.exports = function () {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
  // Enable Redux Dev Tools if they are installed in the browser
  return Redux.createStore(
    reducers,
    composeEnhancers(Redux.applyMiddleware(
      AmountUnitMiddleware,
      TimelineRangeMiddleware
    ))
  )
}
