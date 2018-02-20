import { fromJS } from 'immutable'

const MapPieceExplanationConstant = fromJS({
  electricity: {
    ca: {
      datapoint: {
        name: 'AB',
        exports: 10,
        imports: 10,
        totalCount: 0,
        confidentialCount: 0,
      },
      dimensions: {
        height: 40.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: 'white',
        labelPosition: 'up',
        arrowPosition: 'down',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle: {
          fill: '#ffffff',
          stroke: '#999999',
          exclamationFill: '#999999',
          fillClick: '#999999',
          strokeClick: '#999999',
          exclamationFillClick: '#ffffff',
        },
      },
      legends: [{
        lower: 1,
        upper: 9999,
        imports: 'white',
        exports: 'white',
      }],
      arrowProps: {
        fill: '#fff',
        stroke: '#999999',
      },
      mapPieceProps: {
        stroke: '#999999',
      },
    },
    us: {
      datapoint: {
        name: 'NY',
        exports: 10,
        imports: 10,
        totalCount: 0,
        confidentialCount: 0,
      },
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: 'white',
        labelPosition: 'down',
        arrowPosition: 'up',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle: {
          fill: '#999',
          stroke: '#999',
          exclamationFill: '#fff',
        },
      },
      legends: [{
        lower: 1,
        upper: 100,
        imports: 'white',
        exports: 'white',
      }],
      arrowProps: {
        fill: '#fff',
        stroke: '#999999',
      },
      mapPieceProps: {
        stroke: '#999999',
      },
    },

  },
  crudeOil: {
    datapoint: {
      name: 'BC',
      exports: 10,
      imports: 10,
      totalCount: 0,
      confidentialCount: 0,
    },
    styles: {
      color: 'white',
      labelPosition: 'down',
      arrowPosition: 'up',
      arrowSpacing: -1,
      bottomMargin: 5,
      topMargin: 5,
      confidentialStyle: {
        fill: '#999',
        stroke: '#999',
        exclamationFill: '#fff',
      },
    },
    legends: [{
      lower: 1,
      upper: 100,
      imports: 'white',
      exports: 'white',
    }],
    arrowProps: {
      stroke: '#999',
    },
  },
  naturalGasLiquids: {
    ca: {
      datapoint: {
        name: 'ON',
        exports: 0,
        imports: 10,
        totalCount: 0,
        confidentialCount: 0,
      },
      dimensions: {
        height: 40.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: 'white',
        labelPosition: 'up',
        arrowPosition: 'down',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle: {
          fill: '#999',
          stroke: '#999',
          exclamationFill: '#fff',
        },
      },
      legends: [{
        lower: 1,
        upper: 9999,
        imports: 'white',
        exports: 'white',
      }],
      arrowProps: {
        fill: '#fff',
        stroke: '#999999',
      },
      mapPieceProps: {
        stroke: '#999999',
      },
    },
    us: {
      datapoint: {
        name: 'BC',
        exports: 10,
        imports: 10,
        totalCount: 0,
        confidentialCount: 0,
      },
      styles: {
        color: 'white',
        labelPosition: 'down',
        arrowPosition: 'up',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle: {
          fill: '#999',
          stroke: '#999',
          exclamationFill: '#fff',
        },
      },
      legends: [{
        lower: 1,
        upper: 100,
        imports: 'white',
        exports: 'white',
      }],
      arrowProps: {
        fill: '#fff',
        stroke: '#999',
      },
    },

  },
  naturalGas: {
    datapoint: {
      portName: 'Aden',
      exports: 10,
      imports: 10,
      totalCount: 0,
      confidentialCount: 0,
    },
    dimensions: {
      height: 37.09,
      width: 38.75,
      topPadding: 25,
      leftPadding: 9,
    },
    styles: {
      color: 'white',
      labelPosition: 'down',
      arrowPosition: 'down',
      arrowSpacing: -12,
      bottomMargin: 5,
      topMargin: 15,
      confidentialStyle: {
        fill: '#999',
        stroke: '#999',
        exclamationFill: '#fff',
      },
    },
    legends: [{
      lower: 1,
      upper: 9999,
      imports: 'white',
      exports: 'white',
    }],
    arrowProps: {
      fill: '#fff',
      stroke: '#999999',
    },
    mapPieceProps: {
      stroke: '#999999',
    },
  },
})
export default MapPieceExplanationConstant
