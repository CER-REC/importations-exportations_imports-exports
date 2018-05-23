import Immutable from 'immutable'

import Constants from '../Constants'

export const originNameValidator = (origin) => {
  // get country regions
  const countries = Constants.getIn(['dataloader', 'mapping', 'country'])
  const padds = Constants.getIn(['dataloader', 'mapping', 'padd'])
  const continents = Constants.getIn(['dataloader', 'mapping', 'continent'])
  const result = {
    country: '',
    originKey: '',
    error: '',
    isValid: false,
    continent: '',

  }
  // check if it exists in either of the country
  const inCountry = countries.findEntry(v => v.has(origin))
  const inPadd = inCountry ? undefined : padds.findEntry(v => v.has(origin))
  const inContinent = continents.get(origin.trim())
  if (inCountry) {
    result.country = inCountry[0]
    result.originKey = inCountry[1].get(origin)
    result.isValid = true
  } else if (inPadd) {
    result.country = inPadd[0]
    result.originKey = inPadd[1].get(origin)
    result.isValid = true
  } else {
    // check continent list if thats present there then its a country
    if (inContinent) {
      result.country = origin
      result.originKey = origin
      result.isValid = true
    } else {
      // also return on console that data is not valid
      // and also the state name with all value
      result.error = `Not a valid mapping ${origin}`
    }
  }
  if (inContinent) {
    result.continent = inContinent
  } else {
    result.error = `${result.error} Continent Mapping is missing ${origin}`
  }
  return Immutable.fromJS(result)
}
