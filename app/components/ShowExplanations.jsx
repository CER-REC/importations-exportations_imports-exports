import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import TrSelector from '../selectors/translate'

import ShowExplanationsCreator from '../actionCreators/ShowExplanationsCreator'
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
    const yaxis = WorkspaceComputations.showExplanationsY()
    let triangleLineColor = '#666666'
    if (this.props.showExplanations) {
      triangleLineColor = '#ff708a'
    }
    return (
      <svg
        x={0}
        y={yaxis - Constants.getIn(['showExplanations', 'triangleLineYOffset'])}
      >
        <g>
          <polyline fill={triangleLineColor} points="0 8 0 0 9.1 8.1 0 8.1" />
          <line
            stroke={triangleLineColor}
            x1="0.5"
            y1={Constants.getIn(['showExplanations', 'triangleLineY'])}
            x2={Constants.getIn(['showExplanations', 'triangleLineWidth'])}
            y2={Constants.getIn(['showExplanations', 'triangleLineY'])}
          />
        </g>
      </svg>
    )
  }

  showText() {
    const { Tr } = this.props
    const yaxis = WorkspaceComputations.showExplanationsY()

    let textColour = '#999999'
    let explanationsText = Tr('explanationShown')
    if (this.props.showExplanations) {
      textColour = '#ff708a'
      explanationsText = Tr('explanationHide')
    }

    return (
      <text
        x={Constants.getIn(['showExplanations', 'labelOffset'])}
        y={yaxis}
        className="showHideExplanations"
        fill={textColour}
      >
        {explanationsText}
      </text>
    )
  }

  render() {
    return (
      <g
        transform="translate(0 80)"
        role="menuitem"
        {...handleInteraction(this.props.onClick)}
      >
        {this.showText()}
        {this.triangleLine()}
      </g>
    )
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  showExplanations: state.showExplanations,
  Tr: TrSelector(state, props),
})

const mapDispatchToProps = {
  onClick: ShowExplanationsCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowExplanations)
