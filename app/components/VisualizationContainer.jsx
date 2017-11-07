const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./VisualizationContainer.scss')

class VisualizationContainer extends React.Component {

  render() {
    return <g>
      <rect 
        x = { Constants.getIn(['visualizationContainer','leftMargin']) }
        y = { WorkspaceComputations.topHeightMargin() }
        width = { WorkspaceComputations.visualizationContainerWidth(this.props.viewport)}
        height = { this.props.viewport.get('y') + Constants.getIn(['workspace','viewportPadding']) }
        fill = '#AA947E' 
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(VisualizationContainer)