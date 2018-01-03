const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  theLegendValues: {
    importations: {
      en: 'imp',
      fr: 'imp',
    },
    exportations: {
      en: 'exp',
      fr: 'exp',
    },
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