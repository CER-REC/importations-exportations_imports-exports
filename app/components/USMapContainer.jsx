const React = require('react')
const ReactRedux = require('react-redux')
const ElectricityMapLayout = require('./ElectricityMapLayout.jsx')

class USMapContainer extends React.Component {
  render(){
    //Scale is temporary adjustment as it's too small if we use dimensions mentioned in the design document
    ////TODO: scale map dynamically when screen size change
    return <g transform='scale(1.4)'> <ElectricityMapLayout
              xaxis={this.props.xaxis} 
              yaxis = {this.props.yaxis}
              country = 'us'
              />
            </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport

  }
}


module.exports = ReactRedux.connect(mapStateToProps)(USMapContainer)