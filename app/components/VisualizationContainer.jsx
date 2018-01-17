const React = require('react')
const ReactRedux = require('react-redux')

const ViewportSelectors = require('../selectors/viewport/')
const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')
const ElectricityVisualizationContainer = require('./ElectricityVisualizationContainer.jsx')
const CrudeOilVisualizationContainer = require('./CrudeOilVisualizationContainer.jsx')
const NaturalGasVisualizationContainer = require('./NaturalGasVisualizationContainer.jsx')
const NaturalGasLiquidsVisualizationContainer = require('./NaturalGasLiquidsVisualizationContainer.jsx')
const RefinedPetroleumProductsVisualizationContainer = require('./RefinedPetroleumProductsVisualizationContainer.jsx')

require('./VisualizationContainer.scss')

class VisualizationContainer extends React.Component {
  changeVisualization() {
    const { width, height } = this.props.visualizationPosition
    const visualizationContainerType = this.props.importExportVisualization
    const xaxis = this.props.menuWidth
    const yaxis = WorkspaceComputations.topHeightMargin()
    let VisComponent = null
    switch (visualizationContainerType) {
      case 'crudeOil':
        VisComponent = CrudeOilVisualizationContainer
        break
      case 'naturalGas':
        VisComponent = NaturalGasVisualizationContainer
        break
      case 'refinedPetroleumProducts':
        VisComponent = RefinedPetroleumProductsVisualizationContainer
        break
      case 'naturalGasLiquids':
        VisComponent = NaturalGasLiquidsVisualizationContainer
        break
      case 'electricity':
      default:
        VisComponent = ElectricityVisualizationContainer
    }
    return (
      <VisComponent
        xaxis={xaxis}
        yaxis={yaxis}
        height={height}
        width={width}
        contentSize={this.props.contentSize}
      />
    )
  }
  render() {
    return (<g>
      {this.changeVisualization()}
            </g>)
  }
}

const mapStateToProps = state => ({
  visualizationPosition: ViewportSelectors.visualizationContainerPosition(state),
  contentSize: ViewportSelectors.visualizationContentPosition(state),
  menuWidth: ViewportSelectors.menuWidth(state),
  importExportVisualization: state.importExportVisualization,
})


module.exports = ReactRedux.connect(mapStateToProps)(VisualizationContainer)
