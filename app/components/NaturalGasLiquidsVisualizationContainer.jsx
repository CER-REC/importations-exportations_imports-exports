import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import BarChart from './BarChart'
import Axis from './Axis'
import * as NaturalGasLiquidsViewport from '../selectors/viewport/naturalGasLiquids'
import Constants from '../Constants'
import USPadd from './Padds/USPadd'
import NaturalGasCanadaMapContainer from './NaturalGasCanadaMapContainer'
import { legendMapPosition } from '../selectors/viewport/menus'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
import NaturalGasLiquidsMapPieceActivityExplanation from './NaturalGasLiquidsMapPieceActivityExplanation'

class NaturalGasLiquidsVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <NaturalGasCanadaMapContainer
        {...this.props.canadaMap}
      />
      {!this.props.showImports ? null : (
        <BarChart
          {...this.props.importChart}
          valueKey="imports"
          aggregateKey="activity"
          colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
          tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
        />
      )}
      <Axis
        {...this.props.axisPosition}
        barWidth={4}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
      {!this.props.showExports ? null : (
        <BarChart
          {...this.props.exportChart}
          valueKey="exports"
          aggregateKey="activity"
          flipped
          colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
          tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
        />
      )}
      <g>
        <USPadd
          aggregateKey="productSubtype"
          {...this.props.usPaddChart}
        />
      </g>
      <NaturalGasLiquidsMapPieceActivityExplanation
        {...this.props.mapPieceActivityExplanation}
      />
    </g>)
  }
}

export default connect((state, props) => ({
  canadaMap: NaturalGasLiquidsViewport.canadaImportMap(state, props),
  importChart: NaturalGasLiquidsViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasLiquidsViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasLiquidsViewport.chartExportPosition(state, props),
  usPaddChart: NaturalGasLiquidsViewport.usPaddPosition(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(NaturalGasLiquidsVisualizationContainer)
