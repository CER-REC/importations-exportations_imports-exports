import React from 'react'
const ReactRedux = require('react-redux')
import PropTypes from 'prop-types'

import Constants from '../Constants'
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')

import ExplanationPopoverCreator from '../actions/explanations'

class ExplanationPopover extends React.Component {
  static get propTypes() {
    return {
      showExplanations: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      lineX: PropTypes.number.isRequired,
      lineY: PropTypes.number.isRequired,
      linePath: PropTypes.string.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
    }
  }

  drawLine() {
    const transformString = `translate(${-this.props.lineX} ${-this.props.lineY})`
    const transformLine = `${this.props.linePath}`

    return (<svg>
      <g transform={`scale(0.3) ${transformString}`}>
        <path d={transformLine} stroke="#ff708a" strokeWidth="1" fill="transparent" />
      </g>
    </svg>)
  }

  drawText() {
    return <div style={{
          position: 'relative',
          top: this.props.textY,
          left: this.props.textX,
          height: 'auto',
          width: 80,
          background: 'white',
          opacity: '0.9',
        }}
      className="explanationText">
      {this.props.text}
    </div>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    }
    return <div style={{
          position: 'absolute',
          top: this.props.containerY + this.props.yPosition,
          left: this.props.containerX + this.props.xPosition,
        }}>
        {this.drawText()}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>{this.drawLine()}</div>
    </div>
  }
}


const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
})

module.exports = ReactRedux.connect(mapStateToProps)(ExplanationPopover)