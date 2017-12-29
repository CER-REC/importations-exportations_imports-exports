const React = require('react')

const Axis = ({ labels, y = 0 }) => {
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
  return <g>{elements}</g>
}

module.exports = Axis
