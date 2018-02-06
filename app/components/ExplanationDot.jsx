import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'

import PopoverPortal from './PopoverPortal'
import ExplanationPopover from './ExplanationPopover'

import { handleInteraction } from '../utilities'
import './ExplanationDot.scss'

class ExplanationDot extends React.Component {
  static get propTypes() {
    return {
      xPosition: PropTypes.number.isRequired,
      yPosition: PropTypes.number.isRequired,
      showExplanations: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
      lineX: PropTypes.number.isRequired,
      lineY: PropTypes.number.isRequired,
      linePath: PropTypes.string.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      containerX: PropTypes.number.isRequired,
      containerY: PropTypes.number.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.state = { explanations: false }
    this.explanationShowClick = this.explanationShowClick.bind(this)
    this.explanationHideClick = this.explanationHideClick.bind(this)
  }

  explanationShowClick(e) {
    e.stopPropagation()
    this.setState({ explanations: true })
  }

  explanationHideClick(e) {
    e.stopPropagation()
    this.setState({ explanations: false })
  }

  explanationDot() {
    return (<g id="circle">
      <circle
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        fill="#ff708a"
      />
      </g>)
  }

  dotAnimation() {
    return (<g><defs>
      <circle id="back"
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        fill="#ff708a">
        <animate
          attributeName='r'
          from={Constants.getIn(['explanationDot','radiusStart'])}
          to={Constants.getIn(['explanationDot','radiusEnd'])}
          dur='1.5s'
          begin='0'
          repeatCount='indefinite'
          fill='freeze'
          id="circ-anim"
        />
        <animate
          attributeName='opacity'
          from='0.7'
          to='0'
          dur='1.5s'
          begin='0'
          repeatCount='indefinite' 
          fill='freeze'
          id="circ-anim"
        />
        </circle>
      </defs>
      {this.explanationDot()}
    </g>)
  }

  render() {
    if (!this.props.showExplanations) {
      return null
    }
    return (<g><g onClick={this.onClick}>
      {this.dotAnimation()}
    </g><use x = {this.props.xPosition + 6} y={this.props.yPosition} xlinkHref="#back"/>
    <PopoverPortal>
      <ExplanationPopover
        text={this.props.text}
        linePath={this.props.linePath}
        lineX={this.props.lineX}
        lineY={this.props.lineY}
        textX={this.props.textX}
        textY={this.props.textY}
        containerX={this.props.containerX}
        containerY={this.props.containerY}
        xPosition={this.props.xPosition}
        yPosition={this.props.yPosition}
      />
    </PopoverPortal>
    </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
  explanation: state.explanation,
})

export default connect(mapStateToProps)(ExplanationDot)
