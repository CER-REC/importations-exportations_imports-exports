const React = require('react')
const ReactRedux = require('react-redux')
const MapLayout = require('./MapLayout.jsx')

class PowerPoolContainer extends React.Component {
  render(){
    return <MapLayout
              xaxis={this.props.xaxis} 
              yaxis = {this.props.yaxis}
              country = 'powerpool'
              />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(PowerPoolContainer)