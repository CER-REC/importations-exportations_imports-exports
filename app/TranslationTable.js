const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  theLegendValues: {
    rangeOne: {
      en: '1 - 9,999',
      fr: '1 - 9 999',
    },
    rangeTwo: {
      en: '10,000 - 99,999',
      fr: '10 000 - 99 999',
    },
    rangeThree: {
      en: '100,000 - 999,999',
      fr: '100 000 - 999 999',
    },
    rangeFour: {
      en: '1,000,000 - 1,999,999',
      fr: '1 000 000 - 1 999 999',
    },
    rangeFive: {
      en: '2,000,000 >',
      fr: '2 000 000 >',
    },
  },


})

module.exports = TranslationTable