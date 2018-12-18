const ElectricityExplanationShownReducer = (state = false, action) => {
  switch (action.type) {
    case 'ShowElectricityDataExplanation':
      return action.isElectricityExplanationVisible
    default:
      return state
  }
}

export default ElectricityExplanationShownReducer
