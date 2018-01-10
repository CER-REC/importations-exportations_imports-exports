const Immutable = require('immutable')

const Constants = Immutable.fromJS({

  workspace: {
    heightToWidthRatio: 0.66,
    viewportPadding: 350,
  },

  topHeightMargin: 100,

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
    width: 150,
    height: 200,
    iconHeight: 20,
    iconWidth: 20,
  },

  socialBar: {
    topMargin: 300,
    width: 320,
    height: 27,
    bottomMargin: 20,
    iconHeight: 20,
    iconWidth: 20,
    iconPadding: 4.5,
    iconMargin: 30,
    iconXOffset: 2,
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
