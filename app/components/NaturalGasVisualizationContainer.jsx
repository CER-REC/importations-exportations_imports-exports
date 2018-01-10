const React = require('react')
const ReactRedux = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const Timeline = require('./Timeline')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')

class NaturalGasVisualizationContainer extends React.Component {
  
  render(){
    return <g>
      <Timeline
        x={this.props.xaxis}
        y={this.props.yaxis}
        width={this.props.width * 0.6}
        height={215}
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

module.exports = ReactRedux.connect(mapStateToProps)(NaturalGasVisualizationContainer)
