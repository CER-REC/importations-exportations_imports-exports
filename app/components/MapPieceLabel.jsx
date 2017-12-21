const React = require('react')

const Constants = require('../Constants.js')
require('./MapPiece.scss')
class MapPieceLabel extends React.Component {

  render() {
    let yAxis = Constants.getIn(['mapPieceTextStyle', 'y']) + this.props.topMargin
    const xAxis = Constants.getIn(['mapPieceTextStyle', 'x'])
    const name = this.props.name
    if(this.props.labelPosition === 'down'){
        yAxis = this.props.mapPieceHeight - this.props.bottomMargin
    }
    return <text className='mapPieceText' x = {xAxis} y = {yAxis} >
        {name}
    </text>

  }
}

module.exports = MapPieceLabel