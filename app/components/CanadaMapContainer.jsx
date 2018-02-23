import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import ElectricityMapLayout from './ElectricityMapLayout'

const detailBreakDownData = Immutable.fromJS({
  WA: 9589756,
  VA: 465467,
  ID: 4678971,
  OR: 5548646,
})

const CanadaMapContainer = props => (
  // Scale is temporary adjustment as it's too small if we use dimensions
  // mentioned in the design document
  // TODO: scale map dynamically when screen size change
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(${props.left} ${props.top})`}>
    <ElectricityMapLayout
      left={props.left}
      top={props.top}
      detailBreakDownData={detailBreakDownData}
      country="ca"
    />
  </g>
  //transform={}
)

CanadaMapContainer.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
})


export default connect(mapStateToProps)(CanadaMapContainer)
