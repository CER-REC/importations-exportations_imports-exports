const React = require('react')
const ReactRedux = require('react-redux')

const ViewportSelectors = require('../selectors/viewport')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')
const ElectricityVisualizationContainer = require('./ElectricityVisualizationContainer.jsx')
const CrudeOilVisualizationContainer = require('./CrudeOilVisualizationContainer.jsx')
const NaturalGasVisualizationContainer = require('./NaturalGasVisualizationContainer.jsx')
const NaturalGasLiquidsVisualizationContainer = require('./NaturalGasLiquidsVisualizationContainer.jsx')

require('./VisualizationContainer.scss')

class VisualizationContainer extends React.Component {

  changeVisualization(){
    const visualizationContainerType = this.props.importExportVisualization
    const xaxis = Constants.getIn(['visualizationContainer','leftMargin'])
    const yaxis = WorkspaceComputations.topHeightMargin() 
    const width = this.props.visualizationWidth
    const height = this.props.visualizationHeight
    switch(visualizationContainerType){
      case 'crudeOil':
        return <CrudeOilVisualizationContainer xaxis={xaxis} yaxis={yaxis} height={height} width={width}/> 
      case 'naturalGas':
        return <NaturalGasVisualizationContainer xaxis={xaxis} yaxis={yaxis} height={height} width={width}/> 
      case 'refinedPetroleumProducts':
      //Mock data need to be replaced by actual content 
        return <text x = {xaxis} y = {yaxis}>
          refine petroleum place holder
        </text>
      case 'naturalGasLiquids':
        return <NaturalGasLiquidsVisualizationContainer xaxis={xaxis} yaxis={yaxis} height={height} width={width}/> 
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
    visualizationWidth: ViewportSelectors.visualizationContainerWidth(state),
    visualizationHeight: ViewportSelectors.visualizationContainerHeight(state),
    importExportVisualization: state.importExportVisualization
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(VisualizationContainer)
