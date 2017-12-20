const React = require('react')

const Axis = ({
  scale, groupPadding, groupComparator
}) => {
  // TODO: Starting this back half of the stroke width of the line. Do better
  let xOffset = -2

  const elements = []

  let year
  for (year = scale.x.min; year <= scale.x.max; year++) {
    elements.push(
      <text
        key={`label-${year}`}
        x={xOffset + 10}
        y="215"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {year.toString().substr(-2)}
      </text>
    )

    // Gap between years
    // TODO: Implement proper grouping after figuring out how the UofC intends
    // for the quarter sorting to work.
    xOffset += groupPadding + 20
  }

  return <g>{elements}</g>
}

Axis.defaultProps = {
  groupPadding: 0,
}

module.exports = Axis
