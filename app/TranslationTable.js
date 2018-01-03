const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  theLegendValues: {
    importations: {
      en: 'IMP',
      fr: 'IMP',
    },
    exportations: {
      en: 'EXP',
      fr: 'EXP',
    },
    electricity: {
      rangeOne: {
        en: '0 - 4M',
        fr: '0 - 4M',
      },
      rangeTwo: {
        en: '57M - 140M',
        fr: '57M - 140M',
      },
      rangeThree: {
        en: '160M - 235M',
        fr: '160M - 235M',
      },
      rangeFour: {
        en: '279M - 335M',
        fr: '279M - 335M',
      },
      rangeFive: {
        en: '448M - 449M',
        fr: '448M - 449M',
      },
    },
    crudeOil: {
      rangeOne: {
        en: '0 - 300',
        fr: '0 - 300',
      },
      rangeTwo: {
        en: '1,500 - 1,600',
        fr: '1 500 - 1 600',
      },
      rangeThree: {
        en: '2,000 - 2,800',
        fr: '2 000 - 2 800',
      },
      rangeFour: {
        en: '3,700 - 3,800',
        fr: '3 700 - 3 800',
      },
      rangeFive: {
        en: '21,100 - 21,200',
        fr: '21 100 - 21 200',
      },
    },
    naturalGas: {
      rangeOne: {
        en: '0 - 1.7M',
        fr: '0 - 1.7M',
      },
      rangeTwo: {
        en: '2.7M - 4.6M',
        fr: '2.7M - 4.6M',
      },
      rangeThree: {
        en: '5.7M - 5.8M',
        fr: '5.7M - 5.8M',
      },
      rangeFour: {
        en: '7.6M - 7.7M',
        fr: '7.6M - 7.7M',
      },
      rangeFive: {
        en: '11.2M - 12.9M',
        fr: '11.2M - 12.9M',
      },
    },
    naturalGasLiquids: {
      rangeOne: {
        en: '1K - 19K',
        fr: '1K - 19K',
      },
      rangeTwo: {
        en: '119K - 120K',
        fr: '119K - 120K',
      },
      rangeThree: {
        en: '339K - 340K',
        fr: '339K - 340K',
      },
      rangeFour: {
        en: '595K - 596K',
        fr: '595K - 596K',
      },
      rangeFive: {
        en: '1.53M - 1.54M',
        fr: '1.53M - 1.54M',
      },
    },
  },

  socialBar: {
    aboutThisProject: {
      en: 'About this project',
      fr: 'Le projet',
    },
    methodology: {
      en: 'Methodology',
      fr: 'Méthodologie',
    },
    resetVisualzation: {
      en: 'Reset Visualization',
      fr: 'Réinitialiser visualisation',
    },

  },

  mainMenuBar:{
    electricity:{
      en:'Electricity',
      fr:'Electricity FR',
    },
    crudeOil:{
      en:'Crude Oil',
      fr:'Crude Oil FR',
    },
    naturalGas:{
      en:'Natural Gas',
      fr:'Natural Gas FR',
    },
    naturalGasLiquids:{
      en:'Natural Gas Liquids',
      fr:'Natural Gas Liquids FR',
    },
    refinedPetroleumProducts:{
      en:'Refin. Petroleum Prod',
      fr:'Refin. Petroleum Prod FR',
    },
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
        fr:'Exports',
      },
    },
    location:{
      en:'Sort By LOCATION',
      fr:'Sort By LOCATION FR'
    },
    import:{
      en:'Sort By IMPORTS',
      fr:'Sort By IMPORTS FR',
    },
    export:{
      en:'Sort By EXPORTS',
      fr:'Sort By EXPORTS FR',
    },
  },

  electricityDataTypes:{
    price:{
      en:'Show PRICE',
      fr:'Show PRICE FR',
    },
    mwh:{
      en:'Show AMOUNT (MW. h)',
      fr:'Show AMOUNT (MW. h) FR',
    },
  },

  explanationShown:{
    en:'Show EXPLANATIONS',
    fr:'Show EXPLANATIONS FR',
  },


  applicationPath: {
    en: '/pipeline-incidents/',
    fr: '/incidents-pipeliniers/',
  },


  downloadable: {
    csv: {
      en: 'TODO',
      fr: 'TODO FR',
    },
  },


})

module.exports = TranslationTable