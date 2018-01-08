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
