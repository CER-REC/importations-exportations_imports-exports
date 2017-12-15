const React = require('react')
const ReactRedux = require('react-redux')

const MapPiece = require('./MapPiece.jsx')
const MapPieceComputations = require('../computations/MapPieceComputations.js')

class CanadaMapContainer extends React.Component {
  renderMapPieces(){
    const mapData = MapPieceComputations.locationOrder('ca')
    return mapData.map((data, key) =>{
      return <MapPiece key={key} data={data} color='orange'/>
    })
  }
  render(){
  	//Mock data need to be replaced by actual content 
    return <g>
      {this.renderMapPieces()}
      <text x={this.props.xaxis} y = {this.props.yaxis}>
        Canada Map Container
      </text>
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport

  }
}


module.exports = ReactRedux.connect(mapStateToProps)(CanadaMapContainer)