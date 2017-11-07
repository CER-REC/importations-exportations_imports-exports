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
        height = { WorkspaceComputations.visualizationContainerHeight(this.props.viewport) }
        fill = 'white' stroke ='#2b2b2b' 
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