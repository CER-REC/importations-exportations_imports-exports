import React from 'react'
import { connect } from 'react-redux'

import Constants from '../Constants'

import { visualizationContainerPosition, visualizationContentPosition, menuWidth } from '../selectors/viewport/'
import WorkspaceComputations from '../computations/WorkspaceComputations'
// TODO: Temporary while reworking selectors
import ElectricityVisualizationContainer from './ElectricityVisualizationContainer'
import CrudeOilExportsVisualizationContainer from './CrudeOilExportsVisualizationContainer'
import CrudeOilImportsVisualizationContainer from './CrudeOilImportsVisualizationContainer'
import NaturalGasVisualizationContainer from './NaturalGasVisualizationContainer'
import NaturalGasLiquidsVisualizationContainer from './NaturalGasLiquidsVisualizationContainer'
import RefinedPetroleumProductsVisualizationContainer from './RefinedPetroleumProductsVisualizationContainer'
import ExplanationDot from './ExplanationDot'
import TrSelector from '../selectors/translate'
import tr from '../TranslationTable'

import './VisualizationContainer.scss'

class VisualizationContainer extends React.Component {
  componentDidMount() {
    // This is a bizarre workaround for the bizarre Firefox issue of not
    // rendering SVG filters if they weren't there at the first mount
    // TODO: Figure out why this magic fixes the bug
    this.setState({ mountedForFirefoxSVGFilterBug: true })
  }

  inconsistenciesExplanation() {
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 183 : 180
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 21 : 20
    return ( 
      <svg
        width={this.props.viewport.get('x')}
        height={Constants.get('topHeightMargin')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={200}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H372.2"
        xPosition={scaleContainerX}
        yPosition={scaleContainerY}
        lineX={142.16}
        lineY={173}
        textX={30}
        textY={57}
        containerX={0}
        containerY={0}
        name={`${this.props.selectedEnergy} inconsistencies dot`}
        text={`${this.props.Tr(['explanations', 'inconsistencies'])}`}
      />
    </svg>)
  }

  changeVisualization() {
    const { width, height } = this.props.visualizationPosition
    const visualizationContainerType = this.props.importExportVisualization
    const xaxis = this.props.menuWidth
    const yaxis = WorkspaceComputations.topHeightMargin()
    let VisComponent = null
    if (!this.state || this.state.mountedForFirefoxSVGFilterBug !== true) { return null }
    switch (visualizationContainerType) {
      case 'crudeOilImports':
        VisComponent = CrudeOilImportsVisualizationContainer
        break
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
      {this.inconsistenciesExplanation()}
    </g>)
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  visualizationPosition: visualizationContainerPosition(state),
  contentSize: visualizationContentPosition(state),
  menuWidth: menuWidth(state),
  importExportVisualization: state.importExportVisualization,
  Tr: TrSelector(state, props),
})


export default connect(mapStateToProps)(VisualizationContainer)
