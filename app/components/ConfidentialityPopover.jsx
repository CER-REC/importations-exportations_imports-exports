import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import PopoverPortal from './PopoverPortal'

const Tr = require('../TranslationTable.js')

class ConfidentialityPopover extends React.Component {
  static get propTypes() {
    return {
      containerX: PropTypes.number.isRequired,
      containerY: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      lineX: PropTypes.number.isRequired,
      lineY: PropTypes.number.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      xPosition: PropTypes.number.isRequired,
      yPosition: PropTypes.number.isRequired,
      expanded: PropTypes.bool.isRequired,
    }
  }

  drawLine() {
    const transformString = `translate(${-this.props.lineX} ${-this.props.lineY})`
    const scaleLine = `${this.props.scale}`

    return (<svg>
      <g transform={`scale(0.4) ${scaleLine} ${transformString}`}>
        <path
          d="M142.16, 173.94l24.26, 36.69a40.12, 40.12,0,0,0, 33.47, 18H378.2"
          stroke="#999"
          strokeWidth="1.8"
          fill="transparent"
        />
      </g>
    </svg>)
  }

  drawText() {
    return (<div
      style={{
          position: 'relative',
          top: this.props.textY,
          left: this.props.textX,
          height: 'auto',
          width: 75,
          background: 'white',
          opacity: '0.9',
        }}
      className="confidentialityText"
    >
      {this.props.text}
            </div>)
  }

  render() {
    if (!this.props.expanded) { return null }
    return (<div style={{
          position: 'absolute',
          left: this.props.containerX + this.props.xPosition,
          top: this.props.containerY + this.props.yPosition,
        }}
    >
      {this.drawText()}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>{this.drawLine()}</div>
            </div>)
  }
}

export default ConfidentialityPopover
