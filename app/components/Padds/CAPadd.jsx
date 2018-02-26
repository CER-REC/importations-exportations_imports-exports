import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PaddLayout from '../PaddLayout'

// fetch x axis of the padd using the left detail side bar location
const CAPadd = props => (
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(53 0)`}>
    <PaddLayout
      left={props.left}
      top={props.top}
      width={props.width}
      height={props.height}
      paddGroup="ca"
      paddingX={15}
      paddingY={0}
      country="ca"
    />
  </g>
)

const mapStateToProps = state => ({
  viewport: state.viewport,

})


export default connect(mapStateToProps)(CAPadd)
