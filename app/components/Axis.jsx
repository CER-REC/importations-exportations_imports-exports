const React = require('react')
const connect = require('react-redux').connect

const timelineSelectors = require('../selectors/timeline')

const Axis = ({ labels, y = 0, seekPosition, barWidth, width }) => {
  const elements = labels.map(label => (
    <text
      key={`label-${label.get('label')}`}
      x={label.get('offsetX')}
      y={y}
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {label.get('label')}
    </text>
  ))
  // TODO: Replace colour with SandMedium constant
  return (
    <g>
      <rect
        x={-barWidth / 2}
        y={y - 13}
        width={seekPosition.start}
        height="26"
        fill="rgb(211, 193, 152)"
      />
      <rect
        x={seekPosition.end + (barWidth / 2)}
        y={y - 13}
        width={width - seekPosition.end - (barWidth / 2) - 1}
        height="26"
        fill="rgb(211, 193, 152)"
      />
      {elements}
    </g>
  )
}

module.exports = connect(
  state => ({
    seekPosition: timelineSelectors.timelineSeekPositionSelector(state),
  }),
)(Axis)
