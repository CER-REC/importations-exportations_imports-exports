import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaPaddPosition = createSelector(
  visualizationContentPosition,
  visContent => ({
    top: visContent.top - 30,
    left: visContent.left + 1.3,
    width: visContent.width,
    height: 150,
  }),
)

export const chartTransportPosition = createSelector(
  canadaPaddPosition,
  viewport,
  (canadaPadd, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2? canadaPadd.top + canadaPadd.height - 30: canadaPadd.top + canadaPadd.height - 70
    const result = {
      top,
      left: canadaPadd.left,
      width: canadaPadd.width,
      height: 100,
    }
    return result
  },
)

export const chartSubtypePosition = createSelector(
  chartTransportPosition,
  transportPosition => ({
    top: transportPosition.top + transportPosition.height + 20,
    left: transportPosition.left,
    width: transportPosition.width,
    height: 100,
  }),
)

export const chartAxisPosition = createSelector(
  chartSubtypePosition,
  subtypePosition => ({
    top: subtypePosition.top + subtypePosition.height,
    left: subtypePosition.left,
    width: subtypePosition.width,
    height: axisHeight,
  }),
)

export const chartExportPosition = createSelector(
  chartAxisPosition,
  axisPosition => ({
    top: axisPosition.top + axisPosition.height,
    left: axisPosition.left,
    width: axisPosition.width,
    height: 100,
  }),
)

export const usPaddPosition = createSelector(
  chartExportPosition,
  viewport,
  (chartPosition, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2
      ? ((chartPosition.top + chartPosition.height) - 80)
      : (chartPosition.top + chartPosition.height)
    return {
      top,
      left: chartPosition.left,
      width: chartPosition.width,
      height: 100,
    }
  },
)

export const exportBreakdown = createSelector(
  chartExportPosition,
  chartPosition => ({
    top: chartPosition.top + chartPosition.height,
    left: chartPosition.left,
    width: chartPosition.width,
    height: 100,
  }),
)
