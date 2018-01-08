
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const Header = require('./Header.jsx')
const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const VisualizationContainer = require('./VisualizationContainer.jsx')
const VisualizationDetailContainer = require('./VisualizationDetailContainer.jsx')

require('./Workspace.scss')

class Workspace extends React.Component {
  render() {
    return <div>
      <div className = 'Workspace'>
        <Header />
      </div>

      <svg
        className="Workspace"
        width={this.props.viewport.get('x')}
        height={this.props.viewport.get('y') + Constants.getIn(['workspace','viewportPadding'])}
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
