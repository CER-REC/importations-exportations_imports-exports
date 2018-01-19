const React = require('react')
const PropTypes = require('prop-types')

const MapPiece = require('./MapPiece.jsx')
const MapPieceExplantionConstant = require('../MapPieceExplantionConstant.js')

const ElectrictyMapPieceActivityExplantion = props => (
  <g transform={`translate(${props.left},${props.top})`}>
    <MapPiece
      data={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'datapoint'])}
      dimensions={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'dimensions'])}
      legends={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'legends'])}
      styles={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'styles'])}
      arrowProps={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'arrowProps'])}
      mapPieceProps={MapPieceExplantionConstant.getIn(['electricity', 'ca', 'mapPieceProps'])}
    />
    <g transform="translate(0,70)">
      <MapPiece
        data={MapPieceExplantionConstant.getIn(['electricity', 'us', 'datapoint'])}
        dimensions={MapPieceExplantionConstant.getIn(['electricity', 'us', 'dimensions'])}
        legends={MapPieceExplantionConstant.getIn(['electricity', 'us', 'legends'])}
        styles={MapPieceExplantionConstant.getIn(['electricity', 'us', 'styles'])}
        arrowProps={MapPieceExplantionConstant.getIn(['electricity', 'us', 'arrowProps'])}
        mapPieceProps={MapPieceExplantionConstant.getIn(['electricity', 'us', 'mapPieceProps'])}
      />
    </g>
  </g>
)

ElectrictyMapPieceActivityExplantion.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
}

module.exports = ElectrictyMapPieceActivityExplantion
