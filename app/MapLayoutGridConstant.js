import { fromJS } from 'immutable'

const MapLayoutGridConstant = fromJS({
  electricity: {
    ca: {
      mapPieceScale: 1,
      defaultColumns: 8,
      sortingRowPadding: 1.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: '#ede3cb',
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
      layout: [
        {
          name: 'YT', originKey: 'YT', x: 0, y: 0,
        },
        {
          name: 'NT', originKey: 'NT', x: 1, y: 0,
        },
        {
          name: 'NU', originKey: 'NU', x: 2, y: 0,
        },
        {
          name: 'NF', originKey: 'NF', x: 6, y: 0,
        },
        {
          name: 'PE', originKey: 'PE', x: 7, y: 0,
        },
        {
          name: 'BC', originKey: 'BC', x: 0.5, y: 1,
        },
        {
          name: 'AB', originKey: 'AB', x: 1.5, y: 1,
        },
        {
          name: 'SK', originKey: 'SK', x: 2.5, y: 1,
        },
        {
          name: 'MB', originKey: 'MB', x: 3.5, y: 1,
        },
        {
          name: 'ON', originKey: 'ON', x: 4.5, y: 1,
        },
        {
          name: 'QB', originKey: 'QB', x: 5.5, y: 1,
        },
        {
          name: 'NB', originKey: 'NB', x: 6.5, y: 1,
        },
        {
          name: 'NS', originKey: 'NS', x: 7.5, y: 1,
        },
      ],
    },
    us: {
      mapPieceScale: 1,
      defaultColumns: 12,
      sortingRowPadding: -0.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 5,
        xAxisPadding: 9,
      },
      styles: {
        color: '#ede3cb',
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
      layout: [
        {
          name: 'VT', originKey: 'VT', x: 9.5, y: 0,
        },
        {
          name: 'ME', originKey: 'ME', x: 10.5, y: 0,
        },
        {
          name: 'AK', originKey: 'AK', x: 0.16, y: 1.9,
        },
        {
          name: 'WA', originKey: 'WA', x: 1, y: 1,
        },
        {
          name: 'MT', originKey: 'MT', x: 2, y: 1,
        },
        {
          name: 'ND', originKey: 'ND', x: 3, y: 1,
        },
        {
          name: 'MN', originKey: 'MN', x: 4, y: 1,
        },
        {
          name: 'WI', originKey: 'WI', x: 5, y: 1,
        },
        {
          name: 'MI', originKey: 'MI', x: 7, y: 1,
        },
        {
          name: 'NY', originKey: 'NY', x: 9, y: 1,
        },
        {
          name: 'MA', originKey: 'MA', x: 10, y: 1,
        },
        {
          name: 'NH', originKey: 'NH', x: 11, y: 1,
        },
        {
          name: 'ID', originKey: 'ID', x: 1.5, y: 2,
        },
        {
          name: 'WY', originKey: 'WY', x: 2.5, y: 2,
        },
        {
          name: 'SD', originKey: 'SD', x: 3.5, y: 2,
        },
        {
          name: 'IA', originKey: 'IA', x: 4.5, y: 2,
        },
        {
          name: 'IL', originKey: 'IL', x: 5.5, y: 2,
        },
        {
          name: 'IN', originKey: 'IN', x: 6.5, y: 2,
        },
        {
          name: 'OH', originKey: 'OH', x: 7.5, y: 2,
        },
        {
          name: 'PA', originKey: 'PA', x: 8.5, y: 2,
        },
        {
          name: 'NJ', originKey: 'NJ', x: 9.5, y: 2,
        },
        {
          name: 'RI', originKey: 'RI', x: 10.5, y: 2,
        },
        {
          name: 'HI', originKey: 'HI', x: 0.18, y: 3.9,
        },
        {
          name: 'OR', originKey: 'OR', x: 1, y: 3,
        },
        {
          name: 'NV', originKey: 'NV', x: 2, y: 3,
        },
        {
          name: 'CO', originKey: 'CO', x: 3, y: 3,
        },
        {
          name: 'NE', originKey: 'NE', x: 4, y: 3,
        },
        {
          name: 'MO', originKey: 'MO', x: 5, y: 3,
        },
        {
          name: 'KY', originKey: 'KY', x: 6, y: 3,
        },
        {
          name: 'WV', originKey: 'WV', x: 7, y: 3,
        },
        {
          name: 'VA', originKey: 'VA', x: 8, y: 3,
        },
        {
          name: 'MD', originKey: 'MD', x: 9, y: 3,
        },
        {
          name: 'CT', originKey: 'CT', x: 10, y: 3,
        },
        {
          name: 'CA', originKey: 'CA', x: 1.5, y: 4,
        },
        {
          name: 'UT', originKey: 'UT', x: 2.5, y: 4,
        },
        {
          name: 'OK', originKey: 'OK', x: 3.5, y: 4,
        },
        {
          name: 'KS', originKey: 'KS', x: 4.5, y: 4,
        },
        {
          name: 'AR', originKey: 'AR', x: 5.5, y: 4,
        },
        {
          name: 'TN', originKey: 'TN', x: 6.5, y: 4,
        },
        {
          name: 'NC', originKey: 'NC', x: 7.5, y: 4,
        },
        {
          name: 'SC', originKey: 'SC', x: 8.5, y: 4,
        },
        {
          name: 'DE', originKey: 'DE', x: 9.5, y: 4,
        },
        {
          name: 'AZ', originKey: 'AZ', x: 3, y: 5,
        },
        {
          name: 'NM', originKey: 'NM', x: 4, y: 5,
        },
        {
          name: 'LA', originKey: 'LA', x: 5, y: 5,
        },
        {
          name: 'MS', originKey: 'MS', x: 6, y: 5,
        },
        {
          name: 'AL', originKey: 'AL', x: 7, y: 5,
        },
        {
          name: 'GA', originKey: 'GA', x: 8, y: 5,
        },
        {
          name: 'TX', originKey: 'TX', x: 3.5, y: 6,
        },
        {
          name: 'FL', originKey: 'FL', x: 7.5, y: 6,
        },
      ],
    },
    powerpool: {
      mapPieceScale: 1,
      defaultColumns: 12,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: '#ede3cb',
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
      layout: [
        {
          name: 'MN/ND', originKey: 'MN/ND', x: 0, y: 0,
        },
        {
          name: 'NE-ISO', originKey: 'NE-ISO', x: 1, y: 0,
        },
        {
          name: 'PJM PP', originKey: 'PJMPP', x: 2, y: 0,
        },
      ],
    },
    powerPoolMapping: {
      none: [],
      'MN/ND': ['MN', 'ND'],
      'NE-ISO': [
        'CT',
        'ME',
        'MA',
        'NH',
        'RI',
        'VT',
      ],
      PJMPP: [
        'DE',
        'IL',
        'IN',
        'KY',
        'MD',
        'MI',
        'NJ',
        'NC',
        'OH',
        'PA',
        'TN',
        'VA',
        'WV',
      ],
    },
    legends: [{
      lower: 1,
      upper: 9999,
      imports: 'grey',
      exports: 'grey',
    }, {
      lower: 10000,
      upper: 99999,
      imports: '#ffcc66',
      exports: '#66ffff',
    }, {
      lower: 100000,
      upper: 999999,
      imports: '#ff6600',
      exports: '#3399ff',
    }, {
      lower: 1000000,
      upper: 1999999,
      imports: '#ff3300',
      exports: '#3333ff',
    }, {
      lower: 2000000,
      upper: 'NA',
      imports: '#800000',
      exports: '#000099',
    }],
  },
  naturalGasLiquids: {
    ca: {
      mapPieceScale: 1,
      defaultColumns: 8,
      sortingRowPadding: 1.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528,
      },
      styles: {
        color: '#ede3cb',
        labelPosition: 'up',
        arrowPosition: 'down',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle: {
          fill: '#fff',
          stroke: '#999',
          exclamationFill: '#999',
        },
      },
      layout: [
        {
          name: 'ATL-Q', originKey: 'ATL-Q', x: 6.5, y: 0,
        },
        {
          name: 'YT', originKey: 'YT', x: 1, y: 1,
        },
        {
          name: 'NT', originKey: 'NT', x: 2, y: 1,
        },
        {
          name: 'NU', originKey: 'NU', x: 3, y: 1,
        },
        {
          name: 'NF', originKey: 'NF', x: 6, y: 1,
        },
        {
          name: 'PE', originKey: 'PE', x: 7, y: 1,
        },
        {
          name: 'BC', originKey: 'BC', x: 0.5, y: 2,
        },
        {
          name: 'AB', originKey: 'AB', x: 1.5, y: 2,
        },
        {
          name: 'SK', originKey: 'SK', x: 2.5, y: 2,
        },
        {
          name: 'MB', originKey: 'MB', x: 3.5, y: 2,
        },
        {
          name: 'ON', originKey: 'ON', x: 4.5, y: 2,
        },
        {
          name: 'QB', originKey: 'QB', x: 5.5, y: 2,
        },
        {
          name: 'NB', originKey: 'NB', x: 6.5, y: 2,
        },
        {
          name: 'NS', originKey: 'NS', x: 7.5, y: 2,
        },
      ],
    },
  },

  PaddLayout: {
    ca: {
      mapPieceScale: 1,
      sortingRowPadding: 1.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: -8,
        xAxisPadding: -5,
      },
      styles: {
        bottomMargin: 15,
        topMargin: 5,
        confidentialStyle: {
          fill: '#fff',
          stroke: '#999',
          exclamationFill: '#999',
        },
      },
      arrow: {
        fontClass: 'paddArrowCanadaFonts',
        textTranslate: {
          ca: { left: 144, top: 150 },
        },
        orderBy: {
          location: {
            ca: { left: 0, top: -135 },
          },
          default: {
            ca: { left: 0, top: -135 },
          },
        },
      },
      layout: [
        {
          paddGroup: 'ca', name: 'YT', originKey: 'YT', x: 1, y: 0,
        },
        {
          paddGroup: 'ca', name: 'NT', originKey: 'NT', x: 2, y: 0,
        },
        {
          paddGroup: 'ca', name: 'NU', originKey: 'NU', x: 3, y: 0,
        },
        {
          paddGroup: 'ca', name: 'NF', originKey: 'NF', x: 6, y: 0,
        },
        {
          paddGroup: 'ca', name: 'PE', originKey: 'PE', x: 7, y: 0,
        },
        {
          paddGroup: 'ca', name: 'BC', originKey: 'BC', x: 0.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'AB', originKey: 'AB', x: 1.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'SK', originKey: 'SK', x: 2.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'MB', originKey: 'MB', x: 3.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'ON', originKey: 'ON', x: 4.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'QB', originKey: 'QB', x: 5.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'NB', originKey: 'NB', x: 6.5, y: 1,
        },
        {
          paddGroup: 'ca', name: 'NS', originKey: 'NS', x: 7.5, y: 1,
        },
      ],
    },
    us: {
      mapPieceScale: 0.58,
      defaultColumns: 12,
      sortingRowPadding: -0.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8,
        xAxisPadding: 12,
      },
      styles: {
        bottomMargin: 15,
        topMargin: 5,
        confidentialStyle: {
          fill: '#fff',
          stroke: '#999',
          exclamationFill: '#999',
        },
      },
      padding: {
        'PADD I': { left: 16, top: 0.25 },
        'PADD II': { left: 13, top: 0 },
        'PADD III': { left: 12.5, top: 1 },
        'PADD IV': { left: 10, top: 0 },
        'PADD V': { left: 8, top: 0 },
        'Non-USA': { left: 0, top: 0 },
        Mexico: { left: 0, top: 0 },
      },
      arrow: {
        fontClass: 'paddArrowUSFonts',
        textTranslate: {
          'PADD I': { left: 150, top: 180 },
          'PADD II': { left: 148, top: 180 },
          'PADD III': { left: 144, top: 180 },
          'PADD IV': { left: 146, top: 180 },
          'PADD V': { left: 144, top: 180 },
          'Non-USA': { left: 140, top: 180 },
          Mexico: { left: 140, top: 180 },

        },
        orderBy: {
          location: {
            'PADD I': { left: 170, top: 50 },
            'PADD II': { left: 25, top: -160 },
            'PADD III': { left: 50, top: 50 },
            'PADD IV': { left: -80, top: -160 },
            'PADD V': { left: -90, top: 50 },
            'Non-USA': { left: 281, top: -10 },
            Mexico: { left: 281, top: -10 },

          },
          default: {
            'PADD I': { left: -130, top: -190 },
            'PADD II': { left: -130, top: -190 },
            'PADD III': { left: -130, top: -190 },
            'PADD IV': { left: -130, top: -190 },
            'PADD V': { left: -130, top: -190 },
            'Non-USA': { left: -135, top: -190 },
            Mexico: { left: -135, top: -190 },

          },
        },
      },
      layout: [
        {
          paddGroup: 'PADD I', name: 'VT', originKey: 'VT', x: 9.5, y: 0,
        },
        {
          paddGroup: 'PADD I', name: 'ME', originKey: 'ME', x: 10.5, y: 0,
        },
        {
          paddGroup: 'PADD V', name: 'AK', originKey: 'AK', x: 1, y: 1,
        },
        {
          paddGroup: 'PADD V', name: 'WA', originKey: 'WA', x: 0.5, y: 2,
        },
        {
          paddGroup: 'PADD IV', name: 'MT', originKey: 'MT', x: 2, y: 1,
        },
        {
          paddGroup: 'PADD II', name: 'ND', originKey: 'ND', x: 3, y: 1,
        },
        {
          paddGroup: 'PADD II', name: 'MN', originKey: 'MN', x: 4, y: 1,
        },
        {
          paddGroup: 'PADD II', name: 'WI', originKey: 'WI', x: 5, y: 1,
        },
        {
          paddGroup: 'PADD II', name: 'MI', originKey: 'MI', x: 7, y: 1,
        },
        {
          paddGroup: 'PADD I', name: 'NY', originKey: 'NY', x: 9, y: 1,
        },
        {
          paddGroup: 'PADD I', name: 'MA', originKey: 'MA', x: 10, y: 1,
        },
        {
          paddGroup: 'PADD I', name: 'NH', originKey: 'NH', x: 11, y: 1,
        },
        {
          paddGroup: 'PADD IV', name: 'ID', originKey: 'ID', x: 1.5, y: 2,
        },
        {
          paddGroup: 'PADD IV', name: 'WY', originKey: 'WY', x: 2.5, y: 2,
        },
        {
          paddGroup: 'PADD II', name: 'SD', originKey: 'SD', x: 3.5, y: 2,
        },
        {
          paddGroup: 'PADD II', name: 'IA', originKey: 'IA', x: 4.5, y: 2,
        },
        {
          paddGroup: 'PADD II', name: 'IL', originKey: 'IL', x: 5.5, y: 2,
        },
        {
          paddGroup: 'PADD II', name: 'IN', originKey: 'IN', x: 6.5, y: 2,
        },
        {
          paddGroup: 'PADD II', name: 'OH', originKey: 'OH', x: 7.5, y: 2,
        },
        {
          paddGroup: 'PADD I', name: 'PA', originKey: 'PA', x: 8.5, y: 2,
        },
        {
          paddGroup: 'PADD I', name: 'NJ', originKey: 'NJ', x: 9.5, y: 2,
        },
        {
          paddGroup: 'PADD I', name: 'RI', originKey: 'RI', x: 10.5, y: 2,
        },
        {
          paddGroup: 'PADD V', name: 'HI', originKey: 'HI', x: 2, y: 5,
        },
        {
          paddGroup: 'PADD V', name: 'OR', originKey: 'OR', x: 1, y: 3,
        },
        {
          paddGroup: 'PADD V', name: 'NV', originKey: 'NV', x: 2, y: 3,
        },
        {
          paddGroup: 'PADD IV', name: 'CO', originKey: 'CO', x: 3, y: 3,
        },
        {
          paddGroup: 'PADD II', name: 'NE', originKey: 'NE', x: 4, y: 3,
        },
        {
          paddGroup: 'PADD II', name: 'MO', originKey: 'MO', x: 5, y: 3,
        },
        {
          paddGroup: 'PADD II', name: 'KY', originKey: 'KY', x: 6, y: 3,
        },
        {
          paddGroup: 'PADD I', name: 'WV', originKey: 'WV', x: 7, y: 3,
        },
        {
          paddGroup: 'PADD I', name: 'VA', originKey: 'VA', x: 8, y: 3,
        },
        {
          paddGroup: 'PADD I', name: 'MD', originKey: 'MD', x: 9, y: 3,
        },
        {
          paddGroup: 'PADD I', name: 'CT', originKey: 'CT', x: 10, y: 3,
        },
        {
          paddGroup: 'PADD V', name: 'CA', originKey: 'CA', x: 1.5, y: 4,
        },
        {
          paddGroup: 'PADD IV', name: 'UT', originKey: 'UT', x: 2.5, y: 4,
        },
        {
          paddGroup: 'PADD II', name: 'OK', originKey: 'OK', x: 3.5, y: 4,
        },
        {
          paddGroup: 'PADD II', name: 'KS', originKey: 'KS', x: 4.5, y: 4,
        },
        {
          paddGroup: 'PADD III', name: 'AR', originKey: 'AR', x: 5.5, y: 4,
        },
        {
          paddGroup: 'PADD II', name: 'TN', originKey: 'TN', x: 6.5, y: 4,
        },
        {
          paddGroup: 'PADD I', name: 'NC', originKey: 'NC', x: 7.5, y: 4,
        },
        {
          paddGroup: 'PADD I', name: 'SC', originKey: 'SC', x: 8.5, y: 4,
        },
        {
          paddGroup: 'PADD I', name: 'DE', originKey: 'DE', x: 9.5, y: 4,
        },
        {
          paddGroup: 'PADD V', name: 'AZ', originKey: 'AZ', x: 3, y: 5,
        },
        {
          paddGroup: 'PADD III', name: 'NM', originKey: 'NM', x: 4, y: 5,
        },
        {
          paddGroup: 'PADD III', name: 'LA', originKey: 'LA', x: 5, y: 5,
        },
        {
          paddGroup: 'PADD III', name: 'MS', originKey: 'MS', x: 6, y: 5,
        },
        {
          paddGroup: 'PADD III', name: 'AL', originKey: 'AL', x: 7, y: 5,
        },
        {
          paddGroup: 'PADD I', name: 'GA', originKey: 'GA', x: 8, y: 5,
        },
        {
          paddGroup: 'PADD III', name: 'TX', originKey: 'TX', x: 4.5, y: 6,
        },
        {
          paddGroup: 'PADD I', name: 'FL', originKey: 'FL', x: 7.5, y: 6,
        },
        {
          paddGroup: 'Non-USA', name: '', originKey: '', x: 12.5, y: 6,
        },
        {
          paddGroup: 'Mexico', name: '', originKey: '', x: 12.5, y: 6,
        },
      ],
    },
  },
  naturalGas: {
    mapPieceScale: 1,
    sortingRowPadding: 0.5,
    dimensions: {
      height: 37.09,
      width: 38.75,
      topPadding: 25,
      leftPadding: 9,
    },
    styles: {
      color: '#ede3cb',
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
    layout: [
      'BC',
      'AB',
      'SK',
      'MB',
      'ON',
      'QB',
      'NB',
    ],
  },
})
export default MapLayoutGridConstant
