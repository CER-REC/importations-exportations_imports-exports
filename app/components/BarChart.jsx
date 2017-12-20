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
      groupComparator,
      groupPadding,
    } = this.props

    const heightPerUnit = height / (scale.y.max - scale.y.min)
    const elements = []
    let year, quarter
    let xOffset = 0
    let lastPoint
    for (year = scale.x.min; year <= scale.x.max; year++) {
      for (quarter = 1; quarter <= 4; quarter++) {
        const point = data[year][quarter]

        // Gap between grouped values
        if (groupComparator && lastPoint && !groupComparator(lastPoint, point)) {
          xOffset += groupPadding
        }

        if (point) {
          elements.push(
            <Animation.SVGAnimation
              key={`${point.year}-${point.quarter}-${valueKey}`}
              tween={{
                x1: xOffset,
                x2: xOffset,
                y2: height,
                y1: (height - point[valueKey] * heightPerUnit),
              }}
            >
              <line strokeWidth="4" stroke={color} strokeLinecap="round" />
            </Animation.SVGAnimation>
          )
        }
        // Gap between quarters
        xOffset += 5

        lastPoint = point
      }
    }
    const transform = (flipped === true)
      ? `scale(1,-1) translate(0 ${-height})`
      : ''
    return (
      <g transform={transform}>
        {elements}
        <AxisGuide
          flipped={flipped}
          scale={scale.y}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
        />
      </g>
    )
  }
}

BarChart.defaultProps = {
  height: 200,
  flipped: false,
  color: 'black',
  groupPadding: 0,
}

module.exports = BarChart
