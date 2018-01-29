import { fromJS } from 'immutable'

const TranslationTable = fromJS({

  theLegendValues: {
    importations: {
      en: 'IMP',
      fr: 'IMP',
    },
    exportations: {
      en: 'EXP',
      fr: 'EXP',
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
    resetVisualization: {
      en: 'Reset Visualization',
      fr: 'Réinitialiser visualisation',
    },
  },

  aboutWindow: {
    heading: {
      en: 'ABOUT THIS PROJECT',
      fr: 'ABOUT THIS PROJECT FR',
    },
    p1: {
      en: 'Paragraph one',
      fr: 'la french FR',
    },
    p2: {
      en: 'paragraph two',
      fr: 'la french placeholder FR',
    },
    p3: {
      en: 'paragraph three',
      fr: 'la french paragraph trois FR',
    },
    p4: {
      en: 'paragraph four',
      fr: 'oui oui FR',
    },
    contributors: {
      en: 'CONTRIBUTORS',
      fr: 'CONTRIBUTORS FR',
    },
    dataSource: {
      en: 'DATA SOURCE',
      fr: 'DATA SOURCE',
    },
    dataNamesfromNEB: {
      en: 'Andrew Benson, Karen Duckworth, Randy Cooke',
      fr: 'Andrew Benson, Karen Duckworth, Randy Cooke',
    },
    nebCoordinators: {
      en: 'Annette Hester (Concept and Coordination); Katherine Murphy (Project Manager); Faiza Hussain (Administrative support); Stephen Chow (Data Coordination)',
      fr: 'TODO',
    },
    dataVisualization: {
      en: 'DATA VISUALIZATION',
      fr: 'DATA VISUALIZATION FR',
    },
    leadDesignResearch: {
      en: 'LEAD DESIGN RESEARCH',
      fr: 'LEAD DESIGN RESEARCH FR',
    },
    leadDesigners: {
      en: 'Sheelagh Carpendale and Wesley Willett, iLab, University of Calgary',
      fr: 'TODO',
    },
    coordination: {
      en: 'COORDINATION',
      fr: 'COORDINATION FR',
    },
    coordi: {
      en: 'Claudia Maurer',
      fr: 'Claudia Maurer',
    },
    design: {
      en: 'DESIGN',
      fr: 'DESIGN',
    },
    designers: {
      en: 'Jagoda Walny Nix, Peter Buk, Doris Kosminsky, Lien Quach, and Mieka West',
      fr: 'TODO',
    },
    leadTechnical: {
      en: 'LEAD TECHNICAL',
      fr: 'LEAD TECHNICAL FR',
    },
    vizworx: {
      en: 'VizworX',
      fr: 'VizworX',
    },
    technical: {
      en: 'TECHNICAL',
      fr: 'TECHNICAL',
    },
    technicalTeam: {
      en: 'Patrick King, Spenser Jones, Rahul Kamal Bhaskar, Ben Cousins, Abhishek Sharma, and Charlie Cheung',
      fr: 'Patrick King, Spenser Jones, Rahul Kamal Bhaskar, Ben Cousins, Abhishek Sharma, and Charlie Cheung',
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
      en: 'Refin. Petroleum Prod.',
      fr: 'Refin. Petroleum Prod. FR',
    },
  },

  importExportMenu: {
    imports: {
      en: 'IMPORTS',
      fr: 'IMPORTS FR',
    },
    and: {
      en: 'and',
      fr: 'and FR',
    },
    exports: {
      en: 'EXPORTS',
      fr: 'EXPORTS FR',
    },
    importsOnly: {
      en: 'IMPORTS only',
      fr: 'IMPORTS only FR',
    },
    exportsOnly: {
      en: 'EXPORTS only',
      fr: 'EXPORTS only FR',
    },
  },

  menu: {
    and: {
      en: 'and',
      fr: 'and',
    },
    activity: {
      options: {
        imports: {
          en: 'Imports',
          fr: 'Imports',
        },
        exports: {
          en: 'Exports',
          fr: 'Exports',
        },
        importsExports: {
          en: 'Imports and Exports',
          fr: 'Imports and Exports',
        },
      },
    },
    arrangeBy: {
      prefix: {
        en: 'arranged by',
        fr: 'TODO',
      },
      options: {
        location: {
          en: 'LOCATION',
          fr: 'LOCATION FR',
        },
        imports: {
          en: 'MOST IMPORTS',
          fr: 'MOST IMPORTS FR',
        },
        exports: {
          en: 'MOST EXPORTS',
          fr: 'MOST EXPORTS FR',
        },
      },
    },
    amount: {
      prefix: {
        en: 'showing',
        fr: 'TODO',
      },
      options: {
        CAN$: {
          en: 'PRICE (CAN$)',
          fr: 'CAN$',
        },
        'CAN$/MW.h': {
          en: 'PRICE (CAN$/MW.h)',
          fr: 'CAN$/MW.h',
        },
        'CN$/GJ': {
          en: 'PRICE (CN$/GJ)',
          fr: 'CN$/GJ',
        },
        'm3/d': {
          en: 'AMOUNT (m³/d)',
          fr: 'm³/d',
        },
        'MW.h': {
          en: 'AMOUNT (MW.h)',
          fr: 'MW.h',
        },
        'thousand m3/d': {
          en: 'AMOUNT (thousand m³/d)',
          fr: 'thousand m³/d',
        },
      },
    },
    subtype: {
      prefix: {
        en: 'of',
        fr: 'TODO',
      },
      options: {
        butane: {
          en: 'BUTANE',
          fr: 'TODO',
        },
        propane: {
          en: 'PROPANE',
          fr: 'PROPANE',
        },
        '': {
          en: 'Butane and Propane',
          fr: 'Butane and Propane',
        },
      },
    },
  },

  explanationShown: {
    en: 'show EXPLANATIONS',
    fr: 'show EXPLANATIONS FR',
  },

  explanationHide: {
    en: 'hide EXPLANATIONS',
    fr: 'hide EXPLANATIONS FR',
  },

  confidentialityShown: {
    en: 'show CONFIDENTIALITY',
    fr: 'show CONFIDENTIALITY FR',
  },
  confidentialityHide: {
    en: 'hide CONFIDENTIALITY',
    fr: 'hide CONFIDENTIALITY FR',
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
      en: 'Click + to see more options',
      fr: 'Click + to see more options FR',
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

  formatNumberUnit: {
    en: ['', 'K', 'M', 'B'],
    fr: ['', 'K FR', 'M FR', 'B FR'],
  },

  confidentialCount: {
    en: '$0 of $1 values Confidential',
    fr: 'FR $0 of $1 values Confidential',
  },
  detailBreakDown: {
    electricity: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a province to view Detail',
        fr: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a province to view Detail',
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exports',
          },
          action: {
            en: 'from',
            fr: 'from',
          },
          adjective: {
            en: 'selected',
            fr: 'selected',
          },
          place: {
            en: 'Provinces',
            fr: 'Provinces',
          },
        },
        body: {
          action: {
            en: 'to',
            fr: 'to',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Imports',
          },
          action: {
            en: 'to',
            fr: 'to',
          },
          adjective: {
            en: 'selected',
            fr: 'selected',
          },
          place: {
            en: 'Provinces',
            fr: 'Provinces',
          },
        },
        body: {
          action: {
            en: 'from',
            fr: 'from',
          },
        },
      },
    },
  },

  country: {
    ca: {
      YT: {
        en: 'Yukon',
        fr: 'Yukon',
      },
      NT: {
        en: 'Northwest Territories',
        fr: 'Northwest Territories',
      },
      NU: {
        en: 'Nunavut',
        fr: 'Nunavut',
      },
      NF: {
        en: 'Newfoundland and Labrador',
        fr: 'Newfoundland and Labrador',
      },
      PE: {
        en: 'Prince Edward Island',
        fr: 'Prince Edward Island',
      },
      BC: {
        en: 'British Columbia',
        fr: 'British Columbia',
      },
      AB: {
        en: 'Alberta',
        fr: 'Alberta',
      },
      SK: {
        en: 'Saskatchewan',
        fr: 'Saskatchewan',
      },
      MB: {
        en: 'Manitoba',
        fr: 'Manitoba',
      },
      ON: {
        en: 'Ontario',
        fr: 'Ontario',
      },
      QB: {
        en: 'Québec',
        fr: 'Québec',
      },
      NB: {
        en: 'New Brunswick',
        fr: 'New Brunswick',
      },
      NS: {
        en: 'Nova Scotia',
        fr: 'Nova Scotia',
      },
    },
    us: {
      AL: {
        en: 'Alabama',
        fr: 'Alabama',
      },
      AK: {
        en: 'Alaska',
        fr: 'Alaska',
      },
      AZ: {
        en: 'Arizona',
        fr: 'Arizona',
      },
      AR: {
        en: 'Arkansas',
        fr: 'Arkansas',
      },
      CA: {
        en: 'California',
        fr: 'California',
      },
      CO: {
        en: 'Colorado',
        fr: 'Colorado',
      },
      CT: {
        en: 'Connecticut',
        fr: 'Connecticut',
      },
      DE: {
        en: 'Delaware',
        fr: 'Delaware',
      },
      FL: {
        en: 'Florida',
        fr: 'Florida',
      },
      GA: {
        en: 'Georgia',
        fr: 'Georgia',
      },
      HI: {
        en: 'Hawaii',
        fr: 'Hawaii',
      },
      ID: {
        en: 'Idaho',
        fr: 'Idaho',
      },
      IL: {
        en: 'Illinois',
        fr: 'Illinois',
      },
      IN: {
        en: 'Indiana',
        fr: 'Indiana',
      },
      IA: {
        en: 'Iowa',
        fr: 'Iowa',
      },
      KS: {
        en: 'Kansas',
        fr: 'Kansas',
      },
      KY: {
        en: 'Kentucky',
        fr: 'Kentucky',
      },
      LA: {
        en: 'Louisiana',
        fr: 'Louisiana',
      },
      ME: {
        en: 'Maine',
        fr: 'Maine',
      },
      MD: {
        en: 'Maryland',
        fr: 'Maryland',
      },
      MA: {
        en: 'Massachusetts',
        fr: 'Massachusetts',
      },
      MI: {
        en: 'Michigan',
        fr: 'Michigan',
      },
      MN: {
        en: 'Minnesota',
        fr: 'Minnesota',
      },
      MS: {
        en: 'Mississippi',
        fr: 'Mississippi',
      },
      MO: {
        en: 'Missouri',
        fr: 'Missouri',
      },
      MT: {
        en: 'Montana',
        fr: 'Montana',
      },
      NE: {
        en: 'Nebraska',
        fr: 'Nebraska',
      },
      NV: {
        en: 'Nevada',
        fr: 'Nevada',
      },
      NH: {
        en: 'New Hampshire',
        fr: 'New Hampshire',
      },
      NJ: {
        en: 'New Jersey',
        fr: 'New Jersey',
      },
      NM: {
        en: 'New Mexico',
        fr: 'New Mexico',
      },
      NY: {
        en: 'New York',
        fr: 'New York',
      },
      NC: {
        en: 'North Carolina',
        fr: 'North Carolina',
      },
      ND: {
        en: 'North Dakota',
        fr: 'North Dakota',
      },
      OH: {
        en: 'Ohio',
        fr: 'Ohio',
      },
      OK: {
        en: 'Oklahoma',
        fr: 'Oklahoma',
      },
      OR: {
        en: 'Oregon',
        fr: 'Oregon',
      },
      PA: {
        en: 'Pennsylvania',
        fr: 'Pennsylvania',
      },
      RI: {
        en: 'Rhode Island',
        fr: 'Rhode Island',
      },
      SC: {
        en: 'South Carolina',
        fr: 'South Carolina',
      },
      SD: {
        en: 'South Dakota',
        fr: 'South Dakota',
      },
      TN: {
        en: 'Tennessee',
        fr: 'Tennessee',
      },
      TX: {
        en: 'Texas',
        fr: 'Texas',
      },
      UT: {
        en: 'Utah',
        fr: 'Utah',
      },
      VT: {
        en: 'Vermont',
        fr: 'Vermont',
      },
      VA: {
        en: 'Virginia',
        fr: 'Virginia',
      },
      WA: {
        en: 'Washington',
        fr: 'Washington',
      },
      WV: {
        en: 'West Virginia',
        fr: 'West Virginia',
      },
      WI: {
        en: 'Wisconsin',
        fr: 'Wisconsin',
      },
      WY: {
        en: 'Wyoming',
        fr: 'Wyoming',
      },
    },
    powerpool: {
      'NE-ISO': {
        en: 'New England-ISO',
        fr: 'New England-ISO',
      },
      'MN/ND': {
        en: 'Minn / N. Dakota',
        fr: 'Minn / N. Dakota',
      },
      PJMPP: {
        en: 'Pennsylvania Jersey Maryland Power Pool',
        fr: 'Pennsylvania Jersey Maryland Power Pool',
      },
    },
  },

  unabbreviated: {
    mainMenuBar: {
      refinedPetroleumProducts: {
        en: 'Refined Petroleum Products',
        fr: 'Refined Petroleum Products FR',
      },
    },
  },
})

module.exports = TranslationTable
