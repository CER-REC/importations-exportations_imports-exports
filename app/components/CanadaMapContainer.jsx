const React = require('react')
const ReactRedux = require('react-redux')

const MapLayout = require('./MapLayout.jsx')

class CanadaMapContainer extends React.Component {
  render(){
    return <MapLayout
              xaxis={this.props.xaxis} 
              yaxis = {this.props.yaxis}
              country = 'ca'
              />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport

  }
}


module.exports = ReactRedux.connect(mapStateToProps)(CanadaMapContainer)