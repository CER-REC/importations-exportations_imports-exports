import React from 'react'
import { connect } from 'react-redux'

import BarChart from './BarChart'
import StackedChart from './StackedChart'
import Axis from './Axis'
import DetailSidebar from './DetailSidebar'
import ConfidentialCount from './ConfidentialCount'
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
          canChangeScale={false}
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
    const categoryColours = Constants.getIn(['styleGuide', 'categoryColours'])
    const charts = [
      'Partially Processed Oil',
      'Jet Fuel',
      'Heavy Fuel Oil',
      'Motor Gasoline',
      'Middle Distillate',
    ].map((key, i, arr) => (
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
          colour={categoryColours.get(
            i + (categoryColours.count() - arr.length),
            Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
          )}
          detailSidebar={false}
        />
        <DetailSidebar
          {...positions[key].chart}
        >
          <ConfidentialCount
            key="confidential"
            valueKey={key}
            aggregateKey="productSubtype"
          />
        </DetailSidebar>
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
