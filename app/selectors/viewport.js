const createSelector = require('reselect').createSelector

const Constants = require('../Constants.js')

const menuWidth = () => Constants.getIn(['visualizationContainer','leftMargin'])
const viewport = state => state.viewport
const visualizationContainerSize = createSelector(
  viewport,
  menuWidth,
  (viewport, menuWidth) => ({
    width: (viewport.get('x') - menuWidth),
    height: viewport.get('y') -
      Constants.getIn(['visualizationContainer', 'heightPadding']),
  })
)

const visualizationContentSize = createSelector(
  visualizationContainerSize,
  ({ width, height }) => ({ width: width * 0.8, height })
)

const detailSidebarOffset = createSelector(
  visualizationContainerSize,
  ({ width }) => width * 0.8
)

module.exports = {
  menuWidth,
  visualizationContainerSize,
  visualizationContentSize,
  detailSidebarOffset,
}
