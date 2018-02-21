import { createSelector } from 'reselect'

import { visualizationContentPosition } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaImportMap = createSelector(
  visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left + 100,
    width: visContent.width,
    height: 100,
  }),
)

export const chartImportPosition = createSelector(
  canadaImportMap,
  visContent => ({
    top: visContent.top + visContent.height,
    left: visContent.left - 100,
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

export const usPaddPosition = createSelector(
  chartExportPosition,
  chartPosition => ({
    top: chartPosition.top + chartPosition.height - 30,
    left: chartPosition.left,
    width: chartPosition.width,
    height: 100,
  }),
)
