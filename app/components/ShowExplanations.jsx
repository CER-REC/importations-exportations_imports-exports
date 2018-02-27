import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import TrSelector from '../selectors/translate'
import { explanationTogglePosition } from '../selectors/viewport/menus'

import ToggleExplanation from '../actionCreators/ShowExplanationsCreator'
import WorkspaceComputations from '../computations/WorkspaceComputations'
import { handleInteraction } from '../utilities'

import '../styles/Fonts.scss'


class ShowExplanations extends React.Component {
  static get propTypes() {
    return {
      onClick: PropTypes.func.isRequired,
      showExplanations: PropTypes.bool.isRequired,
      Tr: PropTypes.func.isRequired,
    }
  }

  triangleLine() {
    let triangleLineColor = '#666666'
    if (this.props.showExplanations) {
      triangleLineColor = '#ff708a'
    }
    return (
      <g transform="translate(0 -3)">
        <polyline fill={triangleLineColor} points="0 8 0 0 9.1 8.1 0 8.1" />
        <line
          stroke={triangleLineColor}
          x1="0.5"
          y1={Constants.getIn(['showExplanations', 'triangleLineY'])}
          x2={Constants.getIn(['showExplanations', 'triangleLineWidth'])}
          y2={Constants.getIn(['showExplanations', 'triangleLineY'])}
        />
      </g>
    )
  }

  dot() {
    return <circle
      cx={Constants.getIn(['showExplanations', 'labelOffset']) + 4}
      cy={-5}
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      fill="#ff708a"
    />
  }

  showText() {
    const { Tr } = this.props

    let sign='+'
    let textColour = '#999999'
    const explanationsText = Tr('explanationShown')
    if (this.props.showExplanations) {
      textColour = '#ff708a'
      sign='-'
    }

    return (
      <text
        x={Constants.getIn(['showExplanations', 'labelOffset']) + 14}
        y={0}
        className="showHideExplanations"
        fill={textColour}
      >
        {explanationsText} <tspan dx="6">{sign}</tspan>
      </text>
    )
  }

  render() {
    return (
      <g
        transform={`translate(${this.props.left} ${this.props.top})`}
        role="menuitem"
        {...handleInteraction(this.props.onClick)}
      >
        {this.dot()}
        {this.showText()}
        {this.triangleLine()}
      </g>
    )
  }
}

const mapStateToProps = (state, props) => ({
  showExplanations: state.showExplanations,
  Tr: TrSelector(state, props),
  ...explanationTogglePosition(state, props),
})

const mapDispatchToProps = {
  onClick: ToggleExplanation,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowExplanations)
