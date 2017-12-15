const React = require('react')
const ReactRedux = require('react-redux')

class MapPiece extends React.Component {
  render(){
  	//Mock data need to be replaced by actual content 
    return <g>
      <rect x="0" y="0" width="100" height="100" fill={this.props.color}></rect>
      <text x="40" y="50" fill="blue">{this.props.data.name}</text>
      <text x="35" y="20" fill="blue">{this.props.data.importData}</text>
      <text x="35" y="80" fill="blue">{this.props.data.exportData}</text>
    </g>
  }
}


module.exports = MapPiece