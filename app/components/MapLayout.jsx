const React = require('react')
const ReactRedux = require('react-redux')
const MapPiece = require('./MapPiece.jsx')
const DataLoader = require('../DataLoader.js')
const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')
const MapLayoutComputation = require('../computations/MapLayoutComputation.js')

class MapLayout extends React.Component {
  mapPieceTransform (xaxis, yaxis, position, dimensions, mapPieceScale){
    let startXaxis = xaxis + (position.get('x') * (mapPieceScale * dimensions.get('width') + dimensions.get('xAxisPadding')))
    let startYaxis = yaxis + (position.get('y') * (mapPieceScale * dimensions.get('height') + dimensions.get('yAxisPadding')))
    return`translate(${startXaxis+','+startYaxis}) scale(${mapPieceScale})`
  }

  render(){
    //Data from constant file
    const type = this.props.importExportVisualization
    const mapData = DataLoader.get(type)
    
    //fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceData = mapData.get(this.props.country)
    const layout = MapLayoutComputation.getLayout(
                                          this.props.electricitySortState, 
                                          mapLayoutGrid.get('layout'), 
                                          mapPieceData,
                                          mapLayoutGrid.get('defaultColumns'), 
                                          mapLayoutGrid.get('sortingRowPadding')
                                        )
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const xaxis = this.props.xaxis
    const yaxis = this.props.yaxis
    return layout.map( (position,key) =>{
      return <g  key = { key }  transform={this.mapPieceTransform(xaxis, yaxis, position, dimensions, mapPieceScale)} >
                <MapPiece 
                data = { mapPieceData.get(position.get('name')) } 
                dimensions = { dimensions }
                legends = {MapLayoutGridConstant.getIn([type,'legends'])}
                styles = { styles }/>
            </g>
    })
  }
}


const mapStateToProps = state => {
  return {
    importExportVisualization: state.importExportVisualization,
    data: state.data,
    electricitySortState: state.electricitySortState
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapLayout)