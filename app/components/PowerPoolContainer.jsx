import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ElectricityMapLayout from './ElectricityMapLayout'

class PowerPoolContainer extends React.Component {
  powerpoolLabel() {
    return (<text 
      className="powerPoolLabel"
      >
      Power Pools
    </text>)
  }

  render() {
    // Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    // TODO: scale map dynamically when screen size change
    return (<g transform={`translate(${this.props.left + 163} ${this.props.top + 82})`}>
      <g transform='translate(35 -15)'>
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
})

export default connect(mapStateToProps)(PowerPoolContainer)
