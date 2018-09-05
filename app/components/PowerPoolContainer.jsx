import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tr from '../TranslationTable'

import ElectricityMapLayout from './ElectricityMapLayout'
import TrSelector from '../selectors/translate'
import ExplanationDot from './ExplanationDot'

class PowerPoolContainer extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }

  powerpoolLabel() {
    const powerPoolText = (
      <text className="powerPoolLabel" >
        {Tr.getIn(['country', 'powerpool', 'powerPools', this.props.language])}
      </text>)
    const positionedPowerPoolText = (this.props.language !== 'en') ? (
      <g transform="translate(2.5 0)">
        {powerPoolText}
      </g>) : (
        <g transform="translate(25 0)">
          {powerPoolText}
        </g>
    )
    return positionedPowerPoolText
  }

  powerpoolExplanation() {
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -7 : -42
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -40 : -30
    return (
      <g>
        <ExplanationDot
          scale="scale(1 -1) translate(0 -100)"
          lineStroke="1"
          textBoxWidth={200}
          linePath="
            M142.16,
            173.94l24.26,
            36.69a40.12,
            40.12,0,0,0,
            33.47,
            18H388.2"
          xPosition={80}
          yPosition={-12}
          lineX={142.16}
          lineY={173.94}
          textX={45}
          textY={48}
          containerX={this.props.viewport.get('changeWidthRatio') * (this.props.top + scaleContainerX) - 45}
          containerY={this.props.viewport.get('changeHeightRatio') * (this.props.left + scaleContainerY)}
          text={`${Tr.getIn(['explanations', 'powerpool', this.props.language])}`}
          name="powerpoolExplanation"
        />
      </g>)
  }

  render() {
    // Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    // TODO: scale map dynamically when screen size change
    return (
      <g transform={
      `scale(${this.props.viewport.get('changeWidthRatio')} ${this.props.viewport.get('changeHeightRatio')}) 
      translate(${this.props.left} ${this.props.top})`}
      >
        <g transform="translate(0 -15)">
          {this.powerpoolLabel()}
          {this.powerpoolExplanation()}
        </g>
        <ElectricityMapLayout
          left={this.props.left}
          top={this.props.top}
          country="powerpool"
        />
      </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  Tr: state.TrSelector,
})

export default connect(mapStateToProps)(PowerPoolContainer)
