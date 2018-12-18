import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import TrSelector from '../selectors/translate'
import { explanationTogglePosition } from '../selectors/viewport/menus'

import ToggleExplanation from '../actions/ShowExplanationsCreator'
import WorkspaceComputations from '../computations/WorkspaceComputations'
import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'

import '../styles/Fonts.scss'


class ShowExplanations extends React.Component {

  static get propTypes() {
    return {
      onClick: PropTypes.func.isRequired,
      showExplanations: PropTypes.bool.isRequired,
      Tr: PropTypes.func.isRequired,
    }
  }

  dot() {
    return (<circle
      cx={Constants.getIn(['showExplanations', 'labelOffset']) - 6}
      cy={-5}
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      fill="#ff708a"
    />)
  }

  showAnalyticsAndExplanationToggle = () => {
    const eventDetail = 'Explanation Toggle'
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'explanations']),
      Constants.getIn(['analytics', 'action', 'clicked']),
      eventDetail,
    )
    this.props.onClick()
  }

  showText() {
    const { Tr } = this.props

    let sign = '+'
    let textColour = '#999999'
    const explanationsText = Tr('explanationShown')
    if (this.props.showExplanations) {
      textColour = '#ff708a'
      sign = '-'
    }

    return (
      <text
        x={Constants.getIn(['showExplanations', 'labelOffset']) + 4}
        y={0}
        className="showHideExplanations"
        fill={textColour}
      >
        {explanationsText} <tspan dx="3">{sign}</tspan>
      </text>
    )
  }

  render() {
    const tabIndex = Constants.getIn(['tabIndex', 'start', 'menuBar'])
    return (
      <g
        transform={`translate(${this.props.left} ${this.props.top})`}
        role="menuitem"
        {...handleInteractionWithTabIndex(tabIndex, this.showAnalyticsAndExplanationToggle)}
      >
        {this.dot()}
        {this.showText()}
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
