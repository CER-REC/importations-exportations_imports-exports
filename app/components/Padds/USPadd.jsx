import React from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddLayout from '../PaddLayout'
import { PaddSelector, getSelectionSettings, getSubtype } from '../../selectors/Padd'
import Constants from '../../Constants'
import MapLayoutGridConstant from '../../MapLayoutGridConstant'
import DetailSidebar from '../DetailSidebar'
import DetailBreakdown from '../DetailBreakdown'
import Tr from '../../TranslationTable'

import { arrangeBy } from '../../selectors/data'
// TODO: need to move hard coded value to the constant file
const USPadd = (props) => {
  if (props.arrangeBy === 'location') {
    let paddList = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'], Immutable.fromJS({})).toArray()
    paddList = props.Padd.filter((value, key) => paddList.indexOf(key) >= 0)
    const padds = paddList.map((value, key) => (<PaddLayout
      key={`Padd_us_${key}`}
      left={props.left}
      top={props.top}
      paddGroup={key}
      paddingX={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'left'], 0)}
      paddingY={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'top'], 0)}
      country="us"
    />))
    return (<g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(-30 0)`}>
      {padds.toArray()}
      {renderDetailSidebar(props)}
    </g>)
  }
  return (<g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')})  translate(${props.left - 30} ${props.top + 50})`}>
    <PaddLayout
      left={props.left}
      top={props.top}
      paddingX={0}
      paddingY={0}
      country="us"
    />
    {renderDetailSidebar(props)}
  </g>)
}

const renderDetailBreakdown = (props) => {
  if(props.selection.get('origins').count() > 0 && props.selection.get('country') === 'ca' && props.selectedEnergy === 'naturalGasLiquids'){ return null}
  const detailBreakdownData = Constants.getIn(['detailBreakDown', 'us'])
  if (!detailBreakdownData.get('required', false)) { return null }
  let total ={}
  let nameMappings={}
  if(props.selectedEnergy === 'naturalGasLiquids'){
    total = props.Padd.reduce((acc, nextValue) => {
      if(props.selection.get('origins').count() > 0 
        && !props.selection.get('origins').includes(nextValue.get('destination'))) { return acc}
      const subType = nextValue.get('subType')
      if(!subType) {return acc}
      subType.forEach((subTypeVal, subTypeKey) => {
        if(props.subType !== '' && props.subType !== 'propaneButane' ){
          if(subTypeKey !== 'propaneButane' && subTypeKey === props.subType){
            if(!acc[subTypeKey]){
              acc[subTypeKey] = subTypeVal.get(detailBreakdownData.get('type'),0)
            } else {
              acc[subTypeKey] += subTypeVal.get(detailBreakdownData.get('type'),0)
            }
          }  
        } else {
          if(subTypeKey !== 'propaneButane'){
            if(!acc[subTypeKey]){
              acc[subTypeKey] = subTypeVal.get(detailBreakdownData.get('type'),0)
            } else {
              acc[subTypeKey] += subTypeVal.get(detailBreakdownData.get('type'),0)
            }
          }
        }
        
      })
      return acc
    }, {})
    nameMappings = Tr.getIn(['subType'])
  } else if(props.selectedEnergy === 'crudeOil'){
    if (!detailBreakdownData.get('required', false)) { return null }
    total = props.Padd.filter((point,key) => key!== 'ca').map(( value, paddId) => {
      if(props.selection.get('origins').count() > 0 && !props.selection.get('origins').includes('ca')){
        return props.selection.get('origins').includes(paddId) ? value.get('value'): 0
      }else{
        return value.get('value')
      }
      
    })
    nameMappings = Tr.getIn(['Padd','us'])
  } else {
    return null
  }
  return (<DetailBreakdown
      data={Immutable.fromJS(total).sort((a, b) => (b - a))}
      type={detailBreakdownData.get('type')}
      trContent={Tr.getIn(['detailBreakDown', props.selectedEnergy, detailBreakdownData.get('type')])}
      veritcalPosition={detailBreakdownData.get('displayPosition')}
      color={detailBreakdownData.get('color')}
      height={detailBreakdownData.get('height')}
      showDefault={detailBreakdownData.get('showDefault', false)}
      nameMappings={nameMappings}
      defaultContent=''
    />)
}

const renderDetailSidebar = (props) => {
  let top = props.top
  if(props.viewport.get('changeHeightRatio') > 1.2){
    top += 100
  }
  return (<DetailSidebar top={top} height={Constants.getIn(['detailBreakDown', 'us', 'height'], 0)}>
    {renderDetailBreakdown(props)}
  </DetailSidebar>)
}

const mapStateToProps = (state, props) => ({
  selectedEnergy: state.importExportVisualization,
  arrangeBy: arrangeBy(state, props),
  subType: getSubtype(state, props),
  Padd: PaddSelector(state, props),
  viewport: state.viewport,
  selection: getSelectionSettings(state, props),
})

module.exports = connect(mapStateToProps)(USPadd)
