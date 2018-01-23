const defaultState = false

const ExpandElectricityAmountMenuReducer = (state = defaultState, action) => {
  
  switch(action.type) {

  case 'ExpandElectricityAmountMenu':
    return !state

  // TODO: reset visualization state
  // case 'ResetVisualization':
  //   return defaultState
 
  default:
    return defaultState


  }
}

module.exports = ExpandElectricityAmountMenuReducer