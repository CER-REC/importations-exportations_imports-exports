import { createSelector } from 'reselect'

import { visualizationContentPosition } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const canadaPaddPosition = createSelector(
  visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left + 1.3,
    width: visContent.width,
    height: 150,
  }),
)

export const chartTransportPosition = createSelector(
  canadaPaddPosition,
  canadaPadd => ({
    top: canadaPadd.top + canadaPadd.height,
    left: canadaPadd.left,
    width: canadaPadd.width,
    height: 100,
  }),
)

export const chartSubtypePosition = createSelector(
  chartTransportPosition,
  transportPosition => ({
    top: transportPosition.top + transportPosition.height + 20,
    left: transportPosition.left,
    width: transportPosition.width,
    height: 100,
  }),
)

export const chartAxisPosition = createSelector(
  chartSubtypePosition,
  subtypePosition => ({
    top: subtypePosition.top + subtypePosition.height,
    left: subtypePosition.left,
    width: subtypePosition.width,
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
    top: chartPosition.top + chartPosition.height - 80,
    left: chartPosition.left,
    width: chartPosition.width,
    height: 100,
  }),
)