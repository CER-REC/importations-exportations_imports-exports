import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddLayout from '../PaddLayout'
import { PaddSelector } from '../../selectors/Padd'
import Constants from '../../Constants'

import { arrangeBy } from '../../selectors/data'
//TODO: need to move hard coded value to the constant file
const USPadd = (props) => {
  if(props.arrangeBy === 'location'){
    return <g transform="scale(1.1) translate(60 0)">
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {1}
      paddingX = {16}
      paddingY = {0.25}
      country='us'/>
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {2}
      paddingX = {13}
      paddingY = {0}
      country='us'/>
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {3}
      paddingX = {12.5}
      paddingY = {1}
      country='us'/>
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {4}
      paddingX = {10}
      paddingY = {0}
      country='us'/>
    <PaddLayout 
      left={props.left} 
      top = {props.top}
      paddGroup = {5}
      paddingX = {8}
      paddingY = {0}
      country='us'/>
    <PaddLayout   
      left={props.left} 
      top = {props.top}
      paddGroup = {6}
      paddingX = {8}
      paddingY = {0}
      country='us'/>
  </g>
  } else {
    return <g transform = {`scale(1.25) translate(${props.left} ${props.top})`}>
      <PaddLayout 
        left={props.left} 
        top = {props.top}
        paddingX = {0}
        paddingY = {0}
        country='us'/>
      </g>
  }
}

const mapStateToProps = (state, props) => ({
  arrangeBy: arrangeBy(state, props),
  Padd: PaddSelector(state, props),
})

module.exports = connect(mapStateToProps)(USPadd)
