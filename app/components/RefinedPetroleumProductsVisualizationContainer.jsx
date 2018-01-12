const React = require('react')
const { connect } = require('react-redux')

const BarChart = require('./BarChart')
const Axis = require('./Axis')
const RefinedPetroleumProductsViewport = require('../selectors/viewport/refinedPetroleumProducts')
const DataSelectors = require('../selectors/data')
const Constants = require('../Constants')

class RefinedPetroleumProductsVisualizationContainer extends React.Component {
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
      ? null
      : this.renderSeparateCharts()
  }
}

module.exports = connect(
  (state, props) => ({
    individualCharts: RefinedPetroleumProductsViewport.individualChartsPosition(state, props),
    arrangeBy: DataSelectors.arrangeBy(state, props),
  })
)(RefinedPetroleumProductsVisualizationContainer)
