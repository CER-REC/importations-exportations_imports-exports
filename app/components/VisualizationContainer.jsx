import React from 'react'
import { connect } from 'react-redux'

import { visualizationContainerPosition, visualizationContentPosition, menuWidth } from '../selectors/viewport/'
import WorkspaceComputations from '../computations/WorkspaceComputations'
// TODO: Temporary while reworking selectors
import ElectricityVisualizationContainer from './ElectricityVisualizationContainer'
import CrudeOilExportsVisualizationContainer from './CrudeOilExportsVisualizationContainer'
import NaturalGasVisualizationContainer from './NaturalGasVisualizationContainer'
import NaturalGasLiquidsVisualizationContainer from './NaturalGasLiquidsVisualizationContainer'
import RefinedPetroleumProductsVisualizationContainer from './RefinedPetroleumProductsVisualizationContainer'

import './VisualizationContainer.scss'

class VisualizationContainer extends React.Component {
  componentDidMount() {
    // This is a bizarre workaround for the bizarre Firefox issue of not
    // rendering SVG filters if they weren't there at the first mount
    // TODO: Figure out why this magic fixes the bug
    this.setState({ mountedForFirefoxSVGFilterBug: true })
  }

  changeVisualization() {
    const { width, height } = this.props.visualizationPosition
    const visualizationContainerType = this.props.importExportVisualization
    const xaxis = this.props.menuWidth
    const yaxis = WorkspaceComputations.topHeightMargin()
    let VisComponent = null
    if (!this.state || this.state.mountedForFirefoxSVGFilterBug !== true) { return null }
    switch (visualizationContainerType) {
      case 'crudeOilExports':
        VisComponent = CrudeOilExportsVisualizationContainer
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
  viewport: state.viewport,
  visualizationPosition: visualizationContainerPosition(state),
  contentSize: visualizationContentPosition(state),
  menuWidth: menuWidth(state),
  importExportVisualization: state.importExportVisualization,
})


export default connect(mapStateToProps)(VisualizationContainer)
