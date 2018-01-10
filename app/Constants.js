const Immutable = require('immutable')

const Constants = Immutable.fromJS({

  workspace: {
    heightToWidthRatio: 0.66,
    viewportPadding: 350,
  },

  topHeightMargin: 70,

  metaBar: {
    width: 27,
    height: 70,
    iconSize: 17,
    resetTextOffset: 62,
    iconMargin: 22,
    aboutThisProjectIconMargin: 5,
    methodologyIconMargin: 27,
    resetIconMargin: 49,
    resetTextY: 63,
  },

  menuBar: {
    width: 150,
    containerHeight: 300
  },
  menuBarOptions:{
    optionPadding: 25,
    optionXaxisPadding: 5
  },

  legend: {
    topMargin: 200,
    iconHeight: 11.09,
    iconWidth: 29.69,
    crudeOilLegendPosition: -36.49,
    textValuePosition: 84.48,
    rangeOneY: 814.8,
    rangeTwoY: 832.69,
    rangeThreeY: 850.58,
    rangeFourY: 868.47,
    rangeFiveY: 886.36,
    exportColumn: 47.99,
    importColumn: 11.5,
    bin1Y: 806.8,
    bin2Y: 824.69,
    bin3Y: 842.58,
    bin4Y: 860.47,
    bin5Y: 878.36,
    headingY: 800,
    importHeadingX: 15.045,
    exportHeadingX: 52.5,
  },

  socialBar: {
    topMargin: 177,
    width: 27,
    height: 132,
    bottomMargin: 20,
    iconSize: 17,
    emailIconPadding: 5,
    downloadFileIconPadding: 26,
    downloadImageIconPadding: 47,
    twitterIconPadding: 68,
    facebookIconPadding: 89,
    linkedInIconPadding: 110,
    iconMargin: 22,
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
    height: 160,
    color: 'orange',
    lineWidth: 3
  },

  electricitySortMenu: {
    height: 150,
    topMargin: 180,
  },

  electricityAmountPriceMenu: {
    height: 100,
    topMargin: 100,
  },

  electricityShowExplanations: {
    height: 30,
    topMargin: 80,
    arrowColor:'red',
    arrowLineWidth: 2
  },

  visualizationTypes: [
    'electricity',
    'crudeOil',
    'naturalGas',
    'naturalGasLiquids',
    'refinedPetroleumProducts',
  ],
  electricitySortStates:[
    'location',
    'imports',
    'exports'
  ],
  electricitySortStatesStyle:{
    color: 'grey',
    lineWidth: 3,
    title: {
      import:{
        xPadding: 5,
        color: 'orange'
      },
      ampersand:{
        xPadding: 70, 
        color:''
      },
      export: {
        xPadding: 90,
        color:'#6495ED'
      }
    }
  },
  language: [
    'en',
    'fr'
  ],
  electricityDataTypesStyle:{
    color: 'grey',
    lineWidth: 3
  },
  timeline: {
    barPadding: 0.5,
    groupPadding: 5,
    axisHeight: 30,
  },
  mapPieceTextStyle:{
    x: 9.58,
    y: 10,
  },
  mapPieceArrowStyle:{
    x: -1,
    y: 5,
  },
  energyMeasurementTypes: {
    'electricity': ['MW.h', 'CAN$', 'CAN$/MW.h'],
    'crudeOil': ['thousand m3/d'],
    'naturalGas': ['thousand m3/d', 'CN$/GJ'],
    'naturalGasLiquids': ['m3/d'],
    'refinedPetroleumProducts': ['thousand m3/d'],
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
  dataloader:{
    mapping:{
      value:{
        'confidential': 'Confidential'
      },
      country:{
        ca:{
          'Yukon': 'YT',
          'Northwest Territories': 'NT',
          'Nunavut': 'NU',
          'Newfoundland and Labrador': 'NF',
          'Prince Edward Island': 'PE',
          'British Columbia': 'BC',
          'Alberta': 'AB',
          'Saskatchewan': 'SK',
          'Manitoba': 'MB',
          'Ontario': 'ON',
          'Québec': 'QB',
          'New Brunswick': 'NB',
          'Nova Scotia': 'NS'
        },
        us:{
          'Alabama':'AL',
          'Alaska':'AK',
          'Arizona':'AZ',
          'Arkansas':'AR',
          'California':'CA',
          'Colorado':'CO',
          'Connecticut':'CT',
          'Delaware':'DE',
          'Florida':'FL',
          'Georgia':'GA',
          'Hawaii':'HI',
          'Idaho':'ID',
          'Illinois':'IL',
          'Indiana':'IN',
          'Iowa':'IA',
          'Kansas':'KS',
          'Kentucky':'KY',
          'Louisiana':'LA',
          'Maine':'ME',
          'Maryland':'MD',
          'Massachusetts':'MA',
          'Michigan':'MI',
          'Minnesota':'MN',
          'Mississippi':'MS',
          'Missouri':'MO',
          'Montana':'MT',
          'Nebraska':'NE',
          'Nevada':'NV',
          'New Hampshire':'NH',
          'New Jersey':'NJ',
          'New Mexico':'NM',
          'New York':'NY',
          'North Carolina':'NC',
          'North Dakota':'ND',
          'Ohio':'OH',
          'Oklahoma':'OK',
          'Oregon':'OR',
          'Pennsylvania':'PA',
          'Rhode Island':'RI',
          'South Carolina':'SC',
          'South Dakota':'SD',
          'Tennessee':'TN',
          'Texas':'TX',
          'Utah':'UT',
          'Vermont':'VT',
          'Virginia':'VA',
          'Washington':'WA',
          'West Virginia':'WV',
          'Wisconsin':'WI',
          'Wyoming':'WY',
        },
        'powerpool':{
          'New England-ISO': 'NE-ISO',
          'Minn / N. Dakota': 'MN/ND',
          'Pennsylvania Jersey Maryland Power Pool': 'PJMPP'
        }
      }
    }
  }
})
module.exports = Constants
