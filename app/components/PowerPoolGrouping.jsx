const React = require('react')
const ReactRedux = require('react-redux')

const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')

class PowerPoolGrouping extends React.Component {
  render() {
    // Mock data need to be replaced by actual content
    return (<g>
      <text x={this.props.xaxis} y={this.props.yaxis} />
            </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})


module.exports = ReactRedux.connect(mapStateToProps)(PowerPoolGrouping)
