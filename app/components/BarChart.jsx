const React = require('react')

const AnimatedLine = require('./SVGAnimation/AnimatedLine')
const AxisGuide = require('./AxisGuide')

class BarChart extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      axisGuide: props.trueScale.y.max,
    }

    this.updateAxisGuide = this.updateAxisGuide.bind(this)
  }

  componentWillReceiveProps(props) {
    // Reset the axis guide when the scale changes.
    // Watch scale since that changes the bar height, but use trueScale in order
    // to put the guide on top of the tallest bar
    if (props.scale.y.max !== this.props.scale.y.max) {
      this.updateAxisGuide(props.trueScale.y.max)
    }
  }

  updateAxisGuide(position) {
    this.setState({ axisGuide: position })
  }

  render() {
    const {
      data,
      scale,
      height,
      flipped,
      valueKey,
      color,
      barSize,
      timelineRange,
    } = this.props

    const heightPerUnit = height / (scale.y.max - scale.y.min)
    const elements = data.map(point => {
      let opacity = 1
      const year = point.get('year')
      const quarter = point.get('quarter')
      const start = timelineRange.get('start').toJS()
      const end = timelineRange.get('end').toJS()
      if (year < start.year || year > end.year ||
          (year === start.year && quarter < start.quarter) ||
          (year === end.year && quarter > end.quarter)) {
        opacity = 0.5
      }
      return (
        <AnimatedLine
          x1={point.get('offsetX')}
          x2={point.get('offsetX')}
          y2={height}
          y1={height - point.get(valueKey) * heightPerUnit}
          key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
          strokeWidth={barSize}
          stroke={color}
          strokeLinecap="round"
          opacity={opacity}
          animate={{ y1: '1s' }}
        />
      )
    }).toArray()
    const transform = (flipped === true)
      ? `scale(1,-1) translate(0 ${-height})`
      : ''
    return (
      <g transform={transform}>
        <g>{elements}</g>
        <AxisGuide
          flipped={flipped}
          scale={scale.y}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
          width={this.props.width}
          barSize={barSize}
        />
      </g>
    )
  }
}

BarChart.defaultProps = {
  height: 200,
  flipped: false,
  color: 'black',
  barSize: 4,
}

module.exports = BarChart
