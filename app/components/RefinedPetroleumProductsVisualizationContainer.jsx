const React = require('react')
const { connect } = require('react-redux')

const BarChart = require('./BarChart')
const StackedChart = require('./StackedChart')
const Axis = require('./Axis')
const RefinedPetroleumProductsViewport = require('../selectors/viewport/refinedPetroleumProducts')
const DataSelectors = require('../selectors/data')
const Constants = require('../Constants')

class RefinedPetroleumProductsVisualizationContainer extends React.Component {
  renderStackedChart() {
    const { stackedChart: positions } = this.props
    return (
      <g>
        <Axis
          {...positions.axis}
          barWidth="4"
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
          barWidth="4"
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
    return (this.props.arrangeBy === 'location')
      ? this.renderStackedChart()
      : this.renderSeparateCharts()
  }
}

module.exports = connect((state, props) => ({
  stackedChart: RefinedPetroleumProductsViewport.stackedChartPosition(state, props),
  individualCharts: RefinedPetroleumProductsViewport.individualChartsPosition(state, props),
  arrangeBy: DataSelectors.arrangeBy(state, props),
}))(RefinedPetroleumProductsVisualizationContainer)
