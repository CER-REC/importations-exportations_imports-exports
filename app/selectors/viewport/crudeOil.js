const createSelector = require('reselect').createSelector

const ViewportSelectors = require('./index')

const chartTransportPosition = createSelector(
  ViewportSelectors.visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
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

module.exports = {
  chartTransportPosition,
  chartSubtypePosition,
  chartAxisPosition,
  chartExportPosition,
}