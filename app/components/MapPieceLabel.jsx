import React from 'react'
import { connect } from 'react-redux'

import Constants from '../Constants'
import Tr from '../TranslationTable'
import '../styles/Fonts.scss'

class MapPieceLabel extends React.Component {
  drawLabel(mapPieceProps, yAxis) {
    const lineY = yAxis - 4
    const labelY = yAxis + 1
    let labelElement = ''

    if (typeof mapPieceProps !== 'undefined') {
      const label = mapPieceProps.getIn(['stateOrProvince', this.props.language])
      if (typeof label !== 'undefined' && label !== '') {
        labelElement = (<g>
          <line x1="28.5" y1={lineY} x2="45" y2={lineY} strokeWidth="1" stroke="#999999" />
          <text className="explanationLabel" y={labelY} x="49" >
            {label}
          </text>
        </g>)
      }
    }
    return labelElement
  }

  renderText(name, xAxis, yAxis){
    if (name === 'ATL-Q') {return null}
    if (name && name.includes('\n')) {
      const splitName = name.split('\n')
      return (
        <text className={this.props.styleClass} y={yAxis - this.props.labelLineSpacing - 2} aria-hidden>
          {splitName.map(text => <tspan key={text} x={xAxis} dy={this.props.labelLineSpacing}>{text}</tspan>)}
        </text>
      )
    }
    return (
      <text className={this.props.styleClass} x={xAxis} y={yAxis} aria-hidden>
        {name}
      </text>
    )
  }


  render() {
    let yAxis = Constants.getIn(['mapPieceTextStyle', 'y']) + this.props.topMargin
    const xAxis = this.props.mapPieceWidth / 2
    const name = Tr.getIn(['mapTileLabels', this.props.mapPieceKey, this.props.name, this.props.language], this.props.name)
    if (this.props.labelPosition === 'down') {
      yAxis = this.props.mapPieceHeight - this.props.bottomMargin
    }
    return (
      <g>
        {this.renderText(name, xAxis, yAxis)}
        {this.drawLabel(this.props.text, yAxis)}
      </g>
    )
  }
}
const mapStateToProps = (state, props) => ({
  language: state.language,
})

export default connect(mapStateToProps)(MapPieceLabel)
