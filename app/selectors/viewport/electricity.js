import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaMapPosition = createSelector(
  visualizationContentPosition,
  viewport,
  (visContent, viewp)  => ({
    top: visContent.top,
    left: visContent.left + viewp.get('changeWidthRatio')*50,
    width: visContent.width,
    height: 120,
  }),
)

export const chartImportPosition = createSelector(
  canadaMapPosition,
  viewport,
  (prev, viewp)  => {
    const result = {
      top: prev.top + prev.height,
      left: prev.left - viewp.get('changeWidthRatio')*50,
      width: prev.width,
      height: viewp.get('changeHeightRatio')*100,
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
      height: viewp.get('changeHeightRatio')*axisHeight,
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
      height: viewp.get('changeHeightRatio')*100,
    }
    return result
  },
)

export const usMapPosition = createSelector(
  chartExportPosition,
  viewport,
  (prev, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? (prev.top + prev.height - 50) : (prev.top + prev.height) 
    const result = {
      top,
      left: prev.left - viewp.get('changeWidthRatio')*30,
      width: prev.width,
      height: viewp.get('changeHeightRatio')*220,
    }
    return result
  },
)

export const powerPoolPosition = createSelector(
  usMapPosition,
  viewport,
  (prev, viewp) => {
    const top = viewp.get('changeHeightRatio') > 1.2 ? (prev.top + prev.height - 50) : (prev.top + prev.height) 
    const left = viewp.get('changeWidthRatio') > 1.2 ? (prev.width + viewp.get('changeWidthRatio') - 100) : (prev.width + viewp.get('changeWidthRatio')*100) 
    const result = {
      top,
      left,
      width: 150,
      height: 50,
    }
    return result
  },
)
