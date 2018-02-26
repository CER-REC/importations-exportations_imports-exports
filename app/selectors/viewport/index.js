import { createSelector } from 'reselect'

import Constants from '../../Constants'

export const menuWidth = () => Constants.getIn(['menuBar', 'width'])
const detailSidebar = Constants.get('visualizationDetailContainer')
export const viewport = state => state.viewport

export const positionHelper = (prev, height) => createSelector(
  prev,
  prevPos => Object.assign({}, prevPos, {
    top: prevPos.top + prevPos.height,
    height,
  }),
)

export const svgSize = createSelector(
  viewport,
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
  ({ top, width, height }, computedMenuWidth) => ({
    top,
    left: computedMenuWidth,
    width: width - detailSidebar.get('width'),
    height,
  }),
)

export const detailSidebarPosition = createSelector(
  visualizationContainerPosition,
  menuWidth,
  ({ width: visualizationWidth, top }, computedMenuWidth) => ({
    top,
    left: (computedMenuWidth + visualizationWidth + detailSidebar.get('leftPadding'))
      - detailSidebar.get('width'),
    width: detailSidebar.get('width'),
  }),
)
