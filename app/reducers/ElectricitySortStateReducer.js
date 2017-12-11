const Constants = require('../Constants.js')

const ElectricitySortStateReducer = (state = 'location', action) => {


  switch(action.type) {

  case 'SortElectricityData':
    //Only valid sort value is allowed i.e. 'location', 'import', 'export'
    if(Constants.get('electricitySortState').contains(action.sortBy)){
      return action.sortBy
    }
    return state
  default:
    return state
  }
}


module.exports = ElectricitySortStateReducer