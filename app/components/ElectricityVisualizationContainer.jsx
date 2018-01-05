const React = require('react')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const Timeline = require('./Timeline')
const USMapContainer = require('./USMapContainer.jsx')
const PowerPoolContainer = require('./PowerPoolContainer.jsx')
const PowerPoolGroupingOutline = require('./PowerPoolGroupingOutline.jsx')
const ExplanationPopovers = require('./ExplanationPopovers.jsx')

class ElectricityVisualizationContainer extends React.Component {
  
  render(){
    const contentWidth = this.props.contentSize.width
    return <g>
      <CanadaMapContainer 
        xaxis = {this.props.xaxis} 
        yaxis = {this.props.yaxis} 
      />
      <Timeline
        x={this.props.xaxis}
        y={this.props.yaxis}
        width={contentWidth}
        height={215}
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

module.exports = ElectricityVisualizationContainer
