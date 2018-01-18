const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')
const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')
const LanguageReducer = require('./reducers/LanguageReducer.js')
const ShowExplanationsReducer = require('./reducers/ShowExplanationsReducer.js')
const DataReducer = require('./actions/data').reducer
const ElectricityExplanationReducer = require('./reducers/ElectricityExplanationReducer.js')
const { reducer: visualizationSettings } = require('./actions/visualizationSettings')
const DataLoadCompleteReducer = require('./actions/DataLoadComplete').reducer

const TimelineRangeMiddleware = require('./middleware/timelineRange')
const InitialVisualizationSettingsMiddleware = require('./middleware/initialVisualizationSettings')
const ActionLogMiddleware = require('./middleware/actionLog')
const TagVisualizationSettingsMiddleware = require('./middleware/tagVisualizationSettings')
const DataLoaded = require('./middleware/DataLoaded')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricityExplanation: ElectricityExplanationReducer,
  showExplanations: ShowExplanationsReducer,
  data: DataReducer,
  dataLoadingComplete: DataLoadCompleteReducer,
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
      TimelineRangeMiddleware,
      ActionLogMiddleware,
      DataLoaded,
    )),
  )
}
