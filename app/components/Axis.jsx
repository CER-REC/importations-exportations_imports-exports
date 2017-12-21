const React = require('react')

const Axis = ({
  scale, groupPadding, groupComparator, barSize, barPadding = 0, x = 0, y = 0,
}) => {
  let xOffset = x - (barSize / 2)

  const elements = []

  const barWithPad = (barSize + barPadding)

  let year
  for (year = scale.x.min; year <= scale.x.max; year++) {
    elements.push(
      <text
        key={`label-${year}`}
        x={xOffset + (barWithPad * 2)}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {year.toString().substr(-2)}
      </text>
    )

    // Gap between years
    // TODO: Implement proper grouping after figuring out how the UofC intends
    // for the quarter sorting to work.
    xOffset += groupPadding + (barWithPad * 4)
  }

  return <g>{elements}</g>
}

Axis.defaultProps = {
  groupPadding: 0,
}

module.exports = Axis
