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
        fr: '2,7M - 4,6M',
      },
      rangeThree: {
        en: '5.7M - 5.8M',
        fr: '5,7M - 5,8M',
      },
      rangeFour: {
        en: '7.6M - 7.7M',
        fr: '7,6M - 7,7M',
      },
      rangeFive: {
        en: '11.2M - 12.9M',
        fr: '11,2M - 12,9M',
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
        fr: '1,53M - 1,54M',
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

  mainMenuBar: {
    electricity: {
      en: 'Electricity',
      fr: 'Electricity FR',
    },
    crudeOil: {
      en: 'Crude Oil',
      fr: 'Crude Oil FR',
    },
    naturalGas: {
      en: 'Natural Gas',
      fr: 'Natural Gas FR',
    },
    naturalGasLiquids: {
      en: 'Natural Gas Liquids',
      fr: 'Natural Gas Liquids FR',
    },
    refinedPetroleumProducts: {
      en: 'Refin. Petroleum Prod',
      fr: 'Refin. Petroleum Prod FR',
    },
  },

  electricitySortStates: {
    title: {
      import: {
        en: 'Imports',
        fr: 'Imports',
      },
      ampersand: {
        en: '&',
        fr: '&',
      },
      export: {
        en: 'Exports',
        fr: 'Exports',
      },
    },
    location: {
      en: 'Sort By LOCATION',
      fr: 'Sort By LOCATION FR',
    },
    imports: {
      en: 'Sort By IMPORTS',
      fr: 'Sort By IMPORTS FR',
    },
    exports: {
      en: 'Sort By EXPORTS',
      fr: 'Sort By EXPORTS FR',
    },
  },

  electricityDataTypes: {
    CAN$: { en: 'CAN$', fr: 'CAN$' },
    'CAN$/MW.h': { en: 'CAN$/MW.h', fr: 'CAN$/MW.h' },
    'CN$/GJ': { en: 'CN$/GJ', fr: 'CN$/GJ' },
    'm3/d': { en: 'm³/d', fr: 'm³/d' },
    'MW.h': { en: 'MW.h', fr: 'MW.h' },
    'thousand m3/d': { en: 'thousand m³/d', fr: 'thousand m³/d' },
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


  explanationShown: {
    en: 'show EXPLANATIONS',
    fr: 'show EXPLANATIONS FR',
  },
  explanationHide: {
    en: 'hide EXPLANATIONS',
    fr: 'TODO',
  },

  explanations: {
    importExportTitle: {
      bolded: {
        en: 'Click',
        fr: 'Click',
      },
      text: {
        en: ' + to see more options',
        fr: ' + to see more options FR',
      },
    },
    electricity: {
      bolded: {
        en: 'Electricity',
        fr: 'Electricity',
      },
      text: {
        en: ' is the selected energy product',
        fr: ' is the selected energy product FR',
      },
    },
    timeSeek: {
      bolded: {
        en: 'Drag',
        fr: 'TODO',
      },
      text: {
        en: ' to select time frame',
        fr: ' to select time frame FR',
      },
    },
    playButton: {
      bolded: {
        en: 'Click',
        fr: 'Click TODO',
      },
      text: {
        en: ' play to see how electricity changes over time',
        fr: ' play to see how electricity changes over time FR',
      },
    },
    newYork: {
      bolded: {
        en: 'New York',
        fr: 'New York',
      },
      text: {
        en: ' has the highest exports into the US as well as the highest imports from the US',
        fr: ' has the highest exports into the US as well as the highest imports from the US FR',
      },
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
