function SetLanguageCreator(language) {
  return {
    type: 'SetLanguage',
    language,
  }
}

module.exports = SetLanguageCreator
