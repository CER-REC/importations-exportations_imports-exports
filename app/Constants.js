import { fromJS } from 'immutable'

const Constants = fromJS({
  workspace: {
    heightToWidthRatio: 0.66,
    viewportPadding: 250,
  },

  topHeightMargin: 70,

  metaBar: {
    width: 27,
    height: 70,
    iconSize: 20,
    resetTextOffset: 53,
    iconMargin: 22,
    resetIconMargin: 49,
    resetTextY: 65,
  },

  menuBar: {
    width: 150,
    containerHeight: 300,
    controlArrowSize: 15,
    importExportMenuLabelMargin: 16,
    importExportTextLabelYOffset: 12,
    textLabelOffset: 13,
    sortMenuYMargin: 116,
    sortMenuTextY: 182,
    sortTextButtonLabelOffset: 79,
    amountMenuYMargin: 137,
    amountMenuTextY: 203,
    amountTextButtonLabelOffset: 109,
    nglMenuYMargin: 158,
    nglSubproductTextY: 223,
    barWidth: 6,
    verticalPadding: 5,
    barHeight: 16,
    optionHeight: 15,
    visualizationPadding: 15,
    menuExpandedPadding: 30,
    expandedMenuTextMargin: 12,
    sortMenuTextOffsetY: 35,
    sortMenuLabelOffsetY: 30,
    amountMenuTextOffsetY: 15,
  },

  menuBarOptions: {
    optionPadding: 19,
    optionXaxisPadding: 22,
  },

  legend: {
    topMargin: 200,
    iconHeight: 11.09,
    iconWidth: 29.69,
    crudeOilLegendPosition: -36.49,
    textValuePosition: 84.48,
    rangeOneY: 794.8,
    rangeTwoY: 812.69,
    rangeThreeY: 830.58,
    rangeFourY: 848.47,
    rangeFiveY: 866.36,
    exportColumn: 47.99,
    importColumn: 11.5,
    bin1Y: 786.8,
    bin2Y: 804.69,
    bin3Y: 822.58,
    bin4Y: 840.47,
    bin5Y: 858.36,
    headingY: 770,
    importHeadingX: 15.045,
    exportHeadingX: 52.5,
  },

  socialBar: {
    topMargin: 120,
    controlArrowMargin: 30,
    controlArrowY: 137,
    controlArrowHeight: 40,
    width: 25,
    height: 125,
    iconSize: 15,
    iconMarginY: 26,
    expandedWidth: 110,
    expandedIconX: 129,
    iconMargin: 30,
    downloadDataIconMargin: 54,
    downloadImageIconMargin: 78,
    shareIconMargin: 102,
    iconX: 105,
    iconY: 223,
    twitterMargin: 29,
    facebookMargin: 51,
    linkedinMargin: 74,
    iconTextY: 137,
  },

  visualizationContainer: {
    leftMargin: 165,
    widthPadding: 450,
    heightPadding: 300,
  },

  visualizationDetailContainer: {
    width: 270,
  },

  mainNavigationMenu: {
    menuYPadding: 22,
    textYPosition: 88,
    height: 160,
  },

  electricitySortMenu: {
    height: 150,
    topMargin: 180,
  },

  electricityAmountPriceMenu: {
    height: 100,
    topMargin: 100,
  },

  showExplanations: {
    height: 30,
    topMargin: 80,
    triangleLineWidth: 150,
    triangleLineYOffset: 3,
    triangleLineY: 7.6,
    labelOffset: 13,
  },

  explanationDot: {
    strokeWidth: 1.3,
    radiusStart: 5.5,
    radiusEnd: 18.5,
    yOffset: 5,
  },

  visualizationTypes: [
    'electricity',
    'crudeOil',
    'naturalGas',
    'naturalGasLiquids',
    'refinedPetroleumProducts',
  ],
  electricitySortStates: [
    'location',
    'imports',
    'exports',
  ],

  electricitySortStatesStyle: {
    color: 'grey',
    lineWidth: 3,
    title: {
      import: {
        xPadding: 5,
        color: 'orange',
      },
      ampersand: {
        xPadding: 70,
        color: '',
      },
      export: {
        xPadding: 90,
        color: '#6495ED',
      },
    },
  },

  language: [
    'en',
    'fr',
  ],

  electricityDataTypesStyle: {
    color: 'grey',
    lineWidth: 3,
  },

  timeline: {
    barPadding: 0.5,
    groupPadding: 5,
    axisHeight: 30,
  },

  mapPieceTextStyle: {
    x: 9.58,
    y: 10,
  },
  mapPieceArrowStyle: {
    x: -1,
    y: 5,
  },

  aboutWindow: {
    width: 380,
  },


  energyMeasurementTypes: {
    electricity: ['MW.h', 'CAN$', 'CAN$/MW.h'],
    crudeOil: ['thousand m3/d'],
    naturalGas: ['thousand m3/d', 'CN$/GJ'],
    naturalGasLiquids: ['m3/d'],
    refinedPetroleumProducts: ['thousand m3/d'],
  },

  appHost: 'https://apps2.neb-one.gc.ca',
  screenshotPath: 'screenshot',

  styleGuide: {
    colours: {
      NeutralWhite: 'rgb(255, 255, 255)',
      NeutralExtraLight: 'rgb(230, 230, 230)',
      NeutralLight: 'rgb(153, 153, 153)',
      NeutralMedium: 'rgb(102, 102, 102)',
      NeutralMediumDark: 'rgb(77, 77, 77)',
      NeutralDark: 'rgb(0, 0, 0)',
      SandLight: 'rgb(237, 227, 203)',
      SandMedium: 'rgb(211, 193, 152)',
      SandDark: 'rgb(182, 165, 126)',
      SandExtraDark: 'rgb(169, 147, 114)',
      ImportDefault: 'rgb(255,119,76)',
      ExportDefault: 'rgb(28,100,178)',
      Accent: 'rgb(251,176,59)',
      Explanation: 'rgb(255, 112, 138)',
    },
    importColours: [
      'rgb(254, 209, 144)',
      'rgb(253, 174, 97)',
      'rgb(255,119,76)',
      'rgb(215, 28, 39)',
      'rgb(165, 0, 38)',
    ],
    exportColours: [
      'rgb(214, 234, 246)',
      'rgb(158, 202, 225)',
      'rgb(86, 152, 203)',
      'rgb(28, 100, 178)',
      'rgb(8, 69, 148)',
    ],
    categoryColours: [
      'rgb(139, 192, 155)',
      'rgb(87, 187, 149)',
      'rgb(50, 155, 157)',
      'rgb(39, 135, 144)',
      'rgb(30, 97, 114)',
    ],
  },
  detailBreakDown: {
    ca: {
      required: true,
      type: 'imports',
      displayPosition: 'bottom',
      color: '#ff774c',
      height: 100,
      showDefault: true,
    },
    us: {
      required: true,
      type: 'exports',
      displayPosition: 'top',
      color: '#1c64b2',
      height: 100,
      showDefault: false,
    },
    powerpool: {
      require: false,
    },
  },
  dataloader: {
    mapping: {
      value: {
        confidential: 'Confidential',
      },
      padd: {
        us: {
          'PADD I': 'PADD I',
          'PADD II': 'PADD II',
          'PADD III': 'PADD III',
          'PADD IV': 'PADD IV',
          'PADD V': 'PADD V',
          'Non-USA': 'Non-USA',
          Mexico: 'Mexico',
        },
        ca: {
          ca: 'ca',
        },
      },
      country: {
        ca: {
          Yukon: 'YT',
          'Northwest Territories': 'NT',
          Nunavut: 'NU',
          'Newfoundland and Labrador': 'NF',
          'Prince Edward Island': 'PE',
          'British Columbia': 'BC',
          Alberta: 'AB',
          Saskatchewan: 'SK',
          Manitoba: 'MB',
          Ontario: 'ON',
          Québec: 'QB',
          'New Brunswick': 'NB',
          'Nova Scotia': 'NS',
        },
        us: {
          Alabama: 'AL',
          Alaska: 'AK',
          Arizona: 'AZ',
          Arkansas: 'AR',
          California: 'CA',
          Colorado: 'CO',
          Connecticut: 'CT',
          Delaware: 'DE',
          Florida: 'FL',
          Georgia: 'GA',
          Hawaii: 'HI',
          Idaho: 'ID',
          Illinois: 'IL',
          Indiana: 'IN',
          Iowa: 'IA',
          Kansas: 'KS',
          Kentucky: 'KY',
          Louisiana: 'LA',
          Maine: 'ME',
          Maryland: 'MD',
          Massachusetts: 'MA',
          Michigan: 'MI',
          Minnesota: 'MN',
          Mississippi: 'MS',
          Missouri: 'MO',
          Montana: 'MT',
          Nebraska: 'NE',
          Nevada: 'NV',
          'New Hampshire': 'NH',
          'New Jersey': 'NJ',
          'New Mexico': 'NM',
          'New York': 'NY',
          'North Carolina': 'NC',
          'North Dakota': 'ND',
          Ohio: 'OH',
          Oklahoma: 'OK',
          Oregon: 'OR',
          Pennsylvania: 'PA',
          'Rhode Island': 'RI',
          'South Carolina': 'SC',
          'South Dakota': 'SD',
          Tennessee: 'TN',
          Texas: 'TX',
          Utah: 'UT',
          Vermont: 'VT',
          Virginia: 'VA',
          Washington: 'WA',
          'West Virginia': 'WV',
          Wisconsin: 'WI',
          Wyoming: 'WY',
        },
        powerpool: {
          'New England-ISO': 'NE-ISO',
          'Minn / N. Dakota': 'MN/ND',
          'Pennsylvania Jersey Maryland Power Pool': 'PJMPP',
        },
      },
    },
  },
})
module.exports = Constants
