const React = require('react')
const PropTypes = require('prop-types')
const Immutable = require('immutable')
const { connect } = require('react-redux')

const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const NaturalGasLiquidsViewport = require('../selectors/viewport/naturalGasLiquids')
const Constants = require('../Constants')

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
