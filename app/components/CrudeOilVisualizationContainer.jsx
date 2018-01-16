const React = require('react')
const { connect } = require('react-redux')

const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const ProportionChart = require('./ProportionChart')
const BarChart = require('./BarChart')
const Axis = require('./Axis')
const CrudeOilViewport = require('../selectors/viewport/crudeOil')
const Constants = require('../Constants')

class CrudeOilVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <ProportionChart
        {...this.props.transportChart}
        aggregateKey="transport"
        scaleKey="total"
        color={{
          Pipeline: 'red',
          Marine: 'green',
          Railroad: 'blue',
          Truck: 'yellow',
        }}
      />
      <ProportionChart
        {...this.props.subtypeChart}
        aggregateKey="productSubtype"
        scaleKey="total"
        color={{
          Heavy: 'red',
          Light: 'green',
        }}
      />
      <Axis
        {...this.props.axisPosition}
        barWidth={4}
        canChangeScale={false}
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
  transportChart: CrudeOilViewport.chartTransportPosition(state, props),
  subtypeChart: CrudeOilViewport.chartSubtypePosition(state, props),
  axisPosition: CrudeOilViewport.chartAxisPosition(state, props),
  exportChart: CrudeOilViewport.chartExportPosition(state, props),
}))(CrudeOilVisualizationContainer)
