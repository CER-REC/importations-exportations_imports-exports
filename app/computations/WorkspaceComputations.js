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
    + Constants.getIn(['visualizationContainer','heightPadding']) + 100
}

WorkspaceComputations.legendY = function (viewport) {
  return WorkspaceComputations.menuBarHeight(viewport) 
  + Constants.getIn(['legend','topMargin']) 
}

WorkspaceComputations.socialBarY = function (viewport) {
  return WorkspaceComputations.legendY(viewport)
  + Constants.getIn(['socialBar','topMargin']) - 70
}

WorkspaceComputations.visualizationContainerWidth = function (viewport) {
  return viewport.get('x') - Constants.getIn(['visualizationContainer','widthPadding'])
}

WorkspaceComputations.visualizationContainerHeight = function (viewport) {
  return viewport.get('y') + Constants.getIn(['visualizationContainer','heightPadding'])
}

WorkspaceComputations.VisualizationDetailContainerX = function (viewport) {
  return WorkspaceComputations.workspaceWidth(viewport) 
  - Constants.getIn(['VisualizationDetailContainer','width'])
}



module.exports = WorkspaceComputations