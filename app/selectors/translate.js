import { createSelector } from 'reselect'

import TR from '../TranslationTable'

export default createSelector(
  state => state.language,
  language => (pathRaw, ...replacements) => {
    const path = [].concat(pathRaw).concat(language)
    let translation = TR.getIn(path)
    replacements.forEach((value, i) => {
      translation = translation.replace(new RegExp(`\\$${i}(\\b)`, 'g'), value)
    })
    return translation
  },
)
