
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')

const ImportExportVisualizationReducer = require('./reducers/ImportExportVisualizationReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: ImportExportVisualizationReducer
})

module.exports = function () {
  return Redux.createStore(reducers)
}


