const React = require('react')
const { connect } = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const NaturalGasViewport = require('../selectors/viewport/naturalGas')
const TimelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

class NaturalGasVisualizationContainer extends React.Component {
  render(){
    return <g>
      <BarChart
        {...this.props.importChart}
        valueKey="imports"
        linkedKeys={['exports']}
        data={this.props.chartData.get('bars')}
        timelineRange={this.props.timelineRange}
        colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
      />
      <Axis
        {...this.props.axisPosition}
        data={this.props.chartData.get('bars')}
        barWidth={4}
        labels={this.props.chartData.get('labels')}
        scale={{ x: { min: 1990, max: 2017 }}}
      />
      <BarChart
        {...this.props.exportChart}
        valueKey="exports"
        linkedKeys={['imports']}
        flipped
        data={this.props.chartData.get('bars')}
        timelineRange={this.props.timelineRange}
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
    chartData: TimelineSelectors.timelinePositionSelector(state, props),
    timelineRange: TimelineSelectors.timelineRange(state, props),
  })
)(NaturalGasVisualizationContainer)
