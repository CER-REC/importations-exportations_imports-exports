const createSelector = require('reselect').createSelector

const Constants = require('../../Constants.js')

const menuWidth = () => Constants.getIn(['visualizationContainer','leftMargin'])
const detailSidebarWidth = () =>
  Constants.getIn(['visualizationDetailContainer', 'width'])
const viewport = state => state.viewport
const visualizationContainerPosition = createSelector(
  viewport,
  menuWidth,
  (viewport, menuWidth) => ({
    top: Constants.get('topHeightMargin'),
    left: menuWidth,
    width: (viewport.get('x') - menuWidth),
    height: viewport.get('y') -
      Constants.getIn(['visualizationContainer', 'heightPadding']),
  })
)

const visualizationContentPosition = createSelector(
  visualizationContainerPosition,
  menuWidth,
  detailSidebarWidth,
  ({ top, width, height }, computedMenuWidth, sidebarWidth) => ({
    top,
    left: computedMenuWidth,
    width: width - sidebarWidth,
    height,
  })
)

const detailSidebarPosition = createSelector(
  visualizationContainerPosition,
  menuWidth,
  detailSidebarWidth,
  ({ width: visualizationWidth }, computedMenuWidth, width) => ({
    top: 0, // Constants.getIn(['topHeightMargin']),
    left: computedMenuWidth + visualizationWidth - width,
    width,
  })
)

module.exports = {
  menuWidth,
  visualizationContainerPosition,
  visualizationContentPosition,
  detailSidebarPosition,
}
