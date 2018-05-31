import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'


import BarChart from './BarChart'
import Axis from './Axis'
import PortMap from './PortMap'
import DetailTotal from './DetailTotal'
import ConfidentialCount from './ConfidentialCount'
import MissingDataCount from './MissingDataCount'
import DetailSidebar from './DetailSidebar'
import NaturalGasMapContainer from './NaturalGasMapContainer'
import * as NaturalGasViewport from '../selectors/viewport/naturalGas'

import { amount } from '../selectors/data'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
import NaturalGasPieceActivityExplanation from './NaturalGasPieceActivityExplanation'
import Constants from '../Constants'
import { legendMapPosition } from '../selectors/viewport/menus'

const NaturalGasVisualizationContainer = (props) => {
  const weighted = props.unit === 'CN$/GJ' ? 'weighted' : true
  return (
    <g>
      {!props.showImports ? null : (
        <React.Fragment>
          <BarChart
            {...props.importChart}
            valueKey="activity"
            activityValueKey="imports"
            groupBy="period"
            valueAverage={weighted}
            colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          <DetailSidebar {...props.importChart}>
            <div className="verticalAlign">
              <div className="centered">
                <MissingDataCount
                  valueKey="destinationKey"
                  filterActivity="imports"
                  groupBy="activity"
                  valueAverage={weighted}
                />
                <ConfidentialCount
                  valueKey="destinationKey"
                  filterActivity="imports"
                  groupBy="activity"
                  valueAverage={weighted}
                />
                <DetailTotal
                  type="imports"
                  filterActivity="imports"
                  showGroup="imports"
                  groupBy="activity"
                  valueKey="activity"
                  valueAverage={weighted}
                />
              </div>
            </div>
          </DetailSidebar>
        </React.Fragment>
      )}
      <Axis
        {...props.axisPosition}
        barWidth={4}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
      {!props.showExports ? null : (
        <React.Fragment>
          <BarChart
            {...props.exportChart}
            valueKey="activity"
            activityValueKey="exports"
            groupBy="period"
            valueAverage={weighted}
            flipped
            colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          <DetailSidebar {...props.exportChart}>
            <div className="verticalAlign">
              <div className="centered">
                <DetailTotal
                  type="exports"
                  filterActivity="exports"
                  showGroup="exports"
                  groupBy="activity"
                  valueKey="activity"
                  valueAverage={weighted}
                />
                <ConfidentialCount
                  valueKey="destinationKey"
                  filterActivity="exports"
                  groupBy="activity"
                  valueAverage={weighted}
                />
                <MissingDataCount
                  valueKey="destinationKey"
                  filterActivity="exports"
                  groupBy="activity"
                  valueAverage={weighted}
                />
              </div>
            </div>
          </DetailSidebar>
        </React.Fragment>
      )}
      <NaturalGasMapContainer {...props.mapTiles} valueAverage={weighted} />
      <DetailSidebar {...props.portMap} ><PortMap {...props.portMap} /></DetailSidebar>
      <NaturalGasPieceActivityExplanation
        {...props.mapPieceActivityExplanation}
      />
    </g>
  )
}

export default connect((state, props) => ({
  importChart: NaturalGasViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasViewport.chartExportPosition(state, props),
  mapTiles: NaturalGasViewport.mapTilesPosition(state, props),
  portMap: NaturalGasViewport.portMapPosition(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  unit: amount(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),

}))(NaturalGasVisualizationContainer)
