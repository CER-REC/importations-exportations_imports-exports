import React from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddLayout from '../PaddLayout'
import { PaddSelector } from '../../selectors/Padd'
import Constants from '../../Constants'
import MapLayoutGridConstant from '../../MapLayoutGridConstant'

import { arrangeBy } from '../../selectors/data'
//TODO: need to move hard coded value to the constant file
const USPadd = (props) => {
  if(props.arrangeBy === 'location'){
    let paddList = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'], Immutable.fromJS({})).toArray()
    paddList = props.Padd.filter((value, key) => {  return paddList.indexOf(key) >= 0})
    const padds = paddList.map((value, key) => {
        return  <PaddLayout 
        key={`Padd_us_${key}`}
        left={props.left} 
        top = {props.top}
        paddGroup = {key}
        paddingX = {MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'left'], 0)}
        paddingY = {MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'top'], 0)}
        country='us'/>
      })
    return <g transform="scale(1.1) translate(60 0)">
    {padds.toArray()}
    </g>
  } else {
    return <g transform = {`scale(1.25) translate(${props.left - 30} ${props.top})`}>
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
