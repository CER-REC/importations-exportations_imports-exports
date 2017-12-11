const ElectricityExplanationReducer = (state = false, action) => {


  switch(action.type) {

  case 'ShowElectricityDataExplanation':
    return action.isElectricityExplanationVisible
  default:
    return state
  }
}


module.exports = ElectricityExplanationReducer