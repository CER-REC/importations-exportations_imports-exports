import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'
import { arrangeBy } from '../data'
import { visualizationSettings } from '../visualizationSettings'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaImportMap = createSelector(
  visualizationContentPosition,
  viewport,
  arrangeBy,
  visualizationSettings,
  (visContent, viewp, arrange, activity) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left + 80) : (visContent.left) 
    
    let top = visContent.top
    if (arrange === 'amount') {
      top = visContent.top + 50
    }

    let height = 150
    if (arrange === 'amount' && ['exports'].includes(activity.get('activity'))) {
      height = 50
    }

    const result = {
      top: visContent.top,
      top,
      left,
      width: visContent.width,
      height,
    }
    return result
  },
)

export const chartImportPosition = createSelector(
  canadaImportMap,
  viewport,
  (visContent, viewp) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left - 80) : (visContent.left)
    const top = viewp.get('changeHeightRatio') > 1.2 ? (visContent.top + visContent.height +20) : (visContent.top + visContent.height)
    const result = {
      top,
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
  arrangeBy,
  visualizationSettings,
  (chartPosition, viewp, arrange, activity) => {
    let top = viewp.get('changeHeightRatio') > 1.2 ? (chartPosition.top + chartPosition.height - 40) : (chartPosition.top + chartPosition.height + 20) 
    const left = viewp.get('changeWidthRatio') > 1.2 ? (chartPosition.left + 20) : (chartPosition.left)

    if (arrange === 'amount' && ['imports'].includes(activity.get('activity'))) {
      top = viewp.get('changeHeightRatio') > 1.2 ? (chartPosition.top + chartPosition.height - 140) : (chartPosition.top + chartPosition.height - 60) 
    }

    const result = {
      top,
      left,
      width: chartPosition.width,
      height: 100,
    }
    return result
  },
)

export const exportBreakdown = createSelector(
  chartExportPosition,
  viewport,
  arrangeBy,
  visualizationSettings,
  (chartPosition, viewp, arrange, activity) => ({
    top: chartPosition.top + chartPosition.height,
    left: chartPosition.left,
    width: chartPosition.width,
    height: 100,
  }),
)
