import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import PopoverPortal from './PopoverPortal'

class ExplanationPopover extends React.Component {
  static get propTypes() {
    return {
      text: PropTypes.string.isRequired,
      lineX: PropTypes.number.isRequired,
      lineY: PropTypes.number.isRequired,
      linePath: PropTypes.string.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      expanded: PropTypes.bool.isRequired,
    }
  }

  drawLine() {
    const transformString = `translate(${-this.props.lineX} ${-this.props.lineY})`
    const transformLine = `${this.props.linePath}`
    const scaleLine = `${this.props.scale}`
    const strokeWidth = `${this.props.lineStroke}`

    return (<svg>
      <g transform={`${scaleLine} ${transformString}`}>
        <path d={transformLine} stroke="#ff708a" strokeWidth={strokeWidth} fill="transparent" />
      </g>
    </svg>)
  }

  drawText() {
    const text = this.props.text
    if (text.includes('\n')) {
      let splitText = text.split('\n')
      splitText = splitText.map(text => <span key={text}>{text}<br /></span>)
      return (<div
        style={{
        position: 'relative',
        top: this.props.textY - 3,
        left: this.props.textX,
        padding: 8,
        height: 'auto',
        width: this.props.textBoxWidth,
        background: 'white',
        opacity: '0.9',
      }}
        className="explanationText"
      >{splitText}
              </div>)
    }
    return (<div
      style={{
          position: 'relative',
          top: this.props.textY - 3,
          left: this.props.textX,
          padding: 8,
          height: 'auto',
          width: this.props.textBoxWidth,
          background: 'white',
          opacity: '0.9',
        }}
      className="explanationText"
    >
      {text}
      {/*
        <svg>
          <g transform={`translate(${this.props.textBoxWidth - 40} 2)`}>
            <polyline
              fill="none"
              stroke="#ff708a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.75"
              points="11.38 8.59 15.36 4.48 11.38 0.38"/>
            <polyline
              fill="none"
              stroke="#ff708a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.75"
              points="4.36 0.38 0.38 4.48 4.36 8.59"/>
          </g>
        </svg>
        */}
            </div>)
  }

  render() {
    if (!this.props.expanded) { return null }
    return (<div style={{
          position: 'absolute',
          top: this.props.containerY + this.props.yPosition,
          left: this.props.containerX + this.props.xPosition,
        }}
    >
      {this.drawText()}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>{this.drawLine()}</div>
            </div>)
  }
}

export default ExplanationPopover
