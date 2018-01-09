const Constants = require('../Constants.js')
const Immutable = require('immutable')
const {ErrorMessageTable} = require('../DebuggingMessageTable.js')

const originNameValidator = (origin)=>{
  //get country regions 
  const countries = Constants.getIn(['dataloader', 'mapping', 'country'])
  let result = {
    country: '',
    originKey: '',
    isValid: false

  }
  //check if it exists in either of the country
  const country = countries.filter(
    contry=>{
      if(contry.get(origin) !== 'undefined'){
        return contry.get(origin)
      }
    }
  )
  //if it exists return true with key and country 
  //else return false and key and country false
  if(country.size > 0){
    result.country = country.keys().next().value
    result.originKey = country.values().next().value.get(origin)
    result.isValid = true
  }else{
    //also return on console that data is not valid 
    //and also the state name with all value 
    ErrorMessageTable('originNameValidator', 
      'Missing Mapping', 
      `Not a valid origin: ${origin}`)  
  }
  return Immutable.fromJS(result) 
}

module.exports = {
  originNameValidator  
}