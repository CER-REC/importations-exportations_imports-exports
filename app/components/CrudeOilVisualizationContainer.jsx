const React = require('react')
const ReactRedux = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const Timeline = require('./Timeline')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')
const ProportionChart = require('./ProportionChart')

const CrudeOilSelectors = require('../selectors/crudeOil')

const TopChart = props => {
  return (
    <g>
      <ProportionChart
        {...props}
        height={100}
        data={props.transportData.get('bars')}
        valueKey="transport"
        color={{
          Pipeline: 'red',
          Marine: 'green',
          Railroad: 'blue',
          Truck: 'yellow',
        }}
      />
      <g transform="translate(0 115)">
        <ProportionChart
          {...props}
          height={100}
          data={props.subtypeData.get('bars')}
          valueKey="subtype"
          color={{
            Heavy: 'red',
            Light: 'green',
          }}
        />
      </g>
    </g>
  )
}

const TopChartConnected = ReactRedux.connect(
  state => ({
    transportData: CrudeOilSelectors.timelineCrudeTransportQuarterSelector(state),
    subtypeData: CrudeOilSelectors.timelineCrudeSubtypeQuarterSelector(state),
  })
)(TopChart)

class CrudeOilVisualizationContainer extends React.Component {
  render(){
    return <g>
      <Timeline
        x={this.props.xaxis}
        y={this.props.yaxis}
        width={this.props.width * 0.6}
        height={330}
        topHeight={215}
        TopChart={TopChartConnected}
      />
      <ExplanationPopovers 
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height}
      />
    </g>
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})

module.exports = ReactRedux.connect(mapStateToProps)(CrudeOilVisualizationContainer)
