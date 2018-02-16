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
    const imageSource = 'images/explanations_plus.svg'
    return (<g id="circle">
      <image
        className="pulse"
        xlinkHref={imageSource}
        x={this.props.xPosition - 5}
        y={this.props.yPosition - 5}
        height={Constants.getIn(['explanationDot', 'radiusStart']) * 2}
        width={Constants.getIn(['explanationDot', 'radiusStart']) * 2}
      />
      </g>)
  }

  dotAnimation() {
    return (<g className="explanationDot">
      <circle
        id="back"
        className="pulse"
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        fill="#ff708a">
        </circle>
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
      {this.explanationDot()}
    </a>
    <PopoverPortal>
      <ExplanationPopover
        text={this.props.text}
        textBoxWidth={this.props.textBoxWidth}
        textBoxHeight={this.props.textBoxHeight}
        scale={this.props.scale}
        lineStroke={this.props.lineStroke}
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
