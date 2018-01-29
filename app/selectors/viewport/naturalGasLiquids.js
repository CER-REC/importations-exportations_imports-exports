import { createSelector } from 'reselect'

import { visualizationContentPosition } from './index'

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
    height: 30,
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
