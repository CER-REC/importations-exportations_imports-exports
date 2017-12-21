const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  mainMenuBar:{
    electricity:{
      en:'Electricity',
      fr:'Electricity FR'
    },
    crudeOil:{
      en:'Crude Oil',
      fr:'Crude Oil FR'
    },
    naturalGas:{
      en:'Natural Gas',
      fr:'Natural Gas FR'
    },
    naturalGasLiquids:{
      en:'Natural Gas Liquids',
      fr:'Natural Gas Liquids FR'
    },
    refinedPetroleumProducts:{
      en:'Refin. Petroleum Prod',
      fr:'Refin. Petroleum Prod FR'
    }
  },

  electricitySortStates:{
    title:{
      import: {
        en:'Imports',
        fr:'Imports'
      },
      ampersand: {
        en:'&',
        fr:'&'
      },
      export: {
        en:'Exports',
        fr:'Exports'
      }
    },
    location:{
      en:'Sort By LOCATION',
      fr:'Sort By LOCATION FR'
    },
    imports:{
      en:'Sort By IMPORTS',
      fr:'Sort By IMPORTS FR'
    },
    exports:{
      en:'Sort By EXPORTS',
      fr:'Sort By EXPORTS FR'
    }
  },
  electricityDataTypes:{
    'CAN$': { en: 'CAN$', fr: 'CAN$' },
    'CAN$/MW.h': { en: 'CAN$/MW.h', fr: 'CAN$/MW.h' },
    'CN$/GJ': { en: 'CN$/GJ', fr: 'CN$/GJ' },
    'm3/d': { en: 'm3/d', fr: 'm3/d' },
    'MW.h': { en: 'MW.h', fr: 'MW.h' },
    'thousand m3/d': { en: 'thousand m3/d', fr: 'thousand m3/d' }
  },
  explanationShown:{
    en:'Show EXPLANATIONS',
    fr:'Show EXPLANATIONS FR'
  }

})

module.exports = TranslationTable
