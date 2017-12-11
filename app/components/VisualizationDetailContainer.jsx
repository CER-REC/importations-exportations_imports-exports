const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./VisualizationDetailContainer.scss')

class VisualizationDetailContainer extends React.Component {

  render() {
    return <g>
      <rect 
        x = { WorkspaceComputations.VisualizationDetailContainerX(this.props.viewport) }
        y = { WorkspaceComputations.topHeightMargin() }
        width = { Constants.getIn(['visualizationDetailContainer','width'])}
        height = { this.props.viewport.get('y') + Constants.getIn(['workspace','viewportPadding']) }
        fill = '#355B50' 
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(VisualizationDetailContainer)