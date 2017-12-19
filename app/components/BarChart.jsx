const React = require('react')

const Animation = require('./SVGAnimation')

const BarChart = ({
  data,
  scale,
  height = 200,
  flipped = false,
  valueKey,
}) => {
  const heightPerUnit = height / (scale.y[1] - scale.y[0])
  const elements = []
  let year, quarter
  let xOffset = 0
  for (year = scale.x[0]; year <= scale.x[1]; year++) {
    for (quarter = 1; quarter <= 4; quarter++) {
      const point = data[year][quarter]
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
            <line strokeWidth="4" stroke="black" strokeLinecap="round" />
          </Animation.SVGAnimation>
        )
      }
      // Gap between quarters
      xOffset += 5
    }
    // Gap between years
    xOffset += 25
  }
  const transform = (flipped === true)
    ? `scale(1,-1) translate(0 -${height})`
    : ''
  return <g transform={transform}>{elements}</g>
}

module.exports = BarChart
