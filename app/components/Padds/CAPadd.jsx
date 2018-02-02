import React from 'react'
import ReactRedux from 'react-redux'
import PropTypes from 'prop-types'

import PaddLayout from '../PaddLayout'

// fetch x axis of the padd using the left detail side bar location
const CAPadd = props => (
  <g transform="scale(1.5)">
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


module.exports = CAPadd
