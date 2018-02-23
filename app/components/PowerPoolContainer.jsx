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
    return (<text
      className="powerPoolLabel">
      {Tr.getIn(['country', 'powerpool', 'powerPools', this.props.language])}
    </text>)
  }

  powerpoolExplanation() {
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
          18H535.2"
        xPosition={78}
        yPosition={-12}
        lineX={142.16}
        lineY={173.94}
        textX={10}
        textY={17}
        containerX={this.props.left + 32}
        containerY={this.props.top - 15}
        text={`${Tr.getIn(['explanations','powerpool', this.props.language])}`}
        name="powerpoolExplanation"
    /></g>)
  }

  render() {
    // Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    // TODO: scale map dynamically when screen size change
    return (<g transform={`translate(${this.props.left} ${this.props.top})`}>
      <g transform="translate(35 -15)">
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
