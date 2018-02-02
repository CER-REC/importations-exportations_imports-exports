import React from 'react'
const ReactRedux = require('react-redux')
import PropTypes from 'prop-types'

import Constants from '../Constants'
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')

import ExplanationPopoverCreator from '../actions/explanations'

class ExplanationPopover extends React.Component {

  drawLine() {
    return <svg>
      <g transform =' scale(0.3)'>
        <path d="M89,67 C87,286 352,236 444,245"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
      </g></svg>
    }

  drawText() {
    return <div style={{
          position: 'absolute',
          top: 120,
          left: 120,
          height: 'auto',
          width: 80,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      {this.props.text}
    </div>
    /*
    return <div style={{
          height: 'auto',
          width: 80,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','importExportTitle','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','importExportTitle','text',this.props.language])}
    </div>
    */
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    }
    return <div style={{
          position: 'absolute',
          top: 105,
          left: 120,
        }}>
      {this.drawText()}
      <g >{this.drawLine()}</g>
    </div>
  }
}


const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
})

module.exports = ReactRedux.connect(mapStateToProps)(ExplanationPopover)