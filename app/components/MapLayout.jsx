const React = require('react')
const ReactRedux = require('react-redux')
const MapPiece = require('./MapPiece.jsx')

const DataLoader = require('../DataLoader.js')

const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')
class MapLayout extends React.Component {
  mapPieceTransform (xaxis, yaxis, position, dimensions){
    let startXaxis = xaxis + (position.get('x') * (dimensions.get('width') + dimensions.get('xAxisPadding')))
    let startYaxis = yaxis + (position.get('y') * (dimensions.get('height') + dimensions.get('yAxisPadding')))
    return`translate(${startXaxis+','+startYaxis})`
  }
  render(){
    //Data from constant file
    const type = this.props.importExportVisualization
    const mapData = DataLoader.get(type)
    
    //fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    const layout = mapLayoutGrid.get('layout')
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')

    const mapPieceData = mapData.get(this.props.country)
    const xaxis = this.props.xaxis
    const yaxis = this.props.yaxis
    
    return layout.map( (position,key) =>{
      
      return <g  key = { key }  transform={this.mapPieceTransform(xaxis, yaxis, position, dimensions)} >
                <MapPiece 
                data = { mapPieceData.get(position.get('name')) } 
                dimensions = { dimensions }
                styles = { styles }/>
            </g>
    })
  }
}


const mapStateToProps = state => {
  return {
    importExportVisualization: state.importExportVisualization,
    data: state.data
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapLayout)