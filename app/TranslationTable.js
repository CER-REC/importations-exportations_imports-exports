const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  socialBar: {
    aboutThisProject: {
      en: 'About this project',
      fr: 'Le projet',
    },
    tellMeAStory: {
      en: 'Tell me a story',
      fr: 'Une histoire à raconter?',
    },
    methodology: {
      en: 'Methodology',
      fr: 'Méthodologie',
    },
    resetVisualzation: {
      en: 'Reset Visualization',
      fr: 'Réinitialiser Visualisation',
    },

  },

})

module.exports = TranslationTable