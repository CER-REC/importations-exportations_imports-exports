import React from 'react'
import { connect } from 'react-redux'

import Constants from '../Constants'
import '../styles/Fonts.scss'

class MapPieceLabel extends React.Component {
  drawLabel(mapPieceProps, yAxis) {
    const lineY = yAxis - 4
    const labelY = yAxis - 4
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
    switch(name.length){
      case 1:
      case 2:
        return <text className={this.props.styleClass} x={xAxis} y={yAxis} aria-hidden>
          {name}
        </text>
      case 3:
      case 4: 
      case 5:
        return <text className={this.props.styleClass} x={xAxis - 3} y={yAxis} aria-hidden>
          {name}
        </text>
      case 6:
        return <text className={this.props.styleClass} x={xAxis - 4} y={yAxis} aria-hidden>
          {name}
        </text>
      case 7:
        return <text className={this.props.styleClass} x={xAxis - 7} y={yAxis} aria-hidden>
          {name}
        </text>
      case 8:
      default:
       return (
          <g> 
            <defs>
              <path id="path1" d="M5,20 H30 M7,30 H30 M10,40 H30 M10,50 H30"></path>
            </defs>
            <use xlinkHref="#path1" x={xAxis + 0.25} y={yAxis} />
            <text className={this.props.styleClass} aria-hidden >
              <textPath xlinkHref="#path1"> {name}</textPath>
            </text>
          </g>
        )
    }

  }


  render() {
    let yAxis = Constants.getIn(['mapPieceTextStyle', 'y']) + this.props.topMargin
    const xAxis = Constants.getIn(['mapPieceTextStyle', 'x'])
    const name = this.props.name
    if (this.props.labelPosition === 'down') {
      yAxis = this.props.mapPieceHeight - this.props.bottomMargin
    }
    return (
      <g>
        {this.renderText(name, xAxis, yAxis)}
        {this.drawLabel(this.props.text, yAxis)}
        }
      </g>
    )
  }
}
const mapStateToProps = (state, props) => ({
  language: state.language,
})

export default connect(mapStateToProps)(MapPieceLabel)
