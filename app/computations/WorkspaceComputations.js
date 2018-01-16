const Constants = require('../Constants.js')

const WorkspaceComputations = {}


// viewport: the viewport state
WorkspaceComputations.workspaceWidth = function (viewport) {
  return viewport.get('x')
}

WorkspaceComputations.topHeightMargin = function () {
  return Constants.get('topHeightMargin')
}

WorkspaceComputations.menuBarHeight = function (viewport) {
  return viewport.get('y') - WorkspaceComputations.topHeightMargin() 
    + Constants.getIn(['menuBar','containerHeight'])
}

WorkspaceComputations.importExportMenuY = function(viewport) {
  return WorkspaceComputations.topHeightMargin(viewport) 
    - Constants.getIn(['menuBar','importExportMenuLabelMargin'])
}

WorkspaceComputations.electricitySortMenuY = function (viewport) {
  return WorkspaceComputations.topHeightMargin(viewport)
    + Constants.getIn(['electricitySortMenu','topMargin'])
}

WorkspaceComputations.electricityAmountPriceMenuY = function (viewport) {
  return WorkspaceComputations.electricitySortMenuY(viewport) 
    + Constants.getIn(['electricityAmountPriceMenu','topMargin'])
}

WorkspaceComputations.showExplanationsY = function (viewport) {
  return WorkspaceComputations.electricityAmountPriceMenuY(viewport) 
    + 130
}

WorkspaceComputations.legendY = function (viewport) {
  return WorkspaceComputations.showExplanationsY(viewport) 
  + Constants.getIn(['legend','topMargin']) 
}

WorkspaceComputations.socialBarY = function (viewport) {
  return WorkspaceComputations.legendY(viewport)
  + Constants.getIn(['socialBar','topMargin'])
}

WorkspaceComputations.visualizationContainerWidth = function (viewport) {
  return viewport.get('x') - Constants.getIn(['visualizationContainer','widthPadding'])
}

WorkspaceComputations.visualizationContainerHeight = function (viewport) {
  return viewport.get('y') + Constants.getIn(['visualizationContainer','heightPadding'])
}

WorkspaceComputations.VisualizationDetailContainerX = function (viewport) {
  return WorkspaceComputations.workspaceWidth(viewport) 
  - Constants.getIn(['visualizationDetailContainer','width'])
}



module.exports = WorkspaceComputations