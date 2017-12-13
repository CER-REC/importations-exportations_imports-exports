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
  },

  socialBar: {
    topMargin: 300,
    width: 400,
    height: 32,
    bottomMargin: 20,
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
    topMargin: 200,
  },

  electricityAmountPriceMenu: {
    height: 100,
    topMargin: 160,
  },

  electricityShowExplanations: {
    height: 30,
    topMargin: 110,
  },

  visualizationTypes: [
    'electricity',
    'crudeOil',
    'naturalGas',
    'refinedPetroleumProducts',
    'naturalGasLiquids'
  ],
  electricitySortStates:[
    'location',
    'import',
    'export'
  ],
  language: [
    'en',
    'fr'
    ],
  electricityDataTypes:[
    'price',
    'mwh'
  ]


})
module.exports = Constants