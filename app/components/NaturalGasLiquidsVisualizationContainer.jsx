const React = require('react')
const { connect } = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGroupingOutline = require('./PowerPoolGroupingOutline.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const NaturalGasLiquidsViewport = require('../selectors/viewport/naturalGasLiquids')
const TimelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

class NaturalGasLiquidsVisualizationContainer extends React.Component {
  render(){
    const contentWidth = this.props.contentSize.width
    return <g>
      <CanadaMapContainer 
        xaxis = {this.props.xaxis} 
        yaxis = {this.props.yaxis} 
      />
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
      <USMapContainer 
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height/2}
      />
      <PowerPoolContainer 
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height}
      />
      <PowerPoolGroupingOutline 
        xaxis = {this.props.xaxis + contentWidth}
        yaxis = {this.props.yaxis + this.props.height}
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
    importChart: NaturalGasLiquidsViewport.chartImportPosition(state, props),
    axisPosition: NaturalGasLiquidsViewport.chartAxisPosition(state, props),
    exportChart: NaturalGasLiquidsViewport.chartExportPosition(state, props),
    chartData: TimelineSelectors.timelinePositionSelector(state, props),
    timelineRange: TimelineSelectors.timelineRange(state, props),
  })
)(NaturalGasLiquidsVisualizationContainer)
