const React = require('react')
const ReactRedux = require('react-redux')
const ReactFauxDOM = require('react-faux-dom')
const Constants = require('../Constants.js')
const D3 = require('d3')
require('./MapPiece.scss')
class MapPiece extends React.Component {

  getArrowColor(legends, value){
      return legends.find(data => {
        if(data.get('lower') < value && data.get('upper') === 'NA'){
          return true
        }
        if(data.get('lower') < value && data.get('upper') >= value ){
          return true
        }
      }) 
  }
  render(){
    //add label
    //
    const mapPeiceLabel = <text className='mapPiece' x = {Constants.getIn(['mapPieceTextStyle', 'x'])} y = {Constants.getIn(['mapPieceTextStyle', 'y'])} >
          {this.props.data.get('name')}
        </text>
    return <g>
        <polygon fill={this.props.styles.get('color')} points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"/>
        {mapPeiceLabel}
      </g>
  }
}


module.exports = MapPiece