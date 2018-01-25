import Constants from '../Constants'

// State: one of 'en' or 'fr'
const LanguageReducer = (state = 'en', action) => {
  switch (action.type) {
    case 'SetLanguage':
      // Added a check to verify that string is either 'en' or 'fr'
      if (Constants.get('language').contains(action.language)) {
        return action.language
      }
      return state
    default:
      return state
  }
}

module.exports = LanguageReducer
