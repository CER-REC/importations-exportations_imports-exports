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
    height: 170,
  }),
)

export const chartImportPosition = createSelector(
  canadaPaddPosition,
  viewport,
  (canadaPadd, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? canadaPadd.top + canadaPadd.height - 30 : canadaPadd.top + canadaPadd.height - 70
    const result = {
      top,
      left: canadaPadd.left,
      width: canadaPadd.width,
      height: 100,
    }
    return result
  },
)

export const chartAxisPosition = createSelector(
  chartImportPosition,
  importPosition => ({
    top: importPosition.top + importPosition.height,
    left: importPosition.left,
    width: importPosition.width,
    height: axisHeight,
  }),
)

export const worldChartPosition = createSelector(
  chartAxisPosition,
  viewport,
  (axis, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? (axis.top + axis.height) : (axis.top + axis.height)
    const result = {
      top: top + 10,
      left: axis.left,
      width: axis.width,
      height: 100,
    }
    return result
  },
)
