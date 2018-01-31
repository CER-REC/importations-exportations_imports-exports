import { createSelector } from 'reselect'

import ViewportSelectors from './index'

const canadaImportMap = createSelector(
  ViewportSelectors.visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 100,
  }),
)

const chartImportPosition = createSelector(
  canadaImportMap,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 200,
  }),
)

const chartAxisPosition = createSelector(
  chartImportPosition,
  importPosition => ({
    top: importPosition.top + importPosition.height,
    left: importPosition.left,
    width: importPosition.width,
    height: 30,
  }),
)

const chartExportPosition = createSelector(
  chartAxisPosition,
  axisPosition => ({
    top: axisPosition.top + axisPosition.height,
    left: axisPosition.left,
    width: axisPosition.width,
    height: 100,
  }),
)

const usPaddPosition = createSelector(
  chartExportPosition,
  chartPosition => ({
    top: chartPosition.top + chartPosition.height,
    left: chartPosition.left,
    width: chartPosition.width,
    height: 100,
  }),
)

module.exports = {
  canadaImportMap,
  chartImportPosition,
  chartAxisPosition,
  chartExportPosition,
  usPaddPosition,
}
