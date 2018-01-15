const React = require('react')
const PropTypes = require('prop-types')
const Immutable = require('immutable')
const { connect } = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGrouping = require('./PowerPoolGrouping.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const ElectrictyMapPieceActivityExplantion = require('./ElectrictyMapPieceActivityExplantion.jsx')


const BarChart = require('./BarChart')
const Axis = require('./Axis')
const ElectricityViewport = require('../selectors/viewport/electricity')
const Constants = require('../Constants')

class ElectricityVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <CanadaMapContainer
        {...this.props.canadaMap}
      />
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
      <USMapContainer
        {...this.props.usMap}
      />
      <PowerPoolContainer
        {...this.props.powerPool}
      />
      <PowerPoolGrouping
        {...this.props.powerPool}
      />
      <ExplanationPopovers
        xaxis={this.props.xaxis}
        yaxis={this.props.yaxis + this.props.height}
      />
      <ElectrictyMapPieceActivityExplantion
        {...this.props.mapPieceActivityExplantion}
      />
            </g>)
  }
}

module.exports = connect((state, props) => ({
  canadaMap: ElectricityViewport.canadaMapPosition(state, props),
  usMap: ElectricityViewport.usMapPosition(state, props),
  powerPool: ElectricityViewport.powerPoolPosition(state, props),
  mapPieceActivityExplantion: ElectricityViewport.mapPieceActivityExplantionPosition(state, props),
  importChart: ElectricityViewport.chartImportPosition(state, props),
  axisPosition: ElectricityViewport.chartAxisPosition(state, props),
  exportChart: ElectricityViewport.chartExportPosition(state, props),
}))(ElectricityVisualizationContainer)
