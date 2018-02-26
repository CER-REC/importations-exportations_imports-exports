import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaImportMap = createSelector(
  visualizationContentPosition,
  viewport,
  (visContent, viewp) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left + 80) : (visContent.left) 
    const result = {
      top: visContent.top,
      left,
      width: visContent.width,
      height: 150,
    }
    return result
  },
)

export const chartImportPosition = createSelector(
  canadaImportMap,
  viewport,
  (visContent, viewp) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left - 80) : (visContent.left) 
    const result = {
      top: visContent.top + visContent.height,
      left,
      width: visContent.width,
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
    const top = viewp.get('changeHeightRatio') > 1.2 ? (chartPosition.top + chartPosition.height - 40) : (chartPosition.top + chartPosition.height + 20) 
    const left = viewp.get('changeWidthRatio') > 1.2 ? (chartPosition.left + 20) : (chartPosition.left) 
    const result = {
      top,
      left,
      width: chartPosition.width,
      height: 100,
    }
    return result
  },
)
