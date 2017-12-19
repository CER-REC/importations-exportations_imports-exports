const Constants = require('../Constants.js')
const Immutable = require('immutable')

const MapLayoutComputation = {}


MapLayoutComputation.createSortedLayout = function(sortedData, columns){
    let row = 0
    let column = 0
    let sortedArray  = []
    sortedData.forEach(data=>{
      if(column === columns){
        column = 0
        row = row+1
      }
      sortedArray.push( {
        name: data.get('name'),
        x: column++,
        y : row
      })
    })
    return Immutable.fromJS(sortedArray)
  }

  MapLayoutComputation.sortData = function(a,b,type){
    a = parseInt(a.get(type))
    b = parseInt(b.get(type))
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  MapLayoutComputation.getLayout = function(type='location', layoutConstant, data, columns){
    switch(type){
      case 'export':
        return this.createSortedLayout(data.sort((a,b) => this.sortData(a, b, 'exportData')), columns)
      case 'import':
        return this.createSortedLayout(data.sort((a,b) => this.sortData(a, b, 'importData')), columns)
      break 
      case 'location':
      default:
        return layoutConstant
    }
  }

module.exports = MapLayoutComputation