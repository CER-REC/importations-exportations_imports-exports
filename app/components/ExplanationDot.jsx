import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'

import PopoverPortal from './PopoverPortal'
import ExplanationPopover from './ExplanationPopover'

import ToggleExplanation from '../actions/explanations'

import { handleInteraction } from '../utilities'

import './ExplanationDot.scss'

class ExplanationDot extends React.Component {
  static get propTypes() {
    return {
      explanation: PropTypes.bool.isRequired,
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

  explanationDot() {
    return (<g id="circle">
      <circle
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        fill="#ff708a"/>
        {this.sign()}
      </g>)
  }

  sign() {
    const sign = '+'
    return (<g>
      <text 
        x={this.props.xPosition - 3}
        y={this.props.yPosition + 5}
        className="showHideExplanations"
        fill="white">
      {sign}
      </text></g>)
  }

  dotAnimation() {
    return (<g><defs>
      <circle
        id="back"
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        fill="#ff708a"
      >
        <animate
          attributeName="r"
          from={Constants.getIn(['explanationDot' , 'radiusStart'])}
          to={Constants.getIn(['explanationDot' , 'radiusEnd'])}
          dur="1.5s"
          begin="0"
          repeatCount="3"
          fill="freeze"
          id="circ-anim"
        />
        <animate
          attributeName="opacity"
          from="0.7"
          to="0"
          dur="1.5s"
          begin="0"
          repeatCount="3"
          fill="freeze"
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
    return (<g><a 
      role="menuItem"
      {...handleInteraction(this.props.onClick)}>
      {this.dotAnimation()}
    </a>
      <use x={this.props.xPosition + 6} y={this.props.yPosition} xlinkHref="#back"/>
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

const mapDispatchToProps = {
  onClick: ToggleExplanation,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationDot)
