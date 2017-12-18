
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const VisualizationContainer = require('./VisualizationContainer.jsx')
const VisualizationDetailContainer = require('./VisualizationDetailContainer.jsx')
const Timeline = require('./Timeline')

require('./Workspace.scss')

class Workspace extends React.Component {

  render() {

    return  <svg className="Workspace" width={this.props.viewport.get('x')}
      height={ this.props.viewport.get('y') + Constants.getIn(['workspace','viewportPadding']) }> 

      <VisualizationContainer />

      <VisualizationDetailContainer />

      <SocialBar />
      <MenuBar />

      <g transform="translate(450 0)">
        <Timeline/>
      </g>
    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)
