import React from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddLayout from '../PaddLayout'
import { PaddSelector } from '../../selectors/Padd'
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
    return (<g transform="scale(1.3)">
      {padds.toArray()}
      {renderDetailSidebar(props)}
    </g>)
  }
  return (<g transform={`scale(1.25) translate(${props.left - 20} ${props.top})`}>
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
  const detailBreakdownData = Constants.getIn(['detailBreakDown', 'us'])
  if (!detailBreakdownData.get('required', false)) { return null }
  let total ={}
  let nameMappings={}
  if(props.importExportVisualization === 'naturalGasLiquids'){
    total = props.Padd.reduce((acc, nextValue) => {
      const subType = nextValue.get('subType')
      subType.forEach((subTypeVal, subTypeKey) => {
        if(subTypeKey !== 'propaneButane'){
          if(!acc[subTypeKey]){
            acc[subTypeKey] = subTypeVal.get(detailBreakdownData.get('type'),0)
          } else {
            acc[subTypeKey] += subTypeVal.get(detailBreakdownData.get('type'),0)
          }
        }
      })
      return acc
    }, {Butane: 0 , Propane: 0})
    nameMappings = Tr.getIn(['subType'])
  } else if(props.importExportVisualization === 'crudeOil'){
    if (!detailBreakdownData.get('required', false)) { return null }
    total = props.Padd.filter((point,key) => key!== 'ca').map(( value, paddId) => {
      return value.get('value')
    })
    nameMappings = Tr.getIn(['Padd',props.country])
  } else {
    return null
  }
  return (<DetailBreakdown
      data={Immutable.fromJS(total)}
      type={detailBreakdownData.get('type')}
      trContent={Tr.getIn(['detailBreakDown', props.importExportVisualization, detailBreakdownData.get('type')])}
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
  if(props.importExportVisualization === 'crudeOil'){
    top += 100
  }
  return (<DetailSidebar top={top} height={Constants.getIn(['detailBreakDown', 'us', 'height'], 0)}>
    {renderDetailBreakdown(props)}
  </DetailSidebar>)
}

const mapStateToProps = (state, props) => ({
  importExportVisualization: state.importExportVisualization,
  arrangeBy: arrangeBy(state, props),
  Padd: PaddSelector(state, props),
})

module.exports = connect(mapStateToProps)(USPadd)
