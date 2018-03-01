import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import TrSelector from '../selectors/translate'
import { confidentialityTogglePosition } from '../selectors/viewport/menus'
import { ToggleConfidentialityMenu } from '../actions/confidentialityMenu'
import { handleInteractionWithTabIndex } from '../utilities'

import ExplanationDot from './ExplanationDot'

import '../styles/Fonts.scss'

const triangleLine = (
  <g transform="translate(0 -3)">
    <polyline fill="black" points="0 8 0 0 9.1 8.1 0 8.1" />
    <line stroke="black" x1="0.5" y1="7.6" x2="180" y2="7.6" />
  </g>
)

class ShowConfidentiality extends React.Component {
  static get propTypes() {
    return {
      Tr: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      confidentialityMenu: PropTypes.bool.isRequired,
    }
  }

  icon() {
    return <g transform="translate(11 -12) scale(0.84)" className="confidentialityIcon">
      <path
        fill='#fff'
        stroke='#999'
        d="M7.83.5A7.33,7.33,0,1,1,.5,7.83,7.33,7.33,0,0,1,7.83.5Z"
      />
      <path
        fill='#999'
        d="M8.65,10.58A1.14,1.14,0,0,1,9,11.4a1.17,1.17,0,0,1-.32.83,1.08,1.08,0,0,1-.83.34A1.11,1.11,0,0,1,7,12.23a1.16,1.16,0,0,1-.33-.83A1.14,1.14,0,0,1,7,10.58a1.11,1.11,0,0,1,.83-.34A1.09,1.09,0,0,1,8.65,10.58ZM8.9,3.18,8.62,9H7L6.75,3.18Z"
      />
    </g>
  }

  showText() {
    const { Tr } = this.props
    let sign = '+'
    const confidentialityText = Tr('confidentialityShown')
    if (this.props.confidentialityMenu) {
      sign = '-'
    }
    return (
      <text
        x={27}
        y={0}
        className="showHideConfidentiality"
        fill="#999"
      >
        {confidentialityText}
        <tspan dx="8">
          {sign}
        </tspan>
      </text>
    )
  }

  confidentialityExplanation() {
    if (this.props.energyType !== 'electricity') { return }
    return (<g>
      <ExplanationDot
        scale="scale(0.3)"
        lineStroke="1.8"
        textBoxWidth={130}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H615.2"
        xPosition={150}
        yPosition={-5}
        lineX={142.16}
        lineY={173.94}
        textX={10}
        textY={20}
        containerX={this.props.left + 2}
        containerY={this.props.top}
        text={`${this.props.Tr(['explanations','confidentiality'])}`}
        name="confidentialityExplanation"
    /></g>)
  }

  render() {
    const tabIndex = Constants.getIn(['tabIndex','start', 'menuBar'])
    return (
      <g
        transform={`translate(${this.props.left} ${this.props.top})`}
        role="menuitem"
        {...handleInteractionWithTabIndex(tabIndex, this.props.onClick)}
      >
        {this.icon()}
        {this.showText()}
        {triangleLine}
        {this.confidentialityExplanation()}
      </g>
    )
  }
}

const mapStateToProps = (state, props) => ({
  Tr: TrSelector(state, props),
  energyType: state.importExportVisualization,
  confidentialityMenu: state.confidentialityMenu,
  ...confidentialityTogglePosition(state, props),
})

const mapDispatchToProps = {
  onClick: ToggleConfidentialityMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowConfidentiality)
