import React from 'react'
import { connect } from 'react-redux'

import ViewportSelectors from '../selectors/viewport/'
import WorkspaceComputations from '../computations/WorkspaceComputations'
import ElectricityVisualizationContainer from './ElectricityVisualizationContainer'
import CrudeOilVisualizationContainer from './CrudeOilVisualizationContainer'
import NaturalGasVisualizationContainer from './NaturalGasVisualizationContainer'
import NaturalGasLiquidsVisualizationContainer from './NaturalGasLiquidsVisualizationContainer'
import RefinedPetroleumProductsVisualizationContainer from './RefinedPetroleumProductsVisualizationContainer'

import './VisualizationContainer.scss'

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


module.exports = connect(mapStateToProps)(VisualizationContainer)
