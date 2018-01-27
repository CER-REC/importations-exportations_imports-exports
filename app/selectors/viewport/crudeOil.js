import { createSelector } from 'reselect'

import ViewportSelectors from './index'

const canadaPaddPosition = createSelector(
  ViewportSelectors.visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 100,
  }),
)

const chartTransportPosition = createSelector(
  canadaPaddPosition,
  canadaPadd => ({
    top: canadaPadd.top + canadaPadd.height,
    left: canadaPadd.left,
    width: canadaPadd.width,
    height: 100,
  }),
)

const chartSubtypePosition = createSelector(
  chartTransportPosition,
  transportPosition => ({
    top: transportPosition.top + transportPosition.height + 20,
    left: transportPosition.left,
    width: transportPosition.width,
    height: 100,
  }),
)

const chartAxisPosition = createSelector(
  chartSubtypePosition,
  subtypePosition => ({
    top: subtypePosition.top + subtypePosition.height,
    left: subtypePosition.left,
    width: subtypePosition.width,
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
  canadaPaddPosition,
  chartTransportPosition,
  chartSubtypePosition,
  chartAxisPosition,
  chartExportPosition,
  usPaddPosition,
}
