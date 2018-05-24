import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const chartImportPosition = createSelector(
  visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 100,
  }),
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

export const chartExportPosition = createSelector(
  chartAxisPosition,
  axisPosition => ({
    top: axisPosition.top + axisPosition.height,
    left: axisPosition.left,
    width: axisPosition.width,
    height: 100,
  }),
)

export const mapTilesPosition = createSelector(
  chartExportPosition,
  viewport,
  (chartPosition, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2
      ? chartPosition.top + chartPosition.height - 30
      : chartPosition.top + chartPosition.height - 10
    const left = viewp.get('changeWidthRatio') > 1.2 ? chartPosition.left - 50 : chartPosition.left - 10
    const result = {
      top,
      left,
      width: chartPosition.width,
      height: 400,
    }
    return result
  },
)

export const portMapPosition = createSelector(
  mapTilesPosition,
  mapTiles => mapTiles,
)
