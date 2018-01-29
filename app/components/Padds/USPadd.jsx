import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddOne from './PaddOne'
import PaddTwo from './PaddTwo'
import PaddThree from './PaddThree'
import PaddFour from './PaddFour'
import PaddFive from './PaddFive'
import PaddLayout from '../PaddLayout'

//fetch x axis of the padd using the left detail side bar location
/*
<g transform = {`scale(4) translate(${props.left/4} ${props.top/4})`}>
    <g transform={`translate(${props.left} 0)`}> 
      <PaddOne color="red" arrowLabel="Padd1"/>
    </g> 
    
    <g transform={`translate(${props.left - 60} 6)`}> 
      <PaddTwo color="blue" arrowLabel="Padd2"/>
    </g>

    <g transform={`translate(${props.left - 48} 45)`}> 
      <PaddThree color="black" arrowLabel="Padd3"/>
    </g>

    <g transform={`translate(${props.left - 85} 5)`}> 
      <PaddFour color="orange" arrowLabel="Padd4"/>
    </g>

    <g transform={`translate(${props.left - 101}  6)`}> 
      <PaddFive color="blue" arrowLabel="Padd5"/>
    </g>
  </g>
 */
const USPadd = props => {
  return <g transform = {`translate(${props.left - 400} ${props.top - 100})`}>
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
  </g>
}

module.exports = USPadd
