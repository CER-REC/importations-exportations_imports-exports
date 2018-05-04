import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'
import { createSortedLayout, getNaturalGasLiquidMapLayout } from '../NaturalGasSelector'
import { arrangeBy } from '../data'
import { visualizationSettings } from '../visualizationSettings'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaImportMap = createSelector(
  visualizationContentPosition,
  viewport,
  createSortedLayout,
  arrangeBy,
  (visContent, viewp, sortedLayout, arrangeBy) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left + 80) : (visContent.left)

    let top = visContent.top
    if (arrangeBy === 'amount') {
      top = visContent.top + 50
    }

    const result = {
      top,
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
  arrangeBy,
  visualizationSettings,
  (importPosition, arrangeBy, activity) => {
    let top = importPosition.top + importPosition.height
    if (arrangeBy === 'amount' && ['exports'].includes(activity.get('activity'))) {
      top = importPosition.top + importPosition.height - 70
    }
    const result = {
      top,
      left: importPosition.left,
      width: importPosition.width,
      height: axisHeight,
    }
    return result
  },
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
  (chartPosition, viewp, arrangeBy, activity) => {
    let top = viewp.get('changeHeightRatio') > 1.2 ? (chartPosition.top + chartPosition.height - 40) : (chartPosition.top + chartPosition.height + 20) 
    const left = viewp.get('changeWidthRatio') > 1.2 ? (chartPosition.left + 20) : (chartPosition.left) 
    if (arrangeBy === 'amount' && ['imports'].includes(activity.get('activity'))) {
      top = viewp.get('changeHeightRatio') > 1.2 ? (chartPosition.top + chartPosition.height - 150) : (chartPosition.top + chartPosition.height - 70)
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
