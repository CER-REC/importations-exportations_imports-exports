const defaultState = false

const ExpandElectricitySortMenuReducer = (state = defaultState, action) => {
  
  switch(action.type) {

  case 'ExpandElectricitySortMenu':
    return !state

  // TODO: reset visualization state
  // case 'ResetVisualization':
  //   return defaultState
 
  default:
    return defaultState


  }
}

export default ExpandElectricitySortMenuReducer
