import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'

import PopoverPortal from './PopoverPortal'
import ExplanationPopover from './ExplanationPopover'

import { ExpandCollapseExplanation } from '../actions/explanations'

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
      name: PropTypes.string.isRequired,
      expanded: PropTypes.bool.isRequired,
      onClick: PropTypes.func.isRequired,
    }
  }

  explanationDot() {
    return (<g 
      transform={`translate(${this.props.xPosition} ${this.props.yPosition})`}>
      <circle fill="#ff708a" cx={0} cy={0} r={Constants.getIn(['explanationDot', 'radiusStart'])}/>
      <g transform={this.props.expanded ? ' rotate(45)' : ''}>
        <g transform="translate(-5 -5)">
          <line fill="none" stroke="#fff" strokeWidth="0.75" strokeLinecap="round" strokeMiterlimit="10"
            x1="4.86" y1="1.95" x2="4.86" y2="7.77" />
          <line fill="none" stroke="#fff" strokeWidth="0.75" strokeLinecap="round" strokeMiterlimit="10"
            x1="7.77" y1="4.86" x2="1.95" y2="4.86" />
        </g>
      </g>
    </g>)
  }

  dotAnimation() {
    return (<g className="explanationDot" transform={`translate(${this.props.xPosition} ${this.props.yPosition})`}>
      <circle
        id="back"
        className="pulse"
        r={Constants.getIn(['explanationDot', 'radiusStart'])}
        cx={0}
        cy={0}
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
      {...handleInteraction(this.props.onClick, this.props.name)}>
      {this.dotAnimation()}
      {this.explanationDot()}
    </a>
    <PopoverPortal>
      <ExplanationPopover
        text={this.props.text}
        textBoxWidth={this.props.textBoxWidth}
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
        expanded={this.props.expanded}
      />
    </PopoverPortal>
    </g>)
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
  expanded: state.openExplanations.contains(props.name),
})

const mapDispatchToProps = {
  onClick: ExpandCollapseExplanation,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExplanationDot)
