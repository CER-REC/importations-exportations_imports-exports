
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const Header = require('./Header.jsx')
const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const VisualizationContainer = require('./VisualizationContainer.jsx')
const VisualizationDetailContainer = require('./VisualizationDetailContainer.jsx')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./Workspace.scss')

class Workspace extends React.Component {

  render() {

    const workspaceStyle = {
      width:  this.props.viewport.get('x'),
      height: WorkspaceComputations.visualizationHeight(this.props.viewport),
    }

    return <div style = { workspaceStyle }>
      <div className = 'Workspace' >
        <Header />
      </div>

      <svg
        className="Workspace"
        width={this.props.viewport.get('x')}
        height={WorkspaceComputations.visualizationHeight(this.props.viewport)}
      > 
        <VisualizationContainer />

        <VisualizationDetailContainer />

        <SocialBar />
        <MenuBar />
      </svg>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)
