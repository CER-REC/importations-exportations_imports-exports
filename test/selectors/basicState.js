import { fromJS } from 'immutable'

export default {
  importExportVisualization: 'electricity',
  visualizationSettings: {
    electricity: fromJS({
      arrangeBy: 'location',
      amount: 'MW.h',
      activity: 'imports',
    }),
  },
  data: fromJS({
    electricity: {
      'MW.h': [
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","productSubtype":"","quarter":1,"destination":"Alaska","product":"electricity","extrapolated":false,"activity":"exports","units":"MW.h","activityGroup":"importsExports","value":227.236,"destinationKey":"AK","country":"ca","originKey":"BC","year":1990},
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","productSubtype":"","quarter":1,"destination":"California","product":"electricity","extrapolated":false,"activity":"exports","units":"MW.h","activityGroup":"importsExports","value":453509,"destinationKey":"CA","country":"ca","originKey":"BC","year":1990},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","productSubtype":"","quarter":2,"destination":"Alaska","product":"electricity","extrapolated":false,"activity":"exports","units":"MW.h","activityGroup":"importsExports","value":184.44,"destinationKey":"AK","country":"ca","originKey":"BC","year":1990},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","productSubtype":"","quarter":2,"destination":"California","product":"electricity","extrapolated":false,"activity":"exports","units":"MW.h","activityGroup":"importsExports","value":59231.678,"destinationKey":"CA","country":"ca","originKey":"BC","year":1990}
      ],
      CAN$: [
        { test: false },
      ],
      'CAN$/MW.h': [
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":227.236,"productSubtype":"","quarter":1,"destination":"Alaska","product":"electricity","extrapolated":false,"activity":"exports","units":"CAN$/MW.h","activityGroup":"importsExports","value":64.16236864,"destinationKey":"AK","country":"ca","originKey":"BC","year":1990,"forAverageValue":14580},
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":453509,"productSubtype":"","quarter":1,"destination":"California","product":"electricity","extrapolated":false,"activity":"exports","units":"CAN$/MW.h","activityGroup":"importsExports","value":31.52813186,"destinationKey":"CA","country":"ca","originKey":"BC","year":1990,"forAverageValue":14298291.55},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":184.44,"productSubtype":"","quarter":2,"destination":"Alaska","product":"electricity","extrapolated":false,"activity":"exports","units":"CAN$/MW.h","activityGroup":"importsExports","value":64.6822815,"destinationKey":"AK","country":"ca","originKey":"BC","year":1990,"forAverageValue":11930},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"British Columbia","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":59231.678,"productSubtype":"","quarter":2,"destination":"California","product":"electricity","extrapolated":false,"activity":"exports","units":"CAN$/MW.h","activityGroup":"importsExports","value":22.63914725,"destinationKey":"CA","country":"ca","originKey":"BC","year":1990,"forAverageValue":1340954.68},
        {"originalActivity":"Exports","port":"","period":"2005Q2","origin":"Manitoba","confidential":true,"destinationCountry":"powerpool","transport":"","forAverageDivisor":3308390,"productSubtype":"","quarter":2,"destination":"Minn / N. Dakota","product":"electricity","extrapolated":false,"activity":"exports","units":"CAN$/MW.h","activityGroup":"importsExports","value":0,"destinationKey":"MN/ND","country":"ca","originKey":"MB","year":2005,"forAverageValue":0},
        {"originalActivity":"Imports","port":"","period":"1993Q4","origin":"New York","confidential":false,"destinationCountry":"ca","transport":"","forAverageDivisor":0,"productSubtype":"","quarter":4,"destination":"Québec","product":"electricity","extrapolated":false,"activity":"imports","units":"CAN$/MW.h","activityGroup":"importsExports","value":0,"destinationKey":"QC","country":"us","originKey":"NY","year":1993,"forAverageValue":0},
      ],
    },
    crudeOil: {
      'thousand m3/d': [
        { run: 'away' },
      ],
    },
    naturalGasLiquids: {
      'm3/d': [
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":1,"productSubtype":"Butane","quarter":1,"destination":"PADD II","product":"naturalGasLiquids","extrapolated":false,"activity":"exports","units":"m3/d","activityGroup":"importsExports","value":5296.947778,"destinationKey":"PADD II","country":"","originKey":"","year":1990,"forAverageValue":5296},
        {"originalActivity":"Exports","port":"","period":"1990Q1","origin":"","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":1,"productSubtype":"Propane","quarter":1,"destination":"PADD IV","product":"naturalGasLiquids","extrapolated":false,"activity":"exports","units":"m3/d","activityGroup":"importsExports","value":388.5555556,"destinationKey":"PADD IV","country":"","originKey":"","year":1990,"forAverageValue":388},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":1,"productSubtype":"Butane","quarter":2,"destination":"PADD II","product":"naturalGasLiquids","extrapolated":false,"activity":"exports","units":"m3/d","activityGroup":"importsExports","value":2771.889011,"destinationKey":"PADD II","country":"","originKey":"","year":1990,"forAverageValue":2771},
        {"originalActivity":"Exports","port":"","period":"1990Q2","origin":"","confidential":false,"destinationCountry":"us","transport":"","forAverageDivisor":1,"productSubtype":"Propane","quarter":2,"destination":"PADD IV","product":"naturalGasLiquids","extrapolated":false,"activity":"exports","units":"m3/d","activityGroup":"importsExports","value":230.0285714,"destinationKey":"PADD IV","country":"","originKey":"","year":1990,"forAverageValue":230},
      ],
    },
  }),
}
