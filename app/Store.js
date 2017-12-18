
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')

const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer
})

module.exports = function () {
  // Enable Redux Dev Tools if they are installed in the browser
  return Redux.createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}


