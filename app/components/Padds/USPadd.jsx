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
    const paddList = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'])
    const padds = paddList.map(key => (<PaddLayout
      key={`Padd_us_${key}`}
      left={props.left}
      top={props.top}
      paddGroup={key}
      paddingX={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'left'], 0)}
      paddingY={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'top'], 0)}
      country="us"
      aggregateKey={props.aggregateKey}
      valueKey={props.valueKey}
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
      aggregateKey={props.aggregateKey}
      valueKey={props.valueKey}
    />
    {renderDetailSidebar(props)}
  </g>)
}

const renderDetailBreakdown = (props) => {
  if(props.selection.get('origins').count() > 0 && props.selection.get('country') === 'ca' && props.selectedEnergy === 'naturalGasLiquids'){ return null}
  const detailBreakdownData = Constants.getIn(['detailBreakDown', 'us'])
  if (!detailBreakdownData.get('required', false)) { return null }
  let nameMappings = {}
  if (props.selectedEnergy === 'naturalGasLiquids') {
    nameMappings = Tr.getIn(['subType'])
  } else if (props.selectedEnergy === 'crudeOil') {
    if (!detailBreakdownData.get('required', false)) { return null }
    nameMappings = Tr.getIn(['Padd','us'])
  } else {
    return null
  }
  return (
    <DetailBreakdown
      aggregateKey="destination"
      valueKey="exports"
      country="us"
      subtype={props.subType}
      type={detailBreakdownData.get('type')}
      trContent={Tr.getIn(['detailBreakDown', props.selectedEnergy, detailBreakdownData.get('type')])}
      veritcalPosition={detailBreakdownData.get('displayPosition')}
      color={detailBreakdownData.get('color')}
      height={detailBreakdownData.get('height')}
      showDefault={detailBreakdownData.get('showDefault', false)}
      nameMappings={nameMappings}
      defaultContent=''
    />
  )
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
