const React = require('react')
const Constants = require('../Constants.js')

const MapPiece = require('./MapPiece.jsx')
const MapPieceExplantionConstant = require('../MapPieceExplantionConstant.js')

class MapPieceActivityExplantion extends React.Component {

  render(){
    return <g transform='translate(10,550)'> 
      <MapPiece 
        data = { MapPieceExplantionConstant.getIn(['electricity','ca', 'datapoint']) } 
        dimensions = { MapPieceExplantionConstant.getIn(['electricity','ca', 'dimensions']) }
        legends = {MapPieceExplantionConstant.getIn(['electricity','ca', 'legends'])}
        styles = { MapPieceExplantionConstant.getIn(['electricity','ca', 'styles']) }
        arrowProps ={MapPieceExplantionConstant.getIn(['electricity','ca', 'arrowProps'])}
        mapPieceProps= { MapPieceExplantionConstant.getIn(['electricity','ca', 'mapPieceProps']) }/>
      <g transform='translate(0,70)'>
        <MapPiece 
          data = { MapPieceExplantionConstant.getIn(['electricity','us', 'datapoint']) } 
          dimensions = { MapPieceExplantionConstant.getIn(['electricity','us', 'dimensions']) }
          legends = {MapPieceExplantionConstant.getIn(['electricity','us', 'legends'])}
          styles = { MapPieceExplantionConstant.getIn(['electricity','us', 'styles']) }
          arrowProps = { MapPieceExplantionConstant.getIn(['electricity','us', 'arrowProps']) }
          mapPieceProps = { MapPieceExplantionConstant.getIn(['electricity','us', 'mapPieceProps']) }
          />
      </g>
      </g>
  }
}


module.exports = MapPieceActivityExplantion