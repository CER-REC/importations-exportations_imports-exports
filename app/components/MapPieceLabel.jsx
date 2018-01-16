const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
require('../styles/Fonts.scss')
class MapPieceLabel extends React.Component {
  drawLabel(mapPieceProps, yAxis){
    const lineY = yAxis -4
    const labelY = yAxis -4
    let labelElement = ''

    if(typeof mapPieceProps !== 'undefined'){
      const label = mapPieceProps.getIn(['stateOrProvince', this.props.language])
      if(typeof label !== 'undefined' && label !== ''){
        labelElement = <g>
                      <line x1="28.5" y1={lineY} x2="45" y2={lineY} strokeWidth="1" stroke="black"/>
                      <text className="explanationLabel" y={labelY} x = '49' >
                        {label}
                      </text>
                    </g>
      }
    }
    return labelElement

  }


  render() {
    let yAxis = Constants.getIn(['mapPieceTextStyle', 'y']) + this.props.topMargin
    const xAxis = Constants.getIn(['mapPieceTextStyle', 'x'])
    const name = this.props.name
    if(this.props.labelPosition === 'down'){
        yAxis = this.props.mapPieceHeight - this.props.bottomMargin
    }
    return <g> 
    <text className='mapPieceText' x = {xAxis} y = {yAxis} >
        {name}
    </text>
    {this.drawLabel(this.props.mapPieceProps, yAxis)}
    </g>

  }
}
const mapStateToProps = (state,props) => {
  return {
    language: state.language
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MapPieceLabel)