const React = require('react')
const { connect } = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGroupingOutline = require('./PowerPoolGroupingOutline.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const MapPieceActivityExplantion = require('./MapPieceActivityExplantion.jsx')


const BarChart = require('./BarChart')
const Axis = require('./Axis')
const ElectricityViewport = require('../selectors/viewport/electricity')
const TimelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

class ElectricityVisualizationContainer extends React.Component {
  render(){
    const contentWidth = this.props.contentSize.width
    return <g>
      <CanadaMapContainer 
        {...this.props.canadaMap}
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
        {...this.props.usMap}
      />
      <PowerPoolContainer 
        {...this.props.powerPool}
      />
      <PowerPoolGroupingOutline 
        xaxis = {this.props.xaxis} 
        yaxis = {this.props.yaxis + this.props.height}
      />
      <ExplanationPopovers 
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height}
      />
      <MapPieceActivityExplantion />
    </g>
  }
}

module.exports = connect(
  (state, props) => ({
    canadaMap: ElectricityViewport.canadaMapPosition(state, props),
    usMap: ElectricityViewport.usMapPosition(state, props),
    powerPool: ElectricityViewport.powerPoolPosition(state, props),
    importChart: ElectricityViewport.chartImportPosition(state, props),
    axisPosition: ElectricityViewport.chartAxisPosition(state, props),
    exportChart: ElectricityViewport.chartExportPosition(state, props),
    chartData: TimelineSelectors.timelinePositionSelector(state, props),
    timelineRange: TimelineSelectors.timelineRange(state, props),
  })
)(ElectricityVisualizationContainer)
