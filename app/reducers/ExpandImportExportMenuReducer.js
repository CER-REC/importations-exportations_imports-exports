const defaultState = false

const ExpandImportExportMenuReducer = (state = defaultState, action) => {
  
  switch(action.type) {

  case 'ExpandImportExportMenu':
    return !state

  // TODO: reset visualization state
  // case 'ResetVisualization':
  //   return defaultState
 
  default:
    return defaultState


  }
}

module.exports = ExpandImportExportMenuReducer