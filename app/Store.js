const Redux = require('redux')

const reducer = require('./reducer').default
const TimelineRangeMiddleware = require('./middleware/timelineRange')
const InitialVisualizationSettingsMiddleware = require('./middleware/initialVisualizationSettings')
const ActionLogMiddleware = require('./middleware/actionLog')
const TagVisualizationSettingsMiddleware = require('./middleware/tagVisualizationSettings')
const { default: SaveStateToRouteMiddleware, updateStateFromURL } = require('./middleware/saveStateToRoute')

module.exports = () => {
  // Enable Redux Dev Tools if they are installed in the browser
  const composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose

  const store = Redux.createStore(
    reducer,
    composeEnhancers(Redux.applyMiddleware(
      SaveStateToRouteMiddleware,
      InitialVisualizationSettingsMiddleware,
      TagVisualizationSettingsMiddleware,
      TimelineRangeMiddleware,
      ActionLogMiddleware,
    )),
  )

  // Reload the visualization settings from the URL
  updateStateFromURL(document.location.search, store)

  return store
}
