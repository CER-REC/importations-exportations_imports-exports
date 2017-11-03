
const React = require('react')
const ReactRedux = require('react-redux')

require('./Workspace.scss')

class Workspace extends React.Component {

  render() {

    return  <svg className="Workspace" width={this.props.viewport.get('x')}
      height={this.props.viewport.get('y')}> 
      <rect fill='blue' height='400' width='300'/>
      <rect fill = 'red' height ='300' width = '150' x='234' />
    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(Workspace)