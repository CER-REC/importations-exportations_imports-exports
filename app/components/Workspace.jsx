
const React = require('react')
const ReactRedux = require('react-redux')

const MenuBar = require('./MenuBar.jsx')

require('./Workspace.scss')

class Workspace extends React.Component {

  render() {

    return  <svg className="Workspace" width={this.props.viewport.get('x')}
      height={this.props.viewport.get('y')}> 

      <MenuBar />
      
    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)