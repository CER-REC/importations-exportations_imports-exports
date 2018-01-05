const createSelector = require('reselect').createSelector

const Constants = require('../Constants.js')

const visualizationContainerWidth = state =>
  state.viewport.get('x') -
  Constants.getIn(['visualizationContainer', 'widthPadding'])
const visualizationContainerHeight = state =>
  state.viewport.get('y') -
  Constants.getIn(['visualizationContainer', 'heightPadding'])

const visualizationContentSize = createSelector(
  visualizationContainerWidth,
  visualizationContainerHeight,
  (width, height) => ({ width: width * 0.8, height })
)

const detailSidebarOffset = createSelector(
  visualizationContainerWidth,
  width => width * 0.8
)

module.exports = {
  visualizationContainerWidth,
  visualizationContainerHeight,
  visualizationContentSize,
  detailSidebarOffset,
}
