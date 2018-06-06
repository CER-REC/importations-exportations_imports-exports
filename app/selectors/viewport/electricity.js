import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaMapPosition = createSelector(
  visualizationContentPosition,
  viewport,
  (visContent, viewp) => {
    const height = viewp.get('changeHeightRatio') > 1.2 ? 140 : 105
    return {
      // Move up by 30px to give barchart space for negative values and outliers
      top: visContent.top - 30,
      left: visContent.left + (viewp.get('changeWidthRatio') * 50) - 30,
      width: visContent.width,
      height,
    }
  },
)

export const chartImportPosition = createSelector(
  canadaMapPosition,
  viewport,
  (prev, viewp) => {
    const result = {
      // Move down by 30px to give barchart space for negative values and outliers
      top: prev.top + prev.height + 30,
      left: prev.left - (viewp.get('changeWidthRatio') * 50) + 30,
      width: prev.width,
      height: 100,
    }
    return result
  },
)

export const chartAxisPosition = createSelector(
  chartImportPosition,
  viewport,
  (prev, viewp) => {
    const result = {
      top: prev.top + prev.height,
      left: prev.left,
      width: prev.width,
      height: axisHeight,
    }
    return result
  },
)

export const chartExportPosition = createSelector(
  chartAxisPosition,
  viewport,
  (prev, viewp) => {
    const result = {
      top: prev.top + prev.height,
      left: prev.left,
      width: prev.width,
      height: 100,
    }
    return result
  },
)

export const usMapPosition = createSelector(
  chartExportPosition,
  viewport,
  (prev, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? (prev.top + prev.height - 60) : (prev.top + prev.height + 10)
    const result = {
      // Move down by 35px to give barchart space for negative values and outliers
      top: top + 35,
      left: prev.left - viewp.get('changeWidthRatio') * 30,
      width: prev.width,
      height: viewp.get('changeHeightRatio') * 220,
    }
    return result
  },
)

export const powerPoolPosition = createSelector(
  usMapPosition,
  viewport,
  (prev, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? (prev.top + prev.height - 50) : (prev.top + prev.height - 10)
    const left = viewp.get('changeWidthRatio') > 1.2 ? (prev.width + viewp.get('changeWidthRatio') - 100) : (prev.width + viewp.get('changeWidthRatio') * 100)
    const result = {
      top,
      left,
      width: 150,
      height: 50,
    }
    return result
  },
)
