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
    ports: {
      Aden: {
        'Port Name': 'Aden', Province: 'AB', Latitude: 48.997778, Longitude: -111.258056, '': '', Description: '', Capacity: '',
      },
      Cardston: {
        'Port Name': 'Cardston', Province: 'AB', Latitude: 49.2025, Longitude: -113.301944, '': '', Description: '', Capacity: '',
      },
      Coutts: {
        'Port Name': 'Coutts', Province: 'AB', Latitude: 49, Longitude: -111.95, '': '', Description: '', Capacity: '',
      },
      'Reagan Field': {
        'Port Name': 'Reagan Field', Province: 'AB', Latitude: 48.975278, Longitude: -112.512778, '': 'US', Description: '', Capacity: '',
      },
      Sierra: {
        'Port Name': 'Sierra', Province: 'AB', Latitude: 49.0023, Longitude: -111.9648, '': '', Description: '', Capacity: '',
      },
      Blaine: {
        'Port Name': 'Blaine', Province: 'BC', Latitude: 49.1044, Longitude: -122.8011, '': '', Description: '', Capacity: '',
      },
      Huntingdon: {
        'Port Name': 'Huntingdon', Province: 'BC', Latitude: 49, Longitude: -122.266667, '': 'US', Description: 'Huntingdon is an export point on the Westcoast system. Westcoast extends from points in the Yukon Territory, the Northwest Territories, Alberta and B.C. to the Canada-U.S. border near Huntingdon, B.C. At the border, Westcoast connects to Williams Northwest Pipeline, which supplies natural gas to the U.S. Pacific Northwest market.', Capacity: 1.7,
      },
      Kingsgate: {
        'Port Name': 'Kingsgate', Province: 'BC', Latitude: 49, Longitude: -116.1833, '': 'US', Description: 'Kingsgate is an export point on the  Foothills BC pipeline. The Foothills BC system transports natural gas from the WCSB to a point on the Canada U.S. border near Kingsgate, BC. At the border, Foothills BC connects to the Gas Transmission Northwest system, which serves markets in the Pacific Northwest and California.', Capacity: 1.6,
      },
      Emerson: {
        'Port Name': 'Emerson', Province: 'MB', Latitude: 49.006944, Longitude: -97.2078, '': '', Description: 'Emerson is an export point on the TransCanada Mainline. At the border point, the Mainline connects with the Great Lakes Gas Transmission and Viking pipelines, suppling markets in the mid-continent, as well as Ontario and Quebec.', Capacity: 2.9,
      },
      Sprague: {
        'Port Name': 'Sprague', Province: 'MB', Latitude: 49.035278, Longitude: -95.639167, '': '', Description: '', Capacity: '',
      },
      Brunswick: {
        'Port Name': 'Brunswick', Province: 'NB', Latitude: 45.166111, Longitude: -67.2425, '': 'US', Description: 'Brunswick is an export point on the Emera Brunswick pipeline. The Brunswick Pipeline was commissioned in July 2009 and transports re-gasified natural gas 145 km from the Canaport LNG terminal near Saint John, NB to the Canada-US border near St. Stephen,', Capacity: 1,
      },
      Canaport: {
        'Port Name': 'Canaport', Province: 'NB', Latitude: 45.2733, Longitude: -66.0633, '': '', Description: '', Capacity: '',
      },
      'St Stephen': {
        'Port Name': 'St Stephen', Province: 'NB', Latitude: 45.2, Longitude: -67.283333, '': '', Description: 'St Stephen is an export point on the Maritimes and Northeast Pipeline, which supplies markets in the Martitimes and New England.', Capacity: 0.55,
      },
      Chippawa: {
        'Port Name': 'Chippawa', Province: 'ON', Latitude: 43.055833, Longitude: -79.046944, '': '', Description: '', Capacity: '',
      },
      Cornwall: {
        'Port Name': 'Cornwall', Province: 'ON', Latitude: 45.0275, Longitude: -74.74, '': '', Description: '', Capacity: '',
      },
      Corunna: {
        'Port Name': 'Corunna', Province: 'ON', Latitude: 42.9745, Longitude: -82.4066, '': '', Description: '', Capacity: '',
      },
      Courtright: {
        'Port Name': 'Courtright', Province: 'ON', Latitude: 42.78333, Longitude: -82.35, '': '', Description: '', Capacity: '',
      },
      'Fort Frances': {
        'Port Name': 'Fort Frances', Province: 'ON', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '',
      },
      Iroquois: {
        'Port Name': 'Iroquois', Province: 'ON', Latitude: 44.91667, Longitude: -75.26667, '': '', Description: 'Iroquois is an export point on the TransCanada Mainline.', Capacity: 1.2,
      },
      'Niagara Falls': {
        'Port Name': 'Niagara Falls', Province: 'ON', Latitude: 43.0896, Longitude: -79.0849, '': '', Description: 'Niagara Falls is an export point on the TransCanada Mainline.', Capacity: 0.7,
      },
      'Ojibway (Windsor)': {
        'Port Name': 'Ojibway (Windsor)', Province: 'ON', Latitude: 42.2659, Longitude: -83.0779, '': '', Description: '', Capacity: '',
      },
      'Rainy River': {
        'Port Name': 'Rainy River', Province: 'ON', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '',
      },
      Sarnia: {
        'Port Name': 'Sarnia', Province: 'ON', Latitude: 42.9745, Longitude: -82.4066, '': '', Description: '', Capacity: '',
      },
      'Sarnia/Blue Water': {
        'Port Name': 'Sarnia/Blue Water', Province: 'ON', Latitude: 42.999444, Longitude: -82.308889, '': '', Description: '', Capacity: '',
      },
      'Sault Ste Marie': {
        'Port Name': 'Sault Ste Marie', Province: 'ON', Latitude: 46.5219, Longitude: -84.3461, '': '', Description: '', Capacity: '',
      },
      'St Clair': {
        'Port Name': 'St Clair', Province: 'ON', Latitude: 42.78333, Longitude: -82.35, '': '', Description: '', Capacity: '',
      },
      Armstrong: {
        'Port Name': 'Armstrong', Province: 'QB', Latitude: 45.8661, Longitude: -70.4332, '': '', Description: '', Capacity: '',
      },
      Champlain: {
        'Port Name': 'Champlain', Province: 'QB', Latitude: 44.9688, Longitude: -73.4498, '': 'US', Description: '', Capacity: '',
      },
      'East Hereford': {
        'Port Name': 'East Hereford', Province: 'QB', Latitude: 45.08333, Longitude: -71.5, '': '', Description: 'East Hereford is an export point on the TransCanada Mainline. At the border, the Mainline connects with the Portland Natura Gas Transmission, which serves markets in New England and the Maritimes.', Capacity: 0.25,
      },
      'Highgate Springs': {
        'Port Name': 'Highgate Springs', Province: 'QB', Latitude: 44.9795, Longitude: -73.1054, '': 'US', Description: '', Capacity: '',
      },
      Highwater: {
        'Port Name': 'Highwater', Province: 'QB', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '',
      },
      Napierville: {
        'Port Name': 'Napierville', Province: 'QB', Latitude: 45.187058, Longitude: -73.401632, '': '', Description: '', Capacity: '',
      },
      Philipsburg: {
        'Port Name': 'Philipsburg', Province: 'QB', Latitude: 45.0333, Longitude: -73.05, '': '', Description: '', Capacity: '',
      },
      Elmore: {
        'Port Name': 'Elmore', Province: 'SK', Latitude: 49, Longitude: -101.633, '': '', Description: 'Elmore is an export point on the Alliance Pipeline. The Alliance pipeline is unique among major Canadian gas pipelines because natural gas liquids may be left in the gas stream. The system draws from 52 receipt points, largely concentrated near the northern end of the system in northeastern B.C. and northwestern Alberta. Alliance transports liquids-rich gas to the Chicago market hub. Extraction of natural gas liquids occurs at the Aux Sable facility located near Chicago', Capacity: 1.7,
      },
      Loomis: {
        'Port Name': 'Loomis', Province: 'SK', Latitude: 49.2, Longitude: -108.7333, '': '', Description: '', Capacity: '',
      },
      Monchy: {
        'Port Name': 'Monchy', Province: 'SK', Latitude: 49.01667, Longitude: -107.833889, '': '', Description: 'Monchy is an export point on the Foothills Saskatchewan pipeline. The Foothills SK system transports natural gas from the WCSB to the Canada U.S. border near Monchy, Saskatchewan. At the border, it connects to the Northern Border pipeline, which serves markets in the U.S. Midwest', Capacity: 2.9,
      },
      'North Portal': {
        'Port Name': 'North Portal', Province: 'SK', Latitude: 49.054, Longitude: -102.668, '': '', Description: '', Capacity: '',
      },
      'Port of Estevan': {
        'Port Name': 'Port of Estevan', Province: 'SK', Latitude: 49.1231, Longitude: -102.9915, '': '', Description: '', Capacity: '',
      },
      'Willow Creek': {
        'Port Name': 'Willow Creek', Province: 'SK', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '' },

    },
  },
})
export default MapLayoutGridConstant
