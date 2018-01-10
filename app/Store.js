const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ElectricitySortStateReducer = require('./reducers/ElectricitySortStateReducer.js')
const ElectricityDataTypeReducer = require('./reducers/ElectricityDataTypeReducer.js')
const DataReducer = require('./actions/data').reducer
const { reducer: visualizationSettings } = require('./actions/visualizationSettings')

const AmountUnitMiddleware = require('./middleware/amountUnit')
const TimelineRangeMiddleware = require('./middleware/timelineRange')
const InitialVisualizationSettingsMiddleware = require('./middleware/initialVisualizationSettings')
const ActionLogMiddleware = require('./middleware/actionLog')
const TagVisualizationSettingsMiddleware = require('./middleware/tagVisualizationSettings')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricitySortState: ElectricitySortStateReducer,
  electricityDataTypes: ElectricityDataTypeReducer,
  data: DataReducer,
  visualizationSettings,
})

module.exports = function () {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose
  // Enable Redux Dev Tools if they are installed in the browser
  return Redux.createStore(
    reducers,
    composeEnhancers(Redux.applyMiddleware(
      InitialVisualizationSettingsMiddleware,
      TagVisualizationSettingsMiddleware,
      AmountUnitMiddleware,
      TimelineRangeMiddleware,
      ActionLogMiddleware
    ))
  )
}
