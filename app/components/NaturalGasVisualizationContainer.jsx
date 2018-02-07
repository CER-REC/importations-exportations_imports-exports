import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import ExplanationPopovers from './ExplanationPopovers'
import BarChart from './BarChart'
import Axis from './Axis'
import PortMap from './PortMap'
import DetailSidebar from './DetailSidebar'
import NaturalGasMapContainer from './NaturalGasMapContainer'
import * as NaturalGasViewport from '../selectors/viewport/naturalGas'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
import Constants from '../Constants'

const NaturalGasVisualizationContainer = props => (
  <g>
    {!props.showImports ? null : (
      <BarChart
        {...props.importChart}
        valueKey="imports"
        aggregateKey="activity"
        colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
      />
    )}
    <Axis
      {...props.axisPosition}
      barWidth={4}
    />
    {!props.showExports ? null : (
      <BarChart
        {...props.exportChart}
        valueKey="exports"
        aggregateKey="activity"
        flipped
        colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
      />
    )}
    <NaturalGasMapContainer
    {...props.mapTiles}
    />
    <ExplanationPopovers
      xaxis={props.xaxis}
      yaxis={props.yaxis + props.height}
    />
    <DetailSidebar {...props.portMap} >
      <PortMap {...props.portMap} />
    </DetailSidebar>
  </g>
)

export default connect((state, props) => ({
  importChart: NaturalGasViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasViewport.chartExportPosition(state, props),
  mapTiles: NaturalGasViewport.mapTilesPosition(state, props),
  portMap: NaturalGasViewport.portMapPosition(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(NaturalGasVisualizationContainer)
