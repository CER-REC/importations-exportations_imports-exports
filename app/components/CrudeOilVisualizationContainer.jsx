const React = require('react')
const { connect } = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGroupingOutline = require('./PowerPoolGroupingOutline.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const ProportionChart = require('./ProportionChart')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const CrudeOilViewport = require('../selectors/viewport/crudeOil')
const CrudeOilSelectors = require('../selectors/crudeOil')
const TimelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

class CrudeOilVisualizationContainer extends React.Component {
  render(){
    const contentWidth = this.props.contentSize.width
    return <g>
      <CanadaMapContainer
        xaxis = {this.props.xaxis}
        yaxis = {this.props.yaxis}
      />
      <ProportionChart
        {...this.props.transportChart}
        data={this.props.transportData.get('bars')}
        timelineRange={this.props.timelineRange}
        valueKey="transport"
        color={{
          Pipeline: 'red',
          Marine: 'green',
          Railroad: 'blue',
          Truck: 'yellow',
        }}
      />
      <ProportionChart
        {...this.props.subtypeChart}
        data={this.props.subtypeData.get('bars')}
        timelineRange={this.props.timelineRange}
        valueKey="subtype"
        color={{
          Heavy: 'red',
          Light: 'green',
        }}
      />
      <Axis
        {...this.props.axisPosition}
        data={this.props.exportData.get('bars')}
        barWidth={4}
        labels={this.props.exportData.get('labels')}
        scale={{ x: { min: 1990, max: 2017 }}}
      />
      <BarChart
        {...this.props.exportChart}
        valueKey="exports"
        flipped
        data={this.props.exportData.get('bars')}
        timelineRange={this.props.timelineRange}
        colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
      />
      <USMapContainer
        xaxis = {this.props.xaxis}
        yaxis = {this.props.yaxis + this.props.height / 2}
      />
      <PowerPoolContainer
        xaxis = {this.props.xaxis}
        yaxis = {this.props.yaxis + this.props.height}
      />
      <PowerPoolGroupingOutline
        xaxis = {this.props.xaxis + contentWidth}
        yaxis = {this.props.yaxis + this.props.height}
      />
      <ExplanationPopovers
        xaxis = {this.props.xaxis}
        yaxis = {this.props.yaxis + this.props.height}
      />
    </g>
  }
}

module.exports = connect(
  (state, props) => ({
    transportChart: CrudeOilViewport.chartTransportPosition(state, props),
    subtypeChart: CrudeOilViewport.chartSubtypePosition(state, props),
    axisPosition: CrudeOilViewport.chartAxisPosition(state, props),
    exportChart: CrudeOilViewport.chartExportPosition(state, props),
    exportData: TimelineSelectors.timelinePositionSelector(state, props),
    transportData: CrudeOilSelectors.timelineCrudeTransportQuarterSelector(state),
    subtypeData: CrudeOilSelectors.timelineCrudeSubtypeQuarterSelector(state),
    timelineRange: TimelineSelectors.timelineRange(state, props),
  })
)(CrudeOilVisualizationContainer)
