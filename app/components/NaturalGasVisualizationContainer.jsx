import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'


import BarChart from './BarChart'
import Axis from './Axis'
import PortMap from './PortMap'
import DetailSidebar from './DetailSidebar'
import NaturalGasMapContainer from './NaturalGasMapContainer'
import * as NaturalGasViewport from '../selectors/viewport/naturalGas'

import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
/*import NaturalGasPieceActivityExplanation from './NaturalGasPieceActivityExplanation'*/
import Constants from '../Constants'
// import {legendMapPosition} from '../selectors/viewport/menus'

const NaturalGasVisualizationContainer = props => (
  <g>
    {!props.showImports ? null : (
      <BarChart
        {...props.importChart}
        valueKey="activity"
        activityValueKey="imports"
        groupBy="period"
        colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
    )}
    <Axis
      {...props.axisPosition}
      barWidth={4}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])} 
    />
    {!props.showExports ? null : (
      <BarChart
        {...props.exportChart}
        valueKey="activity"
        activityValueKey="exports"
        groupBy="period"
        flipped
        colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
    )}
    <NaturalGasMapContainer {...props.mapTiles} />
    <DetailSidebar {...props.portMap} ><PortMap {...props.portMap} /></DetailSidebar>
    {/*
    <NaturalGasPieceActivityExplanation
      {...props.mapPieceActivityExplanation}
    />
    */}
  </g>
)

export default connect((state, props) => ({
  importChart: NaturalGasViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasViewport.chartExportPosition(state, props),
  mapTiles: NaturalGasViewport.mapTilesPosition(state, props),
  portMap: NaturalGasViewport.portMapPosition(state, props),
  /*
  mapPieceActivityExplanation: legendMapPosition(state, props),*/
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
  
}))(NaturalGasVisualizationContainer)
