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
  timeline: {
    barPadding: 0.5,
    groupPadding: 5,
    axisHeight: 30,
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
})
module.exports = Constants
