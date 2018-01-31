import React from 'react'
const ReactRedux = require('react-redux')
import PropTypes from 'prop-types'

import Constants from '../Constants'
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')

import ExplanationPopoverCreator from '../actions/explanations'

class ExplanationText extends React.Component {

  mainNavText() {
    return <div style={{
          position: 'absolute',
          top: 220,
          left: 140,
          height: 'auto',
          width: 100,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','electricity','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','electricity','text',this.props.language])}
    </div>
  }

  playButtonText() {
    return <div style={{
          position: 'absolute',
          top: 525,
          left: 20,
          height: 'auto',
          width: 70,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','playButton','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','playButton','text',this.props.language])}
    </div>
  }

  timeSeekText() {
    return <div style={{
          position: 'absolute',
          top: 515,
          left: 230,
          height: 'auto',
          width: 60,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','timeSeek','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','timeSeek','text',this.props.language])}
    </div>
  }

  importExportText() {
    return <div style={{
          position: 'absolute',
          top: 175,
          left: 210,
          height: 'auto',
          width: 80,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','importExportTitle','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','importExportTitle','text',this.props.language])}
    </div>
  }

  newYorkText() {
    return <div style={{
          position: 'absolute',
          top: 765,
          left: 665,
          height: 'auto',
          width: 60,
          background: 'white',
          opacity: '0.9',
        }} className = 'explanationText'>
      <strong>{Tr.getIn(['explanations','newYork','bolded',this.props.language])}</strong>
      {Tr.getIn(['explanations','newYork','text',this.props.language])}
    </div>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    }
    return <div>
      {this.mainNavText()}
      {this.playButtonText()}
      {this.timeSeekText()}
      {this.importExportText()}
      {this.newYorkText()}
    </div>
  }
}


const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
})

module.exports = ReactRedux.connect(mapStateToProps)(ExplanationText)