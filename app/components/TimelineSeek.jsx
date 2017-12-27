const React = require('react')

const SVGDrag = require('./SVGDrag/')

class TimelineSeek extends React.PureComponent {
  static get defaultProps() {
    return {
      side: 'left',
    }
  }

  constructor(props) {
    super(props)
    this.adjustOffset = this.adjustOffset.bind(this)
  }

  adjustOffset(rawOffset) {
    const offset = { x: rawOffset.x, y: 0 }
    if (this.props.side !== 'left') { offset.x *= -1 }
    if (offset.x < 0) { offset.x = 0 }
    else if (offset.x > this.props.width) { offset.x = this.props.width }
    if (this.props.side !== 'left') { offset.x *= -1 }
    return offset
  }

  render() {
    const transform = (this.props.side === 'left')
      ? ''
      : `scale(-1,1) translate(${-this.props.width} 0)`
    return (
      <g transform={transform}>
        <g
          transform={`translate(-12 ${this.props.chartHeight + 2})`}
        >
          <SVGDrag
            adjustOffset={this.adjustOffset}
            invertedX={this.props.side !== 'left'}
          >
            <polygon
              points="7,0 10,0 10,26 0,26"
              stroke="black"
              fill="transparent"
            />
          </SVGDrag>
        </g>
      </g>
    )
  }
}

module.exports = TimelineSeek
