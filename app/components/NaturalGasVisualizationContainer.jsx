const React = require('react')
const { connect } = require('react-redux')

const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const NaturalGasViewport = require('../selectors/viewport/naturalGas')
const Constants = require('../Constants')

class NaturalGasVisualizationContainer extends React.Component {
  render(){
    return <g>
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
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height}
      />
    </g>
  }
}

module.exports = connect(
  (state, props) => ({
    importChart: NaturalGasViewport.chartImportPosition(state, props),
    axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
    exportChart: NaturalGasViewport.chartExportPosition(state, props),
  })
)(NaturalGasVisualizationContainer)
