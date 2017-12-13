const Immutable = require('immutable')

const TranslationTable = Immutable.fromJS({ 

  menuBar:{
    electricity:{
      en:'Electricity',
      fr:'Electricity FR'
    },
    crudeOil:{
      en:'Crude Oil',
      fr:'Crude Oil FR'
    },
    naturalGas:{
      en:'Natural Gas',
      fr:'Natural Gas FR'
    },
    naturalGasLiquids:{
      en:'Natural Gas Liquids',
      fr:'Natural Gas Liquids FR'
    },
    refinedPetroleumProducts:{
      en:'Refin. Petroleum Prod',
      fr:'Refin. Petroleum Prod FR'
    }
  }

})

module.exports = TranslationTable