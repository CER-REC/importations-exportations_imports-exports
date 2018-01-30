const Immutable = require('immutable')

const MapPieceExplanationConstant = Immutable.fromJS({
  electricity: {
    ca: {
      datapoint: {
        name: 'BC',
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
        imports: {
          label: {
            en: 'imports from Canada',
            fr: 'imports from Canada',
          },
        },
        exports: {
          label: {
            en: 'exports into Canada',
            fr: 'exports into Canada',
          },
        },
        stroke: '#999999',
      },
      mapPieceProps: {
        stateOrProvince: {
          en: 'province',
          fr: 'province',
        },
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
        imports: {
          label: {
            en: 'imports from USA',
            fr: 'imports from USA',
          },
        },
        exports: {
          label: {
            en: 'exports into USA',
            fr: 'exports into USA',
          },
        },
        stroke: '#999999',
      },
      mapPieceProps: {
        stateOrProvince: {
          en: 'state',
          fr: 'state',
        },
        stroke: '#999999',
      },
    },

  },
})
module.exports = MapPieceExplanationConstant
