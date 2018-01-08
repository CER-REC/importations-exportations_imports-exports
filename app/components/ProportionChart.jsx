const React = require('react')

const AnimatedLine = require('./SVGAnimation/AnimatedLine')
const Constants = require('../Constants')

class ProportionChart extends React.PureComponent {
  render() {
    const {
      data,
      height,
      flipped,
      valueKey,
      barSize,
      timelineRange,
    } = this.props

    const categoryColours = Constants.getIn(['styleGuide', 'categoryColours'])

    const elements = data.map(point => {
      const heightPerUnit = height / (point.get('total'))
      let opacity = 1
      let offsetY = 0
      let stackIndex = 0
      const colourOffset = (categoryColours.count() - point.get(valueKey).count())
      const year = point.get('year')
      const quarter = point.get('quarter')
      const start = timelineRange.get('start').toJS()
      const end = timelineRange.get('end').toJS()
      if (year < start.year || year > end.year ||
          (year === start.year && quarter < start.quarter) ||
          (year === end.year && quarter > end.quarter)) {
        opacity = 0.5
      }
      const lines = point
        .get(valueKey)
        .map((value, type) => {
          const lineColor = categoryColours.get(stackIndex + colourOffset)
          const line = (
            <AnimatedLine
              x1={point.get('offsetX')}
              x2={point.get('offsetX')}
              y2={height - offsetY}
              y1={height - (offsetY + value * heightPerUnit)}
              key={type}
              strokeWidth={barSize}
              stroke={lineColor}
              strokeLinecap="round"
              opacity={opacity}
              animate={{ y1: '1s' }}
            />
          )
          offsetY += (value * heightPerUnit)
          stackIndex++
          return line
        })
        .toArray()
      return <g key={`${point.get('year')}-${point.get('quarter')}`}>{lines}</g>
    }).toArray()
    const transform = (flipped === true)
      ? `scale(1,-1) translate(0 ${-height})`
      : ''
    return (
      <g transform={transform}>
        {elements}
      </g>
    )
  }
}

ProportionChart.defaultProps = {
  height: 200,
  flipped: false,
  color: 'black',
  barSize: 4,
}

module.exports = ProportionChart
