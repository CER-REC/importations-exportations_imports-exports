const Constants = require('./Constants.js')

const WorkspaceComputations = {}


// viewport: the viewport state
WorkspaceComputations.workspaceWidth = function (viewport) {
  return viewport.get('x')
}


module.exports = WorkspaceComputations