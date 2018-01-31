import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import ExplanationLine from './ExplanationLine'

const ExplanationSummonedCreator = require('../actionCreators/ExplanationSummonedCreator.js')

import './ExplanationDot.scss'

class ExplanationDot extends React.Component {
  static get propTypes() {
    return {
      xPosition: PropTypes.number.isRequired,
      yPosition: PropTypes.number.isRequired,
      showExplanations: PropTypes.bool.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.onClick = this.explanationDotClick.bind(this)
  }

  explanationDotClick(e) {
    e.stopPropagation()
    console.log('explanation dot clicked', this)
  }

  explanationDot() {
    return (<g id="circle">
      <circle
      cx={this.props.xPosition}
      cy={this.props.yPosition}
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      fill="#ff708a"/></g>)
  }

  dotAnimation() {
    return (<g id="pulse">
      <circle
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      cx={this.props.xPosition}
      cy={this.props.yPosition}
      /></g>)
  }

  drawLine() {
    console.log(this.props)
    return <ExplanationLine
    x={this.props.xCoord}
    y={this.props.yCoord}/>
  }

  render() {
    if (!this.props.showExplanations) {
      return null
    }
    return (<g><g onClick={this.onClick}>
      {this.explanationDot()}
      {this.dotAnimation()}
    </g>
    {this.drawLine()}</g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
  explanation: state.explanation,
})

module.exports = connect(mapStateToProps)(ExplanationDot)
