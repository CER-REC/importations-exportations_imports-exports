const Constants = require('../Constants.js')

const ElectricityDataTypeReducer = (state = 'MW.h', action) => {


  switch(action.type) {

  case 'SetElectricityDataType':
    //Only valid datatype name is allowed i.e. 'price' or 'mwh'
    // TODO: Re-enable this after restructuring reducers, since we need to
    // access the current energy type to check the constants properly
    // https://redux.js.org/docs/faq/Reducers.html#how-do-i-share-state-between-two-reducers-do-i-have-to-use-combinereducers
    /*
    if(Constants.get('electricityDataTypes').contains(action.electricityDataType)){
      return action.electricityDataType
    }
    return state
    */
    return action.electricityDataType
  default:
    return state
  }
}


module.exports = ElectricityDataTypeReducer
