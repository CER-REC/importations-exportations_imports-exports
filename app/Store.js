import { createStore, compose, applyMiddleware } from 'redux'

import reducer from './reducer'

import TimelineRangeMiddleware from './middleware/timelineRange'
import InitialVisualizationSettingsMiddleware from './middleware/initialVisualizationSettings'
import ActionLogMiddleware from './middleware/actionLog'
import TagVisualizationSettingsMiddleware from './middleware/tagVisualizationSettings'
import SaveStateToRouteMiddleware, { updateStateFromURL } from './middleware/saveStateToRoute'
import DataLoaded from './middleware/DataLoaded'

module.exports = () => {
  // Enable Redux Dev Tools if they are installed in the browser
  const composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(
      SaveStateToRouteMiddleware,
      InitialVisualizationSettingsMiddleware,
      TagVisualizationSettingsMiddleware,
      TimelineRangeMiddleware,
      ActionLogMiddleware,
      DataLoaded,
    )),
  )

  // Reload the visualization settings from the URL
  updateStateFromURL(document.location.search, store)

  return store
}
