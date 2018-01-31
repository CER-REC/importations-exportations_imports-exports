import { createSelector } from 'reselect'

import { visualizationContentPosition } from './index'

export const canadaMapPosition = createSelector(
  visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 120,
  }),
)

export const chartImportPosition = createSelector(
  canadaMapPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 100,
  }),
)

export const chartAxisPosition = createSelector(
  chartImportPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 30,
  }),
)

export const chartExportPosition = createSelector(
  chartAxisPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 100,
  }),
)

export const usMapPosition = createSelector(
  chartExportPosition,
  prev => ({
    top: prev.top + prev.height + 50,
    left: prev.left,
    width: prev.width,
    height: 200,
  }),
)

export const powerPoolPosition = createSelector(
  usMapPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left + prev.width - 375,
    width: 150,
    height: 50,
  }),
)

export const mapPieceActivityExplanationPosition = createSelector(
  usMapPosition,
  prev => ({
    // Currently this is hardcoded value
    // TODO: replace by dynamic value once new navigation bar is merged
    top: 550,
    left: 10,
    width: 150,
    height: 50,
  }),
)
