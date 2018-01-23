const Constants = require('../Constants.js')

const WorkspaceComputations = {}

// viewport: the viewport state
WorkspaceComputations.workspaceWidth = viewport => viewport.get('x')

WorkspaceComputations.visualizationHeight = viewport => viewport.get('y') + 500

WorkspaceComputations.topHeightMargin = () => Constants.get('topHeightMargin')

WorkspaceComputations.menuBarHeight = viewport =>
  (viewport.get('y') - WorkspaceComputations.topHeightMargin())
    + Constants.getIn(['menuBar', 'containerHeight'])

WorkspaceComputations.importExportMenuY = viewport =>
  WorkspaceComputations.topHeightMargin(viewport) - Constants.getIn(['menuBar', 'importExportMenuLabelMargin'])

WorkspaceComputations.electricitySortMenuY = viewport =>
  WorkspaceComputations.topHeightMargin(viewport) + Constants.getIn(['electricitySortMenu', 'topMargin'])

WorkspaceComputations.electricityAmountPriceMenuY = viewport =>
  WorkspaceComputations.electricitySortMenuY(viewport) + Constants.getIn(['electricityAmountPriceMenu', 'topMargin'])

WorkspaceComputations.showExplanationsY = viewport =>
  WorkspaceComputations.electricityAmountPriceMenuY(viewport) + Constants.getIn(['showExplanations', 'topMargin'])

WorkspaceComputations.legendY = viewport =>
  WorkspaceComputations.showExplanationsY(viewport) + Constants.getIn(['legend', 'topMargin'])

WorkspaceComputations.socialBarY = viewport => viewport.get('y') + 120

WorkspaceComputations.visualizationContainerWidth = viewport =>
  viewport.get('x') - Constants.getIn(['visualizationContainer', 'widthPadding'])

WorkspaceComputations.visualizationContainerHeight = viewport =>
  viewport.get('y') + Constants.getIn(['visualizationContainer', 'heightPadding'])

WorkspaceComputations.VisualizationDetailContainerX = viewport =>
  WorkspaceComputations.workspaceWidth(viewport) - Constants.getIn(['visualizationDetailContainer', 'width'])

module.exports = WorkspaceComputations
