const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

const CanadaMapContainer = require('./CanadaMapContainer.jsx')
const ElectricityTimelineContainer = require('./ElectricityTimelineContainer.jsx')
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
      <ElectricityTimelineContainer 
       xaxis = {this.props.xaxis } 
       yaxis = {this.props.yaxis + this.props.height/4} 
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
       xaxis = {this.props.xaxis + this.props.width * (0.60) } 
       yaxis = {this.props.yaxis + this.props.height}
      />
      <ExplanationPopovers 
       xaxis = {this.props.xaxis } 
       yaxis = {this.props.yaxis + this.props.height}
      />
    </g>
	}
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport

  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ElectricityVisualizationContainer)