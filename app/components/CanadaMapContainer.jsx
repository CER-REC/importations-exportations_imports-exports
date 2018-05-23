import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ElectricityMapLayout from './ElectricityMapLayout'

const CanadaMapContainer = props => (
  // Scale is temporary adjustment as it's too small if we use dimensions
  // mentioned in the design document
  // TODO: scale map dynamically when screen size change
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(${props.left} ${props.top})`}>
    <ElectricityMapLayout
      left={props.left}
      top={props.top}
      country="ca"
      valueAverage={props.valueAverage}
    />
  </g>
)

CanadaMapContainer.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})

export default connect(mapStateToProps)(CanadaMapContainer)
