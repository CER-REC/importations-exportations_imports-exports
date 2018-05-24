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
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      xPosition: PropTypes.number.isRequired,
      yPosition: PropTypes.number.isRequired,
      expanded: PropTypes.bool.isRequired,
    }
  }

  drawText() {
    return (<div
      style={{
          position: 'relative',
          top: this.props.textY,
          left: this.props.textX,
          height: 'auto',
          width: 160,
          background: 'white',
          border: '#999 0.25px solid',
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
    </div>)
  }
}

export default ConfidentialityPopover
