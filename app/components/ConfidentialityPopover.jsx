import React from 'react'
const ReactRedux = require('react-redux')
import PropTypes from 'prop-types'

import Constants from '../Constants'
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')

class ConfidentialityPopover extends React.Component {
  static get propTypes() {
    return {
      
    }
  }

  drawLine() {
    const transformString = `translate(${-this.props.lineX} ${-this.props.lineY})`

    return (<svg>
      <g transform={`scale(0.3) ${transformString}`}>
        <path d="M102,40 C184,191 161,167 463,165" 
          stroke="#999" 
          strokeWidth="2" 
          fill="transparent" />
      </g>
    </svg>)
  }

  drawText() {
    return <div style={{
          position: 'relative',
          top: this.props.textY,
          left: this.props.textX,
          height: 'auto',
          width: 100,
          background: 'white',
          opacity: '0.9',
        }}
      className="confidentialityText">
      {this.props.text}
    </div>
  }

  render() {
    return <div style={{
          position: 'absolute',
          top: this.props.containerY + this.props.yPosition,
          left: this.props.containerX + this.props.xPosition,
        }}>
        {this.drawText()}
      <div style={{ position: 'absolute', top: 0, left: 0}}>{this.drawLine()}</div>
    </div>
  }
}


const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
})

module.exports = ReactRedux.connect(mapStateToProps)(ConfidentialityPopover)