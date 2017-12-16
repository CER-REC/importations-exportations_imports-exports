const Immutable = require('immutable')

const MapLayoutGridConstant = Immutable.fromJS({
  electricity:{
    ca:{
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
        { name:'BC',  x:0,  y:1 },
        { name:'AB',  x:1,  y:1 },
        { name:'SK',  x:2,  y:1 },
        { name:'MB',  x:3,  y:1 },
        { name:'ON',  x:4,  y:1 },
        { name:'QC',  x:5,  y:1 },
        { name:'NB',  x:6,  y:1 },
        { name:'NS',  x:7,  y:1 } 
      ]
    } 
  } 
})
module.exports = MapLayoutGridConstant