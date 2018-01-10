const React = require('react')
const ReactRedux = require('react-redux')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const Timeline = require('./Timeline')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGroupingOutline = require('./PowerPoolGroupingOutline.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')

class ElectricityVisualizationContainer extends React.Component {
  render(){
    return <g>
      <CanadaMapContainer 
        xaxis = {this.props.xaxis} 
        yaxis = {this.props.yaxis} 
      />
      <Timeline
        x={this.props.xaxis}
        y={this.props.yaxis}
        width={this.props.width * 0.6}
        height={215}
      />
      <USMapContainer 
        xaxis = {this.props.xaxis } 
        yaxis = {this.props.yaxis + this.props.height/2}
      />
      <PowerPoolContainer 
       xaxis = {this.props.xaxis + this.props.width*0.4 } 
       yaxis = {this.props.yaxis + this.props.height}
      />
      <PowerPoolGroupingOutline 
       xaxis = {this.props.xaxis} 
       yaxis = {this.props.yaxis + this.props.height}
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

module.exports = ReactRedux.connect(mapStateToProps)(ElectricityVisualizationContainer)
