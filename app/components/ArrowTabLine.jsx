const React = require('react')

class ArrowTabLine extends React.Component {
  render() {
    const arrow = `M${this.props.xaxisPadding + 152} ${this.props.yaxis - 8} L${this.props.xaxisPadding + 144} ${this.props.yaxis +3} L${this.props.xaxisPadding + 141} ${this.props.yaxis} Z`
    const titledLine = `M ${this.props.xaxisPadding + 140} ${this.props.yaxis + 5} l 9 -10`
    const straightLine = `M ${this.props.xaxisPadding} ${this.props.yaxis + 5} l 141 0`
    return <g>
      <path d = {titledLine} stroke = {this.props.color} strokeWidth = {this.props.lineWidth} fill = {this.props.color} />
      <path d = {straightLine} stroke = {this.props.color} strokeWidth = {this.props.lineWidth} fill = {this.props.color} />
      <path d = {arrow} fill = {this.props.color}/>
    </g>
  }
}

module.exports = ArrowTabLine