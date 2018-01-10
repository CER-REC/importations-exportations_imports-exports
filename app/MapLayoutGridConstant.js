const Immutable = require('immutable')

const MapLayoutGridConstant = Immutable.fromJS({
  electricity:{
    ca:{
      mapPieceScale:1,
      defaultColumns:8,
      sortingRowPadding: 1.5,
      dimensions:{
        height: 37.09,
        width: 38.75,
        yAxisPadding: 8.528,
        xAxisPadding: 12.528
      },
      styles: {
        color: '#ede3cb',
        labelPosition:'up',
        arrowPosition:'down',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle:{
          fill: '#999',
          stroke: '#999',
          exclamationFill:'#fff'
        }
      },
      layout: [
        { name: 'YT',  originKey:'YT',  x:0,  y:0 },
        { name: 'NT',  originKey:'NT',  x:1,  y:0 },
        { name: 'NU',  originKey:'NU',  x:2,  y:0 },
        { name: 'NF',  originKey:'NF',  x:6,  y:0 },
        { name: 'PE',  originKey:'PE',  x:7,  y:0 },
        { name: 'BC',  originKey:'BC',  x:0.5,  y:1 },
        { name: 'AB',  originKey:'AB',  x:1.5,  y:1 },
        { name: 'SK',  originKey:'SK',  x:2.5,  y:1 },
        { name: 'MB',  originKey:'MB',  x:3.5,  y:1 },
        { name: 'ON',  originKey:'ON',  x:4.5,  y:1 },
        { name: 'QC',  originKey:'QC',  x:5.5,  y:1 },
        { name: 'NB',  originKey:'NB',  x:6.5,  y:1 },
        { name: 'NS',  originKey:'NS',  x:7.5,  y:1 } 
      ]
    },
    us:{
      mapPieceScale:0.58,
      defaultColumns:12,
      sortingRowPadding: -0.5,
      dimensions:{
        height: 37.09,
        width: 38.75,
        yAxisPadding: 4.5,
        xAxisPadding: 7.5
      },
      styles: {
        color: '#ede3cb',
        labelPosition:'down',
        arrowPosition:'up',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle:{
          fill: '#999',
          stroke: '#999',
          exclamationFill:'#fff'
        }
      },
      layout:[
        { name:  'VT', originKey: 'VT', x: 9.5, y: 0 },
        { name:  'ME', originKey: 'ME', x: 10.5, y: 0 },
        { name:  'AK', originKey: 'AK', x: -0.25, y : 1},
        { name:  'WA', originKey: 'WA', x: 1, y : 1 },
        { name:  'MT', originKey: 'MT', x: 2, y : 1 },
        { name:  'ND', originKey: 'ND', x: 3, y : 1 },
        { name:  'MN', originKey: 'MN', x: 4, y : 1 },
        { name:  'WI', originKey: 'WI', x: 5, y : 1 },
        { name:  'MI', originKey: 'MI', x: 7, y : 1 },
        { name:  'NY', originKey: 'NY', x: 9, y : 1 },
        { name:  'MA', originKey: 'MA', x: 10, y:1 },
        { name:  'NH', originKey: 'NH', x: 11, y:1 },
        { name:  'ID', originKey: 'ID', x: 1.5, y: 2 },
        { name:  'WY', originKey: 'WY', x: 2.5, y: 2 },
        { name:  'SD', originKey: 'SD', x: 3.5, y: 2 },
        { name:  'IA', originKey: 'IA', x: 4.5, y: 2 },
        { name:  'IL', originKey: 'IL', x: 5.5, y: 2 },
        { name:  'IN', originKey: 'IN', x: 6.5, y: 2 },
        { name:  'OH', originKey: 'OH', x: 7.5, y: 2 },
        { name:  'PA', originKey: 'PA', x: 8.5, y: 2 },
        { name:  'NJ', originKey: 'NJ', x: 9.5, y: 2 },
        { name:  'RI', originKey: 'RI', x: 10.5, y: 2 },
        { name:  'HI', originKey: 'HI', x: -0.25 , y: 3 },
        { name:  'OR', originKey: 'OR', x: 1 , y: 3 },
        { name:  'NV', originKey: 'NV', x: 2 , y: 3 },
        { name:  'CO', originKey: 'CO', x: 3 , y: 3 },
        { name:  'NE', originKey: 'NE', x: 4 , y: 3 },
        { name:  'MO', originKey: 'MO', x: 5 , y: 3 },
        { name:  'KY', originKey: 'KY', x: 6 , y: 3 },
        { name:  'WV', originKey: 'WV', x: 7 , y: 3 },
        { name:  'VA', originKey: 'VA', x: 8 , y: 3 },
        { name:  'MD', originKey: 'MD', x: 9 , y: 3 },
        { name:  'CT', originKey: 'CT', x: 10 , y: 3 },
        { name:  'CA', originKey: 'CA', x: 1.5 , y: 4 },
        { name:  'UT', originKey: 'UT', x: 2.5 , y: 4 },
        { name:  'OK', originKey: 'OK', x: 3.5 , y: 4 },
        { name:  'KS', originKey: 'KS', x: 4.5 , y: 4 },
        { name:  'AR', originKey: 'AR', x: 5.5 , y: 4 },
        { name:  'TN', originKey: 'TN', x: 6.5 , y: 4 },
        { name:  'NC', originKey: 'NC', x: 7.5 , y: 4 },
        { name:  'SC', originKey: 'SC', x: 8.5 , y: 4 },
        { name:  'DE', originKey: 'DE', x: 9.5 , y: 4 },
        { name:  'AZ', originKey: 'AZ', x: 3 , y: 5 },
        { name:  'NM', originKey: 'NM', x: 4 , y: 5 },
        { name:  'LA', originKey: 'LA', x: 5 , y: 5 },
        { name:  'MS', originKey: 'MS', x: 6 , y: 5 },
        { name:  'AL', originKey: 'AL', x: 7 , y: 5 },
        { name:  'GA', originKey: 'GA', x: 8 , y: 5 },
        { name:  'TX', originKey: 'TX', x: 3.5 , y: 6 },
        { name:  'FL', originKey: 'FL', x: 7.5 , y: 6 },
      ]
    },
    powerpool:{
      mapPieceScale:0.58,
      defaultColumns:12,
      dimensions:{
        height: 37.09,
        width: 38.75,
        yAxisPadding: 4.5,
        xAxisPadding: 7.5
      },
      styles: {
        color: '#ede3cb',
        labelPosition:'down',
        arrowPosition:'up',
        arrowSpacing: -1,
        bottomMargin: 5,
        topMargin: 5,
        confidentialStyle:{
          fill: '#999',
          stroke: '#999',
          exclamationFill:'#fff'
        }
      },
      layout:[
        { name:  'MN', originKey: 'MN', x: 0, y: 0 },
        { name:  'NE', originKey: 'NE', x: 1, y: 0 },
        { name:  'PJM', originKey: 'PJM', x: 2, y : 0},
      ]
    },
    legends:[{
      lower:1,
      upper: 9999,
      imports:'grey',
      exports:'grey'
    },{
      lower:10000,
      upper: 99999,
      imports:'#ffcc66',
      exports:'#66ffff'
    },{
      lower:100000,
      upper: 999999,
      imports:'#ff6600',
      exports:'#3399ff'
    },{
      lower:1000000,
      upper: 1999999,
      imports:'#ff3300',
      exports:'#3333ff'
    },{
      lower:2000000,
      upper: 'NA',
      imports:'#800000',
      exports:'#000099'
    }] 
  } 
})
module.exports = MapLayoutGridConstant