import Constants from '../Constants'
import Tr from '../TranslationTable'

// State: one of 'en' or 'fr'
const initialState =
  (document.location.pathname.startsWith(Tr.getIn(['applicationPath', 'fr']))) ? 'fr' : 'en'
const LanguageReducer = (state = initialState, action) => {
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

export default LanguageReducer
