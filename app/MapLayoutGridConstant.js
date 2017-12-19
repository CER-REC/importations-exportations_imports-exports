const Immutable = require('immutable')

const MapLayoutGridConstant = Immutable.fromJS({
  electricity:{
    ca:{
      defaultColumns:8,
      dimensions:{
        height: 70,
        width: 70,
        yAxisPadding: 10,
        xAxisPadding: 10
      },
      styles: {
        color: 'orange',
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