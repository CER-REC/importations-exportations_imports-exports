import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
import Constants from '../../Constants'
import { createSortedLayout } from '../NaturalGasSelector'
import { arrangeBy } from '../data'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaImportMap = createSelector(
  visualizationContentPosition,
  viewport,
  createSortedLayout,
  arrangeBy,
  (visContent, viewp, sortedLayout, arrangeBy) => {
    const left = viewp.get('changeWidthRatio') > 1.2 ? (visContent.left + 80) : (visContent.left)
    const atlq = sortedLayout.find(region => region.get('name') === 'ATL-Q')

    let top = visContent.top   
    if (atlq && atlq.get('y') === 0 && arrangeBy === 'amount') {
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
      // the viewport logic should be in the canadaImportMap selector
      // the label logic should be in MapPiece
      // if row index is 0 then move label to the top
      //    also move canadaMap down---
      // if row index is 1 then move label to the bottom

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
