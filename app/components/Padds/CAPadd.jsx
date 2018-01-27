import React from 'react'
import ReactRedux from 'react-redux'
import PropTypes from 'prop-types'

import PaddLayout from '../PaddLayout'

//fetch x axis of the padd using the left detail side bar location
const CAPadd = props => (
  <g transform = {` scale(1.5) translate(${props.left -50} ${props.top -200})`}>
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {1}
      color='pink'
      paddingX = {15}
      paddingY = {0}
      country='ca'/>
  </g>
)


module.exports = CAPadd
