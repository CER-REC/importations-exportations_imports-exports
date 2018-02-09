import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tr from '../TranslationTable'

import ElectricityMapLayout from './ElectricityMapLayout'

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

  render() {
    // Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    // TODO: scale map dynamically when screen size change
    return (<g transform={`translate(${this.props.left + 163} ${this.props.top + 82})`}>
      <g transform="translate(35 -15)">
        {this.powerpoolLabel()}
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
})

export default connect(mapStateToProps)(PowerPoolContainer)
