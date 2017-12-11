const Constants = require('../Constants.js')

const ElectricityDataTypeReducer = (state = 'price', action) => {


  switch(action.type) {

  case 'SetElectricityDataType':
    //Only valid datatype name is allowed i.e. 'price' or 'mwh'
    if(Constants.get('electircityDataType').contains(action.electircityDataType)){
      return action.electircityDataType
    }
    return state
  default:
    return state
  }
}


module.exports = ElectricityDataTypeReducer