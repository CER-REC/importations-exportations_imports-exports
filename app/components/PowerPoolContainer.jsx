const React = require('react')
const ReactRedux = require('react-redux')
const MapLayout = require('./MapLayout.jsx')

class PowerPoolContainer extends React.Component {
  render(){
    //Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    //TODO: scale map dynamically when screen size change
    return <g transform='scale(1.2)'> <MapLayout
              xaxis={this.props.xaxis} 
              yaxis = {this.props.yaxis}
              country = 'powerpool'
              />
            </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(PowerPoolContainer)