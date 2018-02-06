import React from 'react'
import { connect } from 'react-redux'

import BarChart from './BarChart'
import StackedChart from './StackedChart'
import Axis from './Axis'
import * as RefinedPetroleumProductsViewport from '../selectors/viewport/refinedPetroleumProducts'
import { arrangeBy } from '../selectors/data'
import Constants from '../Constants'

class RefinedPetroleumProductsVisualizationContainer extends React.Component {
  renderStackedChart() {
    const { stackedChart: positions } = this.props
    return (
      <g>
        <Axis
          {...positions.axis}
          barWidth={4}
        />
        <StackedChart
          {...positions.chart}
          aggregateKey="productSubtype"
          scaleKey="total"
          flipped
        />
      </g>
    )
  }

  renderSeparateCharts() {
    const { individualCharts: positions } = this.props
    const charts = [
      'Partially Processed Oil',
      'Jet Fuel',
      'Heavy Fuel Oil',
      'Motor Gasoline',
      'Middle Distillate',
    ].map(key => (
      <g key={key}>
        <Axis
          {...positions[key].axis}
          barWidth={4}
          canSeek={key === 'Partially Processed Oil'}
          chartOptions={key === 'Partially Processed Oil'}
        />
        <BarChart
          {...positions[key].chart}
          valueKey={key}
          aggregateKey="productSubtype"
          flipped
          colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
        />
      </g>
    ))
    return <g>{charts}</g>
  }

  render() {
    return (this.props.arrangeBy === 'stack')
      ? this.renderStackedChart()
      : this.renderSeparateCharts()
  }
}

export default connect((state, props) => ({
  stackedChart: RefinedPetroleumProductsViewport.stackedChartPosition(state, props),
  individualCharts: RefinedPetroleumProductsViewport.individualChartsPosition(state, props),
  arrangeBy: arrangeBy(state, props),
}))(RefinedPetroleumProductsVisualizationContainer)
