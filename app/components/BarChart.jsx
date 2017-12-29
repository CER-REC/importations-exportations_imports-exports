const React = require('react')

const Animation = require('./SVGAnimation')
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
    } = this.props

    const heightPerUnit = height / (scale.y.max - scale.y.min)
    const elements = []

    data.forEach(point => {
      if (point) {
        elements.push(
          <Animation.SVGAnimation
            key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
            tween={{
              x1: point.get('offsetX'),
              x2: point.get('offsetX'),
              y2: height,
              y1: (height - point.get(valueKey) * heightPerUnit),
            }}
          >
            <line
              strokeWidth={barSize}
              stroke={color}
              strokeLinecap="round"
            />
          </Animation.SVGAnimation>
        )
      }
    })
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
