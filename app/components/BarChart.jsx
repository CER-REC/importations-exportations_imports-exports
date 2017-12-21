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
      barSize,
      barPadding,
    } = this.props

    const heightPerUnit = height / (scale.y.max - scale.y.min)
    const elements = []
    let xOffset = 0
    let lastPoint

    data.forEach(point => {
      // Gap between grouped values
      if (groupComparator && lastPoint && !groupComparator(lastPoint, point)) {
        xOffset += groupPadding
      }

      if (point) {
        elements.push(
          <Animation.SVGAnimation
            key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
            tween={{
              x1: xOffset,
              x2: xOffset,
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
      // Gap between quarters
      xOffset += barSize + barPadding

      lastPoint = point
    })
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
          width={this.props.width}
          barSize={this.props.barSize}
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
  barSize: 4,
  barPadding: 1,
}

module.exports = BarChart
