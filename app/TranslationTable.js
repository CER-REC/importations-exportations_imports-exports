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
    import:{
      en:'Sort By IMPORTS',
      fr:'Sort By IMPORTS FR'
    },
    export:{
      en:'Sort By EXPORTS',
      fr:'Sort By EXPORTS FR'
    }
  },
  electricityDataTypes:{
    price:{
      en:'Show PRICE',
      fr:'Show PRICE FR'
    },
    mwh:{
      en:'Show AMOUNT (MW. h)',
      fr:'Show AMOUNT (MW. h) FR'
    }
  },
  explanationShown:{
    en:'Show EXPLANATIONS',
    fr:'Show EXPLANATIONS FR'
  }

})

module.exports = TranslationTable