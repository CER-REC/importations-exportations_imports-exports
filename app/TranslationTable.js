import { fromJS } from 'immutable'

const TranslationTable = fromJS({
  theLegendValues: {
    importations: {
      en: 'IMP',
      fr: 'IMP.',
    },
    exportations: {
      en: 'EXP',
      fr: 'EXP.',
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
      fr: 'Réinitialisation de la visualisation',
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
    closeWindow: {
      en: 'Close About Window',
      fr: 'Close About Window',
    },
  },

  dataDownloadModal: {
    title: {
      en: 'DATA DOWNLOAD',
      fr: 'DATA DOWNLOAD fr',
    },
    subtext: {
      en: 'The data used to create this visualization is open data available for you to download. Click the icon to save the data file to your computer.',
      fr: 'TODO',
    },
  },

  mainMenuBar: {
    electricity: {
      en: 'Electricity',
      fr: 'Électricité',
    },
    crudeOil: {
      en: 'Crude Oil',
      fr: 'Pétrole brut',
    },
    naturalGas: {
      en: 'Natural Gas',
      fr: 'Gaz naturel',
    },
    naturalGasLiquids: {
      en: 'Natural Gas Liquids',
      fr: 'Liquides de gaz naturel',
    },
    refinedPetroleumProducts: {
      en: 'Refin. Petroleum Prod.',
      fr: 'Prod. pétroliers rafinn.',
    },
  },

  importExportMenu: {
    imports: {
      en: 'IMPORTS',
      fr: 'IMPORTATIONS',
    },
    and: {
      en: 'and',
      fr: 'et',
    },
    exports: {
      en: 'EXPORTS',
      fr: 'EXPORTATIONS',
    },
    importsOnly: {
      en: 'IMPORTS only',
      fr: 'IMPORTATIONS seulement',
    },
    exportsOnly: {
      en: 'EXPORTS only',
      fr: 'EXPORTATIONS seulement',
    },
  },

  menu: {
    and: {
      en: 'and',
      fr: 'et',
    },

    /* TODO: We can't translate 'of' this way. It needs to be...
    d'Électricité
    de Pétrole brut
    de Gaz naturel
    de Liquides de gaz naturel
    de Prod. pétroliers rafinn.
    */

    of: {
      en: 'of',
      fr: 'd’',
    },
    activity: {
      options: {
        imports: {
          en: 'Imports',
          fr: 'Importations',
        },
        exports: {
          en: 'Exports',
          fr: 'Exportations',
        },
        importsExports: {
          en: 'Imports and Exports',
          fr: 'Importations et exportations',
        },
        importsForReexport: {
          en: 'Temporary Imports',
          fr: 'Temporary Imports FR',
        },
        exportsForReimport: {
          en: 'Temporary Exports',
          fr: 'Temporary Exports FR',
        },
      },
    },
    arrangeBy: {
      prefix: {
        en: 'arranged by',
        fr: 'selon le',
      },
      options: {
        location: {
          en: 'LOCATION',
          fr: 'LIEU',
        },
        imports: {
          en: 'MOST IMPORTS',
          fr: 'PLUS D’IMPORTATIONS',
        },
        exports: {
          en: 'MOST EXPORTS',
          fr: 'PLUS D’EXPORTATIONS',
        },
        stack: {
          en: 'STACK',
          fr: 'STACK FR',
        },
        split: {
          en: 'SPLIT',
          fr: 'SPLIT FR',
        },
      },
    },
    amount: {
      prefix: {
        en: 'showing',
        fr: 'avec',
      },
      options: {
        CAN$: {
          en: 'PRICE (CAN$)',
          fr: 'PRIX ($ CAN)',
        },
        'CAN$/MW.h': {
          en: 'PRICE (CAN$/MW.h)',
          fr: 'PRIX ($ CAN/MWh)',
        },
        'CN$/GJ': {
          en: 'PRICE (CN$/GJ)',
          fr: 'PRIX ($ CAN/GJ)',
        },
        'm3/d': {
          en: 'AMOUNT (m³/d)',
          fr: 'QUANTITÉ (m³/j)',
        },
        'MW.h': {
          en: 'AMOUNT (MW.h)',
          fr: 'QUANTITÉ (MWh)',
        },
        'thousand m3/d': {
          en: 'AMOUNT (10³m³/d)',
          fr: 'QUANTITÉ (10³m³/j)',
        },
      },
    },
    subtype: {
      prefix: {
        en: 'of',
        fr: 'de',
      },
      options: {
        butane: {
          en: 'BUTANE',
          fr: 'BUTANE',
        },
        propane: {
          en: 'PROPANE',
          fr: 'PROPANE',
        },
        '': {
          en: 'Butane and Propane',
          fr: 'Butane et Propane',
        },
      },
    },
  },

  explanationShown: {
    en: 'EXPLANATIONS',
    fr: 'EXPLICATIONS',
  },

  confidentialityShown: {
    en: 'CONFIDENTIALITY',
    fr: 'CONFIDENTIALITÉ',
  },
  amounts: {
    CAN$: { en: 'CAN$', fr: '$ CAN' },
    'CAN$/MW.h': { en: 'CAN$/MW.h', fr: '$ CAN/MWh' },
    'CN$/GJ': { en: 'CN$/GJ', fr: '$ CAN/GJ' },
    'm3/d': { en: 'm³/d', fr: 'm³/j' },
    'MW.h': { en: 'MW.h', fr: 'MWh' },
    'thousand m3/d': { en: 'thousand m³/d', fr: '103m³/j' },
  },

  mainHeading: {
    imports: {
      en: 'Imports',
      fr: 'Importations',
    },
    ampersand: {
      en: ' & ',
      fr: ' & ',
    },
    exports: {
      en: ' Exports ',
      fr: ' Exportations ',
    },
    base: {
      en: 'of Energy Products to and from Canada',
      fr: 'de produits énergétiques du Canada',
    },
  },

  explanations: {
    amount: {
      en: 'MWh denotes a Megawatt hour, a unit of measurement of electricity. 1 MWH is equivalent to _______. CAN$ denotes the total revenue. CAN$/MWh denotes the average price per Megawatt hour.',
      fr: 'TODO',
    },
    timeSeek: {
      en: 'Drag these handles to select a different time period.',
      fr: 'TODO',
    },
    playButton: {
      en: 'Press the play button to animate one quarter at a time.',
      fr: 'TODO',
    },
    barChartExport: {
      en: 'Each blue bar shows the total electricity that Canadian provinces exported during a single quarter.',
      fr: 'TODO',
    },
    washingtonArrow: {
      en: 'The up arrow shows the total electricity that Canadian provinces imported from Washington during the time period selected above.',
      fr: 'TODO',
    },
    barChartImport: {
      en: 'Each orange bar shows the total electricity that Canadian provinces imported during a single quarter.',
      fr: 'TODO',
    },
    title: {
      en: 'This data visualization shows Canadian imports and exports of electricity. Click the pink dots to guide you through how to read the data.',
      fr: 'TODO',
    },
    linkedDataIcon: {
      en: "Click here to scale each chart's y-axis independently. This is useful to zoom in when the bars on one side are much smaller than on the other side.",
      fr: 'TODO',
    },
    newBrunswickArrow: {
      en: 'The down arrow shows the total electricity that New Brunswick exported to U.S. states during the time period selected below.',
      fr: 'TODO',
    },
    timelineRange: {
      en: 'Drag this line up and down to read the values of the y-axis as different heights.',
      fr: 'TODO',
    },
    vermontArrow: {
      en: 'The down arrow shows the total electricity that Canadian provinces exported to Vermont during the time period selected above.',
      fr: 'TODO',
    },
  },

  mainSubheading: {
    en: 'This visualization shows the quarterly energy trade data between Canada and the USA for various energy sources.',
    fr: 'Cette visualisation illustre les données trimestrielles sur les échanges énergétiques entre le Canada et les États-Unis pour diverses sources d’énergie.',
  },
  resetLabel: {
    en: 'reset',
    fr: 'Réinitialisation',
  },

  socialBarText: {
    about: {
      en: 'about',
      fr: 'À propos de la',
    },
    methodology: {
      en: 'methodology',
      fr: 'méthodologie',
    },
    downloadData: {
      en: 'download data',
      fr: 'Téléchargement de données',
    },
    downloadImage: {
      en: 'download image',
      fr: 'Téléchargement d’images',
    },
  },

  applicationPath: {
    en: '/import-export-visualization/',
    fr: '/visualisation-importations-exportations/',
  },

  visualizationPaths: {
    electricity: {
      en: 'electricity',
      fr: 'électricité',
    },
    crudeOil: {
      en: 'crude-oil',
      fr: 'pétrole-brut',
    },
    naturalGas: {
      en: 'natural-gas',
      fr: 'gaz-naturel',
    },
    naturalGasLiquids: {
      en: 'natural-gas-liquids',
      fr: 'liquides-de-gaz-naturel',
    },
    refinedPetroleumProducts: {
      en: 'refined-petroleum-products',
      fr: 'produits-pétroliers-raffinés',
    },
  },

  imageDownload: {
    en: 'Image Download',
    fr: 'TODO',
  },

  saveImage: {
    en: 'Save Image',
    fr: 'TODO',
  },

  downloadable: {
    csv: {
      en: 'data.csv',
      fr: 'data.csv',
    },
  },

  formatNumberUnit: {
    en: ['', 'K', 'M', 'B'],
    fr: ['', 'k', 'M', 'G'],
  },

  confidentialCount: {
    en: '$0 of $1 values Confidential',
    fr: '$0 sur $1 valeurs Confidentiel',
  },
  missingCount: {
    en: '$0 of $1 entries missing information',
    fr: '$0 sur $1 entries missing information',
  },
  detailBreakDown: {
    electricity: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a province to view Detail',
        fr: 'Cette visualisation illustre les importations et les exportations du Canada de $0 à $1. Faites glisser la ligne du temps pour modifier les années. Cliquez sur une province pour des précisions à ce sujet.',
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'from',
            fr: 'de',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Provinces',
            fr: 'provinces',
          },
        },
        body: {
          action: {
            en: 'to',
            fr: 'à',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Provinces',
            fr: 'Provinces',
          },
        },
        body: {
          action: {
            en: 'from',
            fr: 'de',
          },
        },
      },
    },
    crudeOil: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a province to view Detail',
        fr: 'Cette visualisation illustre les importations et les exportations du Canada de $0 à $1. Faites glisser la ligne du temps pour modifier les années. Cliquez sur une province pour des précisions à ce sujet.',
      },
      transport: {
        type: {
          en: 'Exports',
          fr: 'Exportations',
        },
        action: {
          en: 'to',
          fr: 'par',
        },
        header: {
          type: {
            en: '',
            fr: '',
          },
          action: {
            en: 'Mode of Transportation',
            fr: 'Mode of Transportation',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: '',
            fr: '',
          },
        },
      },
      productSubtype: {
        header: {
          type: {
            en: '',
            fr: '',
          },
          action: {
            en: 'Type of Crude',
            fr: 'Type of Crude',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: '',
            fr: '',
          },
        },
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'PADDS',
            fr: 'PADDS',
          },
        },
        body: {
          action: {
            en: 'to',
            fr: 'à',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'Provinces',
            fr: 'Provinces',
          },
        },
        body: {
          action: {
            en: 'from',
            fr: 'de',
          },
        },
      },
    },
    naturalGasLiquids: {
      defaultText: {
        en: 'This visualization shows imports to Canada and exports from Canada between the years $0 and $1. Drag the timeline bar to change. Click a province to view Detail',
        fr: 'Cette visualisation illustre les importations et les exportations du Canada de $0 à $1. Faites glisser la ligne du temps pour modifier les années. Cliquez sur une province pour des précisions à ce sujet.',
      },
      exports: {
        header: {
          type: {
            en: 'Exports',
            fr: 'Exportations',
          },
          action: {
            en: 'from',
            fr: 'de',
          },
          adjective: {
            en: 'selected',
            fr: 'ces',
          },
          place: {
            en: 'CAN',
            fr: 'CAN',
          },
        },
        body: {
          action: {
            en: '',
            fr: '',
          },
        },
      },
      imports: {
        header: {
          type: {
            en: 'Imports',
            fr: 'Importations',
          },
          action: {
            en: 'to',
            fr: 'par',
          },
          adjective: {
            en: '',
            fr: '',
          },
          place: {
            en: 'CAN',
            fr: 'CAN',
          },
        },
        body: {
          action: {
            en: '',
            fr: '',
          },
        },
      },
    },
  },
  subType: {
    Butane: {
      en: 'BUTANE',
      fr: 'BUTANE',
    },
    Propane: {
      en: 'PROPANE',
      fr: 'PROPANE',
    },
    propaneButane: {
      en: 'Butane and Propane',
      fr: 'Butane et Propane',
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
        fr: 'Territoires du Nord-Ouest',
      },
      NU: {
        en: 'Nunavut',
        fr: 'Nunavut',
      },
      NF: {
        en: 'Newfoundland and Labrador',
        fr: 'Terre-Neuve-et-Labrador',
      },
      PE: {
        en: 'Prince Edward Island',
        fr: 'Île-du-Prince-Édouard',
      },
      BC: {
        en: 'British Columbia',
        fr: 'Colombie-Britannique',
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
        fr: 'Nouveau-Brunswick',
      },
      NS: {
        en: 'Nova Scotia',
        fr: 'Nouvelle-Écosse',
      },
      'ATL-Q': {
        en: 'Atlantic provinces and Quebec',
        fr: 'Atlantic provinces and Quebec',
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
        fr: 'Californie',
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
        fr: 'Floride',
      },
      GA: {
        en: 'Georgia',
        fr: 'Georgie',
      },
      HI: {
        en: 'Hawaii',
        fr: 'Hawaï',
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
        fr: 'Louisiane',
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
        fr: 'Nouveau-Mexique',
      },
      NY: {
        en: 'New York',
        fr: 'New York',
      },
      NC: {
        en: 'North Carolina',
        fr: 'Caroline du Nord',
      },
      ND: {
        en: 'North Dakota',
        fr: 'Dakota du Nord',
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
        fr: 'Pennsylvanie',
      },
      RI: {
        en: 'Rhode Island',
        fr: 'Rhode Island',
      },
      SC: {
        en: 'South Carolina',
        fr: 'Caroline du Sud',
      },
      SD: {
        en: 'South Dakota',
        fr: 'Dakota du Sud',
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
        fr: 'Virginie',
      },
      WA: {
        en: 'Washington',
        fr: 'Washington',
      },
      WV: {
        en: 'West Virginia',
        fr: 'Virginie-Occidentale',
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
        fr: 'Nouvelle-Angleterre ISO',
      },
      'MN/ND': {
        en: 'Minn / N. Dakota',
        fr: 'Minn. / Dakota N.',
      },
      PJMPP: {
        en: 'Pennsylvania Jersey Maryland Power Pool',
        fr: 'Réseau commun Pennsylvanie NJ Maryland',
      },
      powerPools: {
        en: 'Power Pools',
        fr: 'TODO',
      },
    },
  },
  Padd: {
    ca: {
      ca: {
        en: 'CANADA',
        fr: 'CANADA',
      },
    },
    us: {
      'PADD I': {
        en: 'PADD I',
        fr: 'PADD I',
      },
      'PADD II': {
        en: 'PADD II',
        fr: 'PADD II',
      },
      'PADD III': {
        en: 'PADD III',
        fr: 'PADD III',
      },
      'PADD IV': {
        en: 'PADD IV',
        fr: 'PADD IV',
      },
      'PADD V': {
        en: 'PADD V',
        fr: 'PADD V',
      },
      'Non-USA': {
        en: 'NON-USA',
        fr: 'HORS É.-U.',
      },
      Mexico: {
        en: 'MEXICO',
        fr: 'MEXIQUE',
      },
    },
  },
  unabbreviated: {
    mainMenuBar: {
      refinedPetroleumProducts: {
        en: 'Refined Petroleum Products',
        fr: 'Produits pétroliers raffinés',
      },
    },
  },

  mapTileLabel: {
    en: '$0 imports $1 $3 and exports $2 $3',
    fr: '$0 imporations $1 $3 et exportations $2 $3',
  },
  legendMapTiles: {
    electricity: {
      ca: {
        imports: {
          label: {
            en: 'Imports from Canada',
            fr: 'Importations du Canada',
          },
        },
        exports: {
          label: {
            en: 'Exports into Canada',
            fr: 'Exportations au Canada',
          },
        },
        stateOrProvince: {
          en: 'Province',
          fr: 'Province',
        },
      },
      us: {
        imports: {
          label: {
            en: 'Imports from USA',
            fr: 'Importations des États-Unis',
          },
        },
        exports: {
          label: {
            en: 'Exports into USA',
            fr: 'Exportations aux États-Unis',
          },
        },
        stateOrProvince: {
          en: 'State',
          fr: 'État',
        },
      },
    },
    crudeOil: {
      exports: {
        label: {
          en: 'Exports into US PADD',
          fr: 'Exportations au PADD',
        },
        bottomText: {
          en: 'PADD',
          fr: 'PADD',
        },
        topText: {
          en: 'CANADA',
          fr: 'CANADA',
        },
      },
    },
    naturalGasLiquids: {
      ca: {
        imports: {
          label: {
            en: 'Imports from Canada',
            fr: 'Importations du Canada',
          },
        },
        exports: {
          label: {
            en: 'Exports into Canada',
            fr: 'Exportations au Canada',
          },
        },
        stateOrProvince: {
          en: 'Province',
          fr: 'Province',
        },
      },
      us: {
        exports: {
          label: {
            en: 'Exports into US PADD',
            fr: 'Exportations au PADD',
          },
          bottomText: {
            en: 'PADD',
            fr: 'PADD',
          },
        },
      },
    },
    naturalGas: {
      importsExports: {
        imports: {
          label: {
            en: 'Imports from Canada',
            fr: 'Importations du Canada',
          },
        },
        exports: {
          label: {
            en: 'Exports into Canada',
            fr: 'Exportations au Canada',
          },
        },
        stateOrProvince: {
          en: 'Port',
          fr: 'Port',
        },
      },

      importsForReexport: {
        imports: {
          label: {
            en: 'temporary imports into Canada',
            fr: 'temporary imports into Canada FR',
          },
        },
        exports: {
          label: {
            en: 're-exports (of temporary imports) from Canada',
            fr: 're-exports (of temporary imports) from Canada FR',
          },
        },
        stateOrProvince: {
          en: 'Port',
          fr: 'Port',
        },
      },

      exportsForReimport: {
        imports: {
          label: {
            en: 're-exports (of temporary exports) into Canada',
            fr: 're-exports (of temporary exports) into Canada FR',
          },
        },
        exports: {
          label: {
            en: 'temporary exports from Canada',
            fr: 'temporary exports from Canada FR',
          },
        },
        stateOrProvince: {
          en: 'Port',
          fr: 'Port',
        },
      },

    },
  },

  chartOptions: {
    scaleLinked: {
      en: 'Chart Scale Linked',
      fr: 'Lien avec l’échelle du graphique',
    },
    scaleUnlinked: {
      en: 'Chart Scale Unlinked',
      fr: 'Sans lien avec l’échelle du graphique',
    },
    timelineGroup: {
      year: {
        en: 'by YEAR',
        fr: 'par ANNÉE',
      },
      quarter: {
        en: 'by QUARTER',
        fr: 'par TRIMESTRE',
      },
    },
  },

  detailTotal: {
    total: {
      en: 'Total',
      fr: 'Total',
    },
  },

  timelinePlay: {
    start: {
      en: 'Start timeline playback',
      fr: 'Début de la ligne de temps',
    },
    stop: {
      en: 'Stop timeline playback',
      fr: 'Fin de la ligne de temps',
    },
  },

  timelineSeek: {
    label: {
      en: '$0 curtain at $1 quarter $2',
      fr: '$0 depuis $1 trimestre $2',
    },
    start: {
      en: 'Start',
      fr: 'Début',
    },
    end: {
      en: 'End',
      fr: 'Fin',
    },
  },
})

export default TranslationTable
