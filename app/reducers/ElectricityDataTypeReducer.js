const Constants = require('../Constants.js')

const ElectricityDataTypeReducer = (state = 'price', action) => {


  switch(action.type) {

  case 'SetElectricityDataType':
    //Only valid datatype name is allowed i.e. 'price' or 'mwh'
    if(Constants.get('electricityDataTypes').contains(action.electricityDataType)){
      return action.electricityDataType
    }
    return state
  default:
    return state
  }
}


module.exports = ElectricityDataTypeReducer