const React = require('react')
const ReactRedux = require('react-redux')
const MapPiece = require('./MapPiece.jsx')
const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')

const ElectrictySelector = require('../selectors/ElectricitySelector.js')

class ElectricityMapLayout extends React.Component {
  mapPieceTransform (xaxis, yaxis, position, dimensions, mapPieceScale){
    let startXaxis = xaxis + (position.get('x') * (mapPieceScale * dimensions.get('width') + dimensions.get('xAxisPadding')))
    let startYaxis = yaxis + (position.get('y') * (mapPieceScale * dimensions.get('height') + dimensions.get('yAxisPadding')))
    return`translate(${startXaxis+','+startYaxis}) scale(${mapPieceScale})`
  }

  render(){
    //Data from constant file
    const type = this.props.importExportVisualization
    
    //fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const layout = this.props.layout
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const xaxis = this.props.xaxis
    const yaxis = this.props.yaxis
    return layout.map( (position,key) =>{
      return <g  key = { key }  transform={this.mapPieceTransform(xaxis, yaxis, position, dimensions, mapPieceScale)} >
                <MapPiece 
                data = { position } 
                dimensions = { dimensions }
                legends = {MapLayoutGridConstant.getIn([type,'legends'])}
                styles = { styles }/>
            </g>
    })
  }
}


const mapStateToProps = (state,props) => {
  return {
    importExportVisualization: state.importExportVisualization,
    layout: ElectrictySelector.getElectrictyMapLayout(state,props),
    electricitySortState: state.electricitySortState
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ElectricityMapLayout)