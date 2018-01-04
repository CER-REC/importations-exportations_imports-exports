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
})
module.exports = Constants
