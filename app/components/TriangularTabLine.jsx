
const React = require('react')

class TriangularTabLine extends React.Component {
  render() {
    const lineString = `M 0 ${this.props.yaxis+5} l 150 0`
    const triangleString = `M 0 ${this.props.yaxis-5} L 8 ${this.props.yaxis+5} L 0 ${this.props.yaxis+5} Z`
    return <g>
      <path d = {triangleString} fill={this.props.color}/>
      <path d = {lineString} stroke={this.props.color} strokeWidth={this.props.lineWidth} fill='none' />
    </g>
  }
}

module.exports = TriangularTabLine