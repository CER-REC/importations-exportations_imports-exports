const Immutable = require('immutable')

const MapLayoutGridConstant = Immutable.fromJS({
  electricity:{
    ca:{
      defaultColumns:8,
      sortingRowPadding: 1.5,
      dimensions:{
        height: 70,
        width: 70,
        yAxisPadding: 10,
        xAxisPadding: 10
      },
      styles: {
        color: '#D3D3D3',
      },
      layout: [
        { name:'YT',  x:0,  y:0 },
        { name:'NT',  x:1,  y:0 },
        { name:'NU',  x:2,  y:0 },
        { name:'NF',  x:6,  y:0 },
        { name:'PE',  x:7,  y:0 },
        { name:'BC',  x:0.5,  y:1 },
        { name:'AB',  x:1.5,  y:1 },
        { name:'SK',  x:2.5,  y:1 },
        { name:'MB',  x:3.5,  y:1 },
        { name:'ON',  x:4.5,  y:1 },
        { name:'QC',  x:5.5,  y:1 },
        { name:'NB',  x:6.5,  y:1 },
        { name:'NS',  x:7.5,  y:1 } 
      ]
    },
    us:{
      defaultColumns:12,
      sortingRowPadding: -0.5,
      dimensions:{
        height: 45,
        width: 50,
        yAxisPadding: 1,
        xAxisPadding: 5
      },
      styles: {
        color: '#D3D3D3',
      },
      layout:[
        { name: 'VT', x: 9.5, y: 0 },
        { name: 'ME', x: 10.5, y: 0 },
        { name: 'AK', x: -0.25, y : 1},
        { name: 'WA', x: 1, y : 1 },
        { name: 'MT', x: 2, y : 1 },
        { name: 'ND', x: 3, y : 1 },
        { name: 'MN', x: 4, y : 1 },
        { name: 'WI', x: 5, y : 1 },
        { name: 'MI', x: 7, y : 1 },
        { name: 'NY', x: 9, y : 1 },
        { name: 'MA', x: 10, y:1 },
        { name: 'NH', x: 11, y:1 },
        { name: 'ID', x: 1.5, y: 2 },
        { name: 'WY', x: 2.5, y: 2 },
        { name: 'SD', x: 3.5, y: 2 },
        { name: 'IA', x: 4.5, y: 2 },
        { name: 'IL', x: 5.5, y: 2 },
        { name: 'IN', x: 6.5, y: 2 },
        { name: 'OH', x: 7.5, y: 2 },
        { name: 'PA', x: 8.5, y: 2 },
        { name: 'NJ', x: 9.5, y: 2 },
        { name: 'RI', x: 10.5, y: 2 },
        { name: 'HI', x: -0.25 , y: 3 },
        { name: 'OR', x: 1 , y: 3 },
        { name: 'NV', x: 2 , y: 3 },
        { name: 'CO', x: 3 , y: 3 },
        { name: 'NE', x: 4 , y: 3 },
        { name: 'MO', x: 5 , y: 3 },
        { name: 'KY', x: 6 , y: 3 },
        { name: 'WV', x: 7 , y: 3 },
        { name: 'VA', x: 8 , y: 3 },
        { name: 'MD', x: 9 , y: 3 },
        { name: 'CT', x: 10 , y: 3 },
        { name: 'CA', x: 1.5 , y: 4 },
        { name: 'UT', x: 2.5 , y: 4 },
        { name: 'OK', x: 3.5 , y: 4 },
        { name: 'KS', x: 4.5 , y: 4 },
        { name: 'AR', x: 5.5 , y: 4 },
        { name: 'TN', x: 6.5 , y: 4 },
        { name: 'NC', x: 7.5 , y: 4 },
        { name: 'SC', x: 8.5 , y: 4 },
        { name: 'DE', x: 9.5 , y: 4 },
        { name: 'AZ', x: 3 , y: 5 },
        { name: 'NM', x: 4 , y: 5 },
        { name: 'LA', x: 5 , y: 5 },
        { name: 'MS', x: 6 , y: 5 },
        { name: 'AL', x: 7 , y: 5 },
        { name: 'GA', x: 8 , y: 5 },
        { name: 'TX', x: 3.5 , y: 6 },
        { name: 'FL', x: 7.5 , y: 6 },
      ]
    },
    powerpool:{
      defaultColumns:12,
      dimensions:{
        height: 45,
        width: 50,
        yAxisPadding: 1,
        xAxisPadding: 5
      },
      styles: {
        color: '#D3D3D3',
      },
      layout:[
        { name: 'MN', x: 0, y: 0 },
        { name: 'NE', x: 1, y: 0 },
        { name: 'PJM', x: 2, y : 0},
      ]
    },
    legends:[{
      lower:1,
      upper: 9999,
      import:'grey',
      export:'grey'
    },{
      lower:10000,
      upper: 99999,
      import:'#ffcc66',
      export:'#66ffff'
    },{
      lower:100000,
      upper: 999999,
      import:'#ff6600',
      export:'#3399ff'
    },{
      lower:1000000,
      upper: 1999999,
      import:'#ff3300',
      export:'#3333ff'
    },{
      lower:2000000,
      upper: 'NA',
      import:'#800000',
      export:'#000099'
    }] 
  } 
})
module.exports = MapLayoutGridConstant