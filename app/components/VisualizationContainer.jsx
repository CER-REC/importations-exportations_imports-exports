const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')
const ElectricityVisualizationContainer = require('./ElectricityVisualizationContainer.jsx')

require('./VisualizationContainer.scss')

class VisualizationContainer extends React.Component {

  changeVisualization(){
    const visualizationContainerType = this.props.importExportVisualization
    const xaxis = Constants.getIn(['visualizationContainer','leftMargin'])
    const yaxis = WorkspaceComputations.topHeightMargin() 
    const width = WorkspaceComputations.visualizationContainerHeight(this.props.viewport) 
    const height = WorkspaceComputations.visualizationContainerWidth(this.props.viewport)
    switch(visualizationContainerType){
      case 'crudeOil':
      //Mock data need to be replaced by actual content 
        return <text x = {xaxis} y = {yaxis}>
          crude oil place holder
        </text>
      case 'naturalGas':
      //Mock data need to be replaced by actual content 
        return <text x = {xaxis} y = {yaxis}>
          natural gas place holder
        </text>
      case 'refinedPetroleumProducts':
      //Mock data need to be replaced by actual content 
        return <text x = {xaxis} y = {yaxis}>
          refine petroleum place holder
        </text>
      case 'naturalGasLiquids':
      //Mock data need to be replaced by actual content 
        return <text x = {xaxis} y = {yaxis}>
          natural gas liquid place holder
        </text>
      case 'electricity':
      default:
        return <ElectricityVisualizationContainer xaxis={xaxis} yaxis={yaxis} height={height} width={width}/> 
    }
  }
  render() {
    return <g>
      {this.changeVisualization()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(VisualizationContainer)