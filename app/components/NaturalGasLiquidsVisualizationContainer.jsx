import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import ExplanationPopovers from './ExplanationPopovers'
import BarChart from './BarChart'
import Axis from './Axis'
import NaturalGasLiquidsViewport from '../selectors/viewport/naturalGasLiquids'
import Constants from '../Constants'

class NaturalGasLiquidsVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <BarChart
        {...this.props.importChart}
        valueKey="imports"
        aggregateKey="activity"
        colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
      />
      <Axis
        {...this.props.axisPosition}
        barWidth={4}
      />
      <BarChart
        {...this.props.exportChart}
        valueKey="exports"
        aggregateKey="activity"
        flipped
        colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
      />
      <ExplanationPopovers
        xaxis={this.props.xaxis}
        yaxis={this.props.yaxis + this.props.height}
      />
            </g>)
  }
}

module.exports = connect((state, props) => ({
  importChart: NaturalGasLiquidsViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasLiquidsViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasLiquidsViewport.chartExportPosition(state, props),
}))(NaturalGasLiquidsVisualizationContainer)
