import { fromJS } from 'immutable'

const Constants = fromJS({
  workspace: {
    heightToWidthRatio: 0.66,
    viewportPadding: 100,
  },

  topHeightMargin: 70,

  metaBar: {
    width: 27,
    height: 70,
    iconSize: 20,
    resetTextOffset: 53,
    iconMargin: 22,
    resetIconMargin: 49,
    resetTextY: 65,
  },

  menuBar: {
    width: 220,
    containerHeight: 300,
    importExportMenuLabelMargin: 16,
    importExportTextLabelYOffset: 12,
    textLabelOffset: 13,
    sortMenuYMargin: 116,
    sortMenuTextY: 182,
    sortTextButtonLabelOffset: 79,
    amountMenuYMargin: 137,
    amountMenuTextY: 203,
    amountTextButtonLabelOffset: 109,
    nglMenuYMargin: 158,
    nglSubproductTextY: 223,
    barWidth: 6,
    verticalPadding: 5,
    barHeight: 16,
    optionHeight: 15,
    visualizationPadding: 15,
    menuExpandedPadding: 30,
    expandedMenuTextMargin: 12,
    sortMenuTextOffsetY: 35,
    sortMenuLabelOffsetY: 30,
    amountMenuTextOffsetY: 15,
  },

  menuBarOptions: {
    optionPadding: 19,
    optionXaxisPadding: 22,
  },

  legend: {
    topMargin: 200,
    iconHeight: 11.09,
    iconWidth: 29.69,
    crudeOilLegendPosition: -40.49,
    textValuePosition: 84.48,
    exportColumn: 40.99,
    importColumn: 0,
    headingY: 770,
    importHeadingX: 4.045,
    exportHeadingX: 45.5,
  },

  socialBar: {
    topMargin: -75,
    controlArrowMargin: 30,
    controlArrowY: -62,
    width: 25,
    height: 125,
    iconSize: 15,
    iconMarginY: 26,
    expandedWidth: 110,
    expandedWidthFr: 172,
    expandedIconX: 129,
    expandedIconXFr: 190,
    iconMargin: 30,
    downloadDataIconMargin: 54,
    downloadImageIconMargin: 78,
    shareIconMargin: 102,
    iconX: 128,
    iconY: 29,
    twitterMargin: 37,
    facebookMargin: 67,
    linkedinMargin: 95,
    iconTextY: -57,
  },

  visualizationContainer: {
    widthPadding: 450,
    heightPadding: 300,
  },

  visualizationDetailContainer: {
    width: 250,
    leftPadding: 10,
  },

  mainNavigationMenu: {
    menuYPadding: 22,
    textYPosition: 88,
    height: 160,
  },

  electricitySortMenu: {
    height: 150,
    topMargin: 180,
  },

  electricityAmountPriceMenu: {
    height: 100,
    topMargin: 100,
  },

  showExplanations: {
    height: 30,
    topMargin: 80,
    triangleLineWidth: 180,
    triangleLineYOffset: 3,
    triangleLineY: 7.6,
    labelOffset: 13,
  },

  explanationDot: {
    strokeWidth: 1.3,
    radiusStart: 4.5,
    radiusEnd: 15.5,
    yOffset: 5,
  },

  imageDownload: {
    previewImageWidth: 430,
  },

  visualizationTypes: [
    'electricity',
    'crudeOil',
    'naturalGas',
    'naturalGasLiquids',
    'refinedPetroleumProducts',
  ],
  electricitySortStates: [
    'location',
    'imports',
    'exports',
  ],

  electricitySortStatesStyle: {
    color: 'grey',
    lineWidth: 3,
    title: {
      import: {
        xPadding: 5,
        color: 'orange',
      },
      ampersand: {
        xPadding: 70,
        color: '',
      },
      export: {
        xPadding: 90,
        color: '#6495ED',
      },
    },
  },

  language: [
    'en',
    'fr',
  ],

  electricityDataTypesStyle: {
    color: 'grey',
    lineWidth: 3,
  },

  timeline: {
    barPadding: 0.5,
    groupPadding: 5,
    axisHeight: 19,
  },

  mapPieceTextStyle: {
    x: 10.68,
    y: 10,
  },
  mapPieceArrowStyle: {
    x: 0,
    y: 8,
  },
  mapPieceArrowStyleCenter: {
    x: -1,
    y: 10,
  },
  aboutWindow: {
    width: 380,
  },


  energyMeasurementTypes: {
    electricity: ['MW.h', 'CAN$', 'CAN$/MW.h'],
    crudeOil: ['thousand m3/d'],
    naturalGas: ['thousand m3/d', 'CN$/GJ'],
    naturalGasLiquids: ['m3/d'],
    refinedPetroleumProducts: ['thousand m3/d'],
  },

  appHost: 'https://apps2.neb-one.gc.ca',
  screenshotPath: 'screenshot',

  screenshotWidth: 1138,
  screenshotHeight: 930,

  styleGuide: {
    colours: {
      NeutralWhite: 'rgb(255, 255, 255)',
      NeutralExtraLight: 'rgb(230, 230, 230)',
      NeutralLight: 'rgb(153, 153, 153)',
      NeutralMedium: 'rgb(102, 102, 102)',
      NeutralMediumDark: 'rgb(77, 77, 77)',
      NeutralDark: 'rgb(0, 0, 0)',
      SandLight: 'rgb(237, 227, 203)',
      SandMedium: 'rgb(211, 193, 152)',
      SandDark: 'rgb(182, 165, 126)',
      SandExtraDark: 'rgb(169, 147, 114)',
      ImportDefault: 'rgb(255,119,76)',
      ExportDefault: 'rgb(28,100,178)',
      Accent: 'rgb(251,176,59)',
      Explanation: 'rgb(255, 112, 138)',
    },
    importColours: [
      'rgb(254, 209, 144)',
      'rgb(253, 174, 97)',
      'rgb(255,119,76)',
      'rgb(215, 28, 39)',
      'rgb(165, 0, 38)',
    ],
    exportColours: [
      'rgb(214, 234, 246)',
      'rgb(158, 202, 225)',
      'rgb(86, 152, 203)',
      'rgb(28, 100, 178)',
      'rgb(8, 69, 148)',
    ],
    categoryColours: {
      refinedPetroleumProducts: {
        productSubtype: {
          'Partially Processed Oil': 'rgb(119, 246, 190)',
          'Jet Fuel': 'rgb(0, 202, 116)',
          'Heavy Fuel Oil': 'rgb(44, 167, 167)',
          'Motor Gasoline': 'rgb(33, 110, 123)',
          'Middle Distillate': 'rgb(47, 72, 98)',
        },
      },
      crudeOil: {
        transport: {
          Marine: 'rgb(184, 184, 244)',
          Pipeline: 'rgb(47, 72, 98)',
          Railroad: 'rgb(191, 12, 178)',
          Truck: 'rgb(52, 153, 244)',
        },
        productSubtype: {
          Heavy: 'rgb(34, 111, 124)',
          Light: 'rgb(45, 168, 168)',
        },
      },
    },
  },
  detailBreakDown: {
    ca: {
      required: true,
      type: 'imports',
      displayPosition: 'bottom',
      color: '#ff774c',
      height: 75,
      showDefault: true,
    },
    us: {
      required: true,
      type: 'exports',
      displayPosition: 'top',
      color: '#1c64b2',
      height: 140,
      showDefault: false,
    },
    powerpool: {
      require: false,
    },
  },
  dataloader: {
    mapping: {
      value: {
        confidential: 'Confidential',
      },
      padd: {
        us: {
          'PADD I': 'PADD I',
          'PADD II': 'PADD II',
          'PADD III': 'PADD III',
          'PADD IV': 'PADD IV',
          'PADD V': 'PADD V',
          'Non-USA': 'Non-USA',
          Mexico: 'Mexico',
        },
        ca: {
          ca: 'ca',
        },
      },
      country: {
        ca: {
          Yukon: 'YT',
          'Northwest Territories': 'NT',
          Nunavut: 'NU',
          'Newfoundland and Labrador': 'NL',
          'Prince Edward Island': 'PE',
          'British Columbia': 'BC',
          Alberta: 'AB',
          Saskatchewan: 'SK',
          Manitoba: 'MB',
          Ontario: 'ON',
          Québec: 'QC',
          'New Brunswick': 'NB',
          'Nova Scotia': 'NS',
          'Atlantic provinces and Quebec': 'ATL-Q',
        },
        us: {
          Alabama: 'AL',
          Alaska: 'AK',
          Arizona: 'AZ',
          Arkansas: 'AR',
          California: 'CA',
          Colorado: 'CO',
          Connecticut: 'CT',
          Delaware: 'DE',
          Florida: 'FL',
          Georgia: 'GA',
          Hawaii: 'HI',
          Idaho: 'ID',
          Illinois: 'IL',
          Indiana: 'IN',
          Iowa: 'IA',
          Kansas: 'KS',
          Kentucky: 'KY',
          Louisiana: 'LA',
          Maine: 'ME',
          Maryland: 'MD',
          Massachusetts: 'MA',
          Michigan: 'MI',
          Minnesota: 'MN',
          Mississippi: 'MS',
          Missouri: 'MO',
          Montana: 'MT',
          Nebraska: 'NE',
          Nevada: 'NV',
          'New Hampshire': 'NH',
          'New Jersey': 'NJ',
          'New Mexico': 'NM',
          'New York': 'NY',
          'North Carolina': 'NC',
          'North Dakota': 'ND',
          Ohio: 'OH',
          Oklahoma: 'OK',
          Oregon: 'OR',
          Pennsylvania: 'PA',
          'Rhode Island': 'RI',
          'South Carolina': 'SC',
          'South Dakota': 'SD',
          Tennessee: 'TN',
          Texas: 'TX',
          Utah: 'UT',
          Vermont: 'VT',
          Virginia: 'VA',
          Washington: 'WA',
          'West Virginia': 'WV',
          Wisconsin: 'WI',
          Wyoming: 'WY',
        },
        powerpool: {
          'New England-ISO': 'NE-ISO',
          'Minn / N. Dakota': 'MN/ND',
          'Pennsylvania Jersey Maryland Power Pool': 'PJMPP',
        },
      },
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
          'Port Name': 'Fort Frances', Province: 'ON', Latitude: 48.60995, Longitude: -93.39553, '': '', Description: '', Capacity: '',
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
          'Port Name': 'Rainy River', Province: 'ON', Latitude: 48.8403, Longitude: -94.6845, '': '', Description: '', Capacity: '',
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
        'East Hereford': {
          'Port Name': 'East Hereford', Province: 'QC', Latitude: 45.08333, Longitude: -71.5, '': '', Description: 'East Hereford is an export point on the TransCanada Mainline. At the border, the Mainline connects with the Portland Natura Gas Transmission, which serves markets in New England and the Maritimes.', Capacity: 0.25,
        },
        Highwater: {
          'Port Name': 'Highwater', Province: 'QC', Latitude: 45.02537, Longitude: -72.42930, '': '', Description: '', Capacity: '',
        },
        Napierville: {
          'Port Name': 'Napierville', Province: 'QC', Latitude: 45.187058, Longitude: -73.401632, '': '', Description: '', Capacity: '',
        },
        Philipsburg: {
          'Port Name': 'Philipsburg', Province: 'QC', Latitude: 45.0333, Longitude: -73.05, '': '', Description: '', Capacity: '',
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
        'Willow Creek': {
          'Port Name': 'Willow Creek', Province: 'SK', Latitude: 49.00086, Longitude: -109.73312, '': '', Description: '', Capacity: '',
        },
        CNG: {
          'Port Name': 'CNG', Province: 'CAD', Latitude: 0, Longitude: 0, '': '', Description: '', Capacity: '',
        },
        'LNG Other': {
          'Port Name': 'LNG Other', Province: 'CAD', Latitude: 0, Longitude: 0, '': '', Description: '', Capacity: '',
        },
      },
    },
  },
  tabIndex: {
    start: {
      menuBar: 10,
      visualization: {
        caMap: 50,
        timeline: 70,
        usMap: 100,
        powerpool: 180,
        caPadd: 50,
        usPadd: 150,
        naturalGasMap: 150,
      },
      detailSidebar: 200,
      socialBar: 200,
    },
  },
})
export default Constants
