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
    imports:{
      en:'Sort By IMPORTS',
      fr:'Sort By IMPORTS FR',
    },
    exports:{
      en:'Sort By EXPORTS',
      fr:'Sort By EXPORTS FR',
    },
  },

  electricityDataTypes:{
    'CAN$': { en: 'CAN$', fr: 'CAN$' },
    'CAN$/MW.h': { en: 'CAN$/MW.h', fr: 'CAN$/MW.h' },
    'CN$/GJ': { en: 'CN$/GJ', fr: 'CN$/GJ' },
    'm3/d': { en: 'm³/d', fr: 'm³/d' },
    'MW.h': { en: 'MW.h', fr: 'MW.h' },
    'thousand m3/d': { en: 'thousand m³/d', fr: 'thousand m³/d' },
  },

  explanationShown:{
    en:'show EXPLANATIONS',
    fr:'show EXPLANATIONS FR'
  },

  mainHeading: {
    imports: {
      en: 'Imports',
      fr: 'TODO',
    },
    ampersand: {
      en: ' & ',
      fr: '&',
    },
    exports: {
      en: ' Exports ',
      fr: 'TODO',
    },
    base: {
      en: 'of Energy Products to and from Canada',
      fr: 'TODO',
    },
  },

  mainSubheading: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the USA for various energy sources.',
    fr: 'TODO',
  },
  resetLabel: {
    en: 'reset',
    fr: 'réinitialiser',
  },


  applicationPath: {
    en: '/import-export-visualization/',
    fr: '/import-export-visualization/',
  },


  downloadable: {
    csv: {
      en: 'data.csv',
      fr: 'TODO FR',
    },
  },

})

module.exports = TranslationTable
