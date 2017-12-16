const React = require('react')
const ReactRedux = require('react-redux')
const MapPiece = require('./MapPiece.jsx')

const DataLoader = require('../DataLoader.js')

const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')
class MapLayout extends React.Component {
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
    
    return layout.map( (position,key) =>{
      return <MapPiece 
        key = { key } 
        xaxis = { this.props.xaxis }
        yaxis = { this.props.yaxis }
        data = { mapPieceData.get(position.get('name')) } 
        position = { position }
        dimensions = { dimensions }
        styles = { styles }/>
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