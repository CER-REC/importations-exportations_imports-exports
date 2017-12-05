
const Redux = require('redux')

const ViewportReducer = require('./reducers/ViewportReducer.js')

const reducers = Redux.combineReducers({
  viewport: ViewportReducer,
})

module.exports = function () {
  return Redux.createStore(reducers)
}


