const React = require('react')
const PropTypes = require('prop-types')
const Immutable = require('immutable')
const { connect } = require('react-redux')

const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const PortMap = require('./PortMap').default
const DetailSidebar = require('./DetailSidebar')
const NaturalGasViewport = require('../selectors/viewport/naturalGas')
const Constants = require('../Constants')

const NaturalGasVisualizationContainer = props => (
  <g>
    <BarChart
      {...props.importChart}
      valueKey="imports"
      aggregateKey="activity"
      colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
    />
    <Axis
      {...props.axisPosition}
      barWidth={4}
    />
    <BarChart
      {...props.exportChart}
      valueKey="exports"
      aggregateKey="activity"
      flipped
      colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
    />
    <ExplanationPopovers
      xaxis={props.xaxis}
      yaxis={props.yaxis + props.height}
    />
    <DetailSidebar {...props.portMap} >
      <PortMap {...props.portMap} />
    </DetailSidebar>
  </g>
)

module.exports = connect((state, props) => ({
  importChart: NaturalGasViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasViewport.chartExportPosition(state, props),
  mapTiles: NaturalGasViewport.mapTilesPosition(state, props),
  portMap: NaturalGasViewport.portMapPosition(state, props),
}))(NaturalGasVisualizationContainer)
