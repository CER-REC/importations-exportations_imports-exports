import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapLayoutGridConstant from '../MapLayoutGridConstant'

class PowerPoolGrouping extends React.Component {
  render() {
    // Mock data need to be replaced by actual content
    return (<g>
      <text x={this.props.xaxis} y={this.props.yaxis} />
            </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})


module.exports = connect(mapStateToProps)(PowerPoolGrouping)
