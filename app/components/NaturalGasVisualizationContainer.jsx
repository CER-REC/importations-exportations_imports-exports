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
import NaturalGasPieceActivityExplanation from './NaturalGasPieceActivityExplanation'
import Constants from '../Constants'
import {legendMapPosition} from '../selectors/viewport/menus'

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
    <DetailSidebar {...props.portMap} >
      <PortMap {...props.portMap} />
    </DetailSidebar>
    <NaturalGasPieceActivityExplanation
      {...props.mapPieceActivityExplanation}
    />
  </g>
)

export default connect((state, props) => ({
  importChart: NaturalGasViewport.chartImportPosition(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasViewport.chartExportPosition(state, props),
  mapTiles: NaturalGasViewport.mapTilesPosition(state, props),
  portMap: NaturalGasViewport.portMapPosition(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(NaturalGasVisualizationContainer)
