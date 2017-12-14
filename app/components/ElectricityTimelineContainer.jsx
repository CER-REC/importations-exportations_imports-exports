const React = require('react')
const ReactRedux = require('react-redux')

class ElectricityTimelineContainer extends React.Component {

    render(){
      //Mock data need to be replaced by actual content 
      return <g>
        <text x = {this.props.xaxis} y = {this.props.yaxis}>
          Electricity Timeline Container
        </text>
      </g>
    }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport

  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ElectricityTimelineContainer)