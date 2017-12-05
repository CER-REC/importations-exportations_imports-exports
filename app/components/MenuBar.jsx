const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./MenuBar.scss')

class MenuBar extends React.Component {

  render() {
    return <g>
      <rect 
        x = { 0 }
        y = { WorkspaceComputations.topHeightMargin() }
        width = { Constants.getIn(['menuBar','width']) }
        height = { WorkspaceComputations.menuBarHeight(this.props.viewport) }
        fill = '#F3D7D8' 
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MenuBar)