
const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const ExplanationDot = require('./ExplanationDot.jsx')
const VisualizationContainer = require('./VisualizationContainer.jsx')
const VisualizationDetailContainer = require('./VisualizationDetailContainer.jsx')

require('./Workspace.scss')

class Workspace extends React.Component {

  render() {

    return  <div className = 'Workspace' height='200' width='200' x = {200} y={200}>
      
      <svg className="Workspace" width={this.props.viewport.get('x')}
        height={ this.props.viewport.get('y') + Constants.getIn(['workspace','viewportPadding']) }> 

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
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)