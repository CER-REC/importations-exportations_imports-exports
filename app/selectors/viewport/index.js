import { createSelector } from 'reselect'

import Constants from '../../Constants'

export const menuWidth = () => Constants.getIn(['visualizationContainer', 'leftMargin'])
const detailSidebarWidth = () =>
  Constants.getIn(['visualizationDetailContainer', 'width'])
const viewport = state => state.viewport

export const positionHelper = (prev, height) => createSelector(
  prev,
  prevPos => Object.assign({}, prevPos, {
    top: prevPos.top + prevPos.height,
    height,
  }),
)

export const svgSize = createSelector(
  viewport,
  detailSidebarWidth,
  viewport => ({
    width: (viewport.get('x')),
    height: (viewport.get('y') + Constants.getIn(['workspace', 'viewportPadding'])),
  }),
)

export const visualizationContainerPosition = createSelector(
  viewport,
  menuWidth,
  (viewport, menuWidth) => ({
    top: Constants.get('topHeightMargin'),
    left: menuWidth,
    width: (viewport.get('x') - menuWidth),
    height: viewport.get('y') -
      Constants.getIn(['visualizationContainer', 'heightPadding']),
  }),
)

export const visualizationContentPosition = createSelector(
  visualizationContainerPosition,
  menuWidth,
  detailSidebarWidth,
  ({ top, width, height }, computedMenuWidth, sidebarWidth) => ({
    top,
    left: computedMenuWidth,
    width: width - sidebarWidth,
    height,
  }),
)

export const detailSidebarPosition = createSelector(
  visualizationContainerPosition,
  menuWidth,
  detailSidebarWidth,
  ({ width: visualizationWidth, top }, computedMenuWidth, width) => ({
    top,
    left: computedMenuWidth + visualizationWidth - width,
    width,
  }),
)
