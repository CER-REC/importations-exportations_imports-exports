import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import NaturalGasLiquidMapLayout from './NaturalGasLiquidMapLayout'

const detailBreakDownData = Immutable.fromJS({
  WA: 9589756,
  VA: 465467,
  ID: 4678971,
  OR: 5548646,
})

const NaturalGasCanadaMapContainer = props => (
  // Scale is temporary adjustment as it's too small if we use dimensions
  // mentioned in the design document
  // TODO: scale map dynamically when screen size change
  <g transform={`translate(${props.left + 100} ${props.top})`}>
    <NaturalGasLiquidMapLayout
      left={props.left}
      top={props.top}
      country="ca"
    />
  </g>
)

NaturalGasCanadaMapContainer.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})


export default connect(mapStateToProps)(NaturalGasCanadaMapContainer)
