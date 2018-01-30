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
      mapPieceScale: 0.58,
      defaultColumns: 12,
      sortingRowPadding: -0.5,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 20.5,
        xAxisPadding: 25.5,
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
          name: 'AK', originKey: 'AK', x: -0.25, y: 1,
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
          name: 'HI', originKey: 'HI', x: -0.25, y: 3,
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
      mapPieceScale: 0.58,
      defaultColumns: 12,
      dimensions: {
        height: 37.09,
        width: 38.75,
        yAxisPadding: 20.5,
        xAxisPadding: 25.5,
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
      },
      arrow: {
        fontClass: 'paddArrowCanadaFonts',
        textTranslate: {
          1: { left: 144, top: 150 },
        },
        orderBy: {
          location: {
            1: { left: 0, top: -135 },
          },
          default: {
            1: { left: 0, top: -135 },
          },
        },
      },
      layout: [
        {
          paddGroup: 1, name: 'YT', originKey: 'YT', x: 1, y: 0,
        },
        {
          paddGroup: 1, name: 'NT', originKey: 'NT', x: 2, y: 0,
        },
        {
          paddGroup: 1, name: 'NU', originKey: 'NU', x: 3, y: 0,
        },
        {
          paddGroup: 1, name: 'NF', originKey: 'NF', x: 6, y: 0,
        },
        {
          paddGroup: 1, name: 'PE', originKey: 'PE', x: 7, y: 0,
        },
        {
          paddGroup: 1, name: 'BC', originKey: 'BC', x: 0.5, y: 1,
        },
        {
          paddGroup: 1, name: 'AB', originKey: 'AB', x: 1.5, y: 1,
        },
        {
          paddGroup: 1, name: 'SK', originKey: 'SK', x: 2.5, y: 1,
        },
        {
          paddGroup: 1, name: 'MB', originKey: 'MB', x: 3.5, y: 1,
        },
        {
          paddGroup: 1, name: 'ON', originKey: 'ON', x: 4.5, y: 1,
        },
        {
          paddGroup: 1, name: 'QB', originKey: 'QB', x: 5.5, y: 1,
        },
        {
          paddGroup: 1, name: 'NB', originKey: 'NB', x: 6.5, y: 1,
        },
        {
          paddGroup: 1, name: 'NS', originKey: 'NS', x: 7.5, y: 1,
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
      },
      arrow: {
        fontClass: 'paddArrowUSFonts',
        textTranslate: {
          1: { left: 150, top: 180 },
          2: { left: 148, top: 180 },
          3: { left: 144, top: 180 },
          4: { left: 146, top: 180 },
          5: { left: 144, top: 180 },
        },
        orderBy: {
          location: {
            1: { left: 170, top: 50 },
            2: { left: 25, top: -160 },
            3: { left: 50, top: 50 },
            4: { left: -80, top: -160 },
            5: { left: -90, top: 50 },
          },
          default: {
            1: { left: -130, top: -190 },
            2: { left: -130, top: -190 },
            3: { left: -130, top: -190 },
            4: { left: -130, top: -190 },
            5: { left: -130, top: -190 },
          },
        },
      },
      layout: [
        {
          paddGroup: 1, name: 'VT', originKey: 'VT', x: 9.5, y: 0,
        },
        {
          paddGroup: 1, name: 'ME', originKey: 'ME', x: 10.5, y: 0,
        },
        {
          paddGroup: 5, name: 'AK', originKey: 'AK', x: 1, y: 1,
        },
        {
          paddGroup: 5, name: 'WA', originKey: 'WA', x: 0.5, y: 2,
        },
        {
          paddGroup: 4, name: 'MT', originKey: 'MT', x: 2, y: 1,
        },
        {
          paddGroup: 2, name: 'ND', originKey: 'ND', x: 3, y: 1,
        },
        {
          paddGroup: 2, name: 'MN', originKey: 'MN', x: 4, y: 1,
        },
        {
          paddGroup: 2, name: 'WI', originKey: 'WI', x: 5, y: 1,
        },
        {
          paddGroup: 2, name: 'MI', originKey: 'MI', x: 7, y: 1,
        },
        {
          paddGroup: 1, name: 'NY', originKey: 'NY', x: 9, y: 1,
        },
        {
          paddGroup: 1, name: 'MA', originKey: 'MA', x: 10, y: 1,
        },
        {
          paddGroup: 1, name: 'NH', originKey: 'NH', x: 11, y: 1,
        },
        {
          paddGroup: 4, name: 'ID', originKey: 'ID', x: 1.5, y: 2,
        },
        {
          paddGroup: 4, name: 'WY', originKey: 'WY', x: 2.5, y: 2,
        },
        {
          paddGroup: 2, name: 'SD', originKey: 'SD', x: 3.5, y: 2,
        },
        {
          paddGroup: 2, name: 'IA', originKey: 'IA', x: 4.5, y: 2,
        },
        {
          paddGroup: 2, name: 'IL', originKey: 'IL', x: 5.5, y: 2,
        },
        {
          paddGroup: 2, name: 'IN', originKey: 'IN', x: 6.5, y: 2,
        },
        {
          paddGroup: 2, name: 'OH', originKey: 'OH', x: 7.5, y: 2,
        },
        {
          paddGroup: 1, name: 'PA', originKey: 'PA', x: 8.5, y: 2,
        },
        {
          paddGroup: 1, name: 'NJ', originKey: 'NJ', x: 9.5, y: 2,
        },
        {
          paddGroup: 1, name: 'RI', originKey: 'RI', x: 10.5, y: 2,
        },
        {
          paddGroup: 5, name: 'HI', originKey: 'HI', x: 2, y: 5,
        },
        {
          paddGroup: 5, name: 'OR', originKey: 'OR', x: 1, y: 3,
        },
        {
          paddGroup: 5, name: 'NV', originKey: 'NV', x: 2, y: 3,
        },
        {
          paddGroup: 4, name: 'CO', originKey: 'CO', x: 3, y: 3,
        },
        {
          paddGroup: 2, name: 'NE', originKey: 'NE', x: 4, y: 3,
        },
        {
          paddGroup: 2, name: 'MO', originKey: 'MO', x: 5, y: 3,
        },
        {
          paddGroup: 2, name: 'KY', originKey: 'KY', x: 6, y: 3,
        },
        {
          paddGroup: 1, name: 'WV', originKey: 'WV', x: 7, y: 3,
        },
        {
          paddGroup: 1, name: 'VA', originKey: 'VA', x: 8, y: 3,
        },
        {
          paddGroup: 1, name: 'MD', originKey: 'MD', x: 9, y: 3,
        },
        {
          paddGroup: 1, name: 'CT', originKey: 'CT', x: 10, y: 3,
        },
        {
          paddGroup: 5, name: 'CA', originKey: 'CA', x: 1.5, y: 4,
        },
        {
          paddGroup: 4, name: 'UT', originKey: 'UT', x: 2.5, y: 4,
        },
        {
          paddGroup: 2, name: 'OK', originKey: 'OK', x: 3.5, y: 4,
        },
        {
          paddGroup: 2, name: 'KS', originKey: 'KS', x: 4.5, y: 4,
        },
        {
          paddGroup: 3, name: 'AR', originKey: 'AR', x: 5.5, y: 4,
        },
        {
          paddGroup: 2, name: 'TN', originKey: 'TN', x: 6.5, y: 4,
        },
        {
          paddGroup: 1, name: 'NC', originKey: 'NC', x: 7.5, y: 4,
        },
        {
          paddGroup: 1, name: 'SC', originKey: 'SC', x: 8.5, y: 4,
        },
        {
          paddGroup: 1, name: 'DE', originKey: 'DE', x: 9.5, y: 4,
        },
        {
          paddGroup: 5, name: 'AZ', originKey: 'AZ', x: 3, y: 5,
        },
        {
          paddGroup: 3, name: 'NM', originKey: 'NM', x: 4, y: 5,
        },
        {
          paddGroup: 3, name: 'LA', originKey: 'LA', x: 5, y: 5,
        },
        {
          paddGroup: 3, name: 'MS', originKey: 'MS', x: 6, y: 5,
        },
        {
          paddGroup: 3, name: 'AL', originKey: 'AL', x: 7, y: 5,
        },
        {
          paddGroup: 1, name: 'GA', originKey: 'GA', x: 8, y: 5,
        },
        {
          paddGroup: 3, name: 'TX', originKey: 'TX', x: 4.5, y: 6,
        },
        {
          paddGroup: 1, name: 'FL', originKey: 'FL', x: 7.5, y: 6,
        },
      ],
    },
  },
})
module.exports = MapLayoutGridConstant
