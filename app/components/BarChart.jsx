const React = require('react')

const Animation = require('./SVGAnimation')

const BarChart = ({
  data,
  scale,
  height,
  flipped,
  valueKey,
  color,
  groupComparator,
  groupPadding,
}) => {
  const heightPerUnit = height / (scale.y[1] - scale.y[0])
  const elements = []
  let year, quarter
  let xOffset = 0
  let lastPoint
  for (year = scale.x[0]; year <= scale.x[1]; year++) {
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
    ? `scale(1,-1) translate(0 -${height})`
    : ''
  return <g transform={transform}>{elements}</g>
}

BarChart.defaultProps = {
  height: 200,
  flipped: false,
  color: 'black',
  groupPadding: 0,
}

module.exports = BarChart
