const Immutable = require('immutable')

const MapLayoutComputation = {}


MapLayoutComputation.createSortedLayout = function(sortedData, columns, rowPadding){
  let row = 0
  let column = 0
  let sortedArray  = []
  sortedData.forEach(data=>{
    if(column >= columns){
      column = 0
      row = row+1
      if(row%2 === 1){
        columns = columns-1  
      }
    }
    let x = row + column++
    if(row !== 0){
      x = x + (row*rowPadding)
    }
    sortedArray.push( {
      name: data.get('name'),
      x: x,
      y : row
    })
  })
  return Immutable.fromJS(sortedArray)
}

MapLayoutComputation.sortData = function(a,b,type){
  a = parseInt(a.get(type))
  b = parseInt(b.get(type))
  if (a < b) {
    return 1
  }
  if (a > b) {
    return -1
  }
  return 0
}

MapLayoutComputation.getLayout = function(type='location', layoutConstant, data, columns, rowPadding){
  switch(type){
  case 'export':
    return MapLayoutComputation.createSortedLayout(data.sort((a,b) => MapLayoutComputation.sortData(a, b, 'exportData')), columns, rowPadding)
  case 'import':
    return MapLayoutComputation.createSortedLayout(data.sort((a,b) => MapLayoutComputation.sortData(a, b, 'importData')), columns, rowPadding)
  case 'location':
  default:
    return layoutConstant
  }
}

module.exports = MapLayoutComputation