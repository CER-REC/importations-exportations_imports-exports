const createSelector = require('reselect').createSelector

const ViewportSelectors = require('./index')

const canadaMapPosition = createSelector(
  ViewportSelectors.visualizationContentPosition,
  visContent => ({
    top: visContent.top,
    left: visContent.left,
    width: visContent.width,
    height: 200,
  }),
)

const chartImportPosition = createSelector(
  canadaMapPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 100,
  }),
)

const chartAxisPosition = createSelector(
  chartImportPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 30,
  }),
)

const chartExportPosition = createSelector(
  chartAxisPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 100,
  }),
)

const usMapPosition = createSelector(
  chartExportPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left,
    width: prev.width,
    height: 300,
  }),
)

const powerPoolPosition = createSelector(
  usMapPosition,
  prev => ({
    top: prev.top + prev.height,
    left: prev.left + prev.width - 375,
    width: 150,
    height: 50,
  }),
)

const mapPieceActivityExplantionPosition = createSelector(
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

module.exports = {
  canadaMapPosition,
  chartImportPosition,
  chartAxisPosition,
  chartExportPosition,
  usMapPosition,
  powerPoolPosition,
  mapPieceActivityExplantionPosition,
}