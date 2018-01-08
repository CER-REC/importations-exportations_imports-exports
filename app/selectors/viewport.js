// const createSelector = require('reselect').createSelector

const Constants = require('../Constants.js')

const visualizationContainerWidth = state =>
  state.viewport.get('x') - Constants.getIn(['visualizationContainer', 'widthPadding'])
const visualizationContainerHeight = state =>
  state.viewport.get('y') - Constants.getIn(['visualizationContainer', 'heightPadding'])

module.exports = {
  visualizationContainerWidth,
  visualizationContainerHeight,
}
