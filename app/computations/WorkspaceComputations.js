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
}

WorkspaceComputations.legendY = function (viewport) {
  return WorkspaceComputations.menuBarHeight(viewport) 
  + Constants.getIn(['legend','topMargin']) 
}

WorkspaceComputations.socialBarY = function (viewport) {
  return WorkspaceComputations.legendY(viewport)
  + Constants.getIn(['legend','height']) 
  + Constants.getIn(['socialBar','topMargin'])

}




module.exports = WorkspaceComputations