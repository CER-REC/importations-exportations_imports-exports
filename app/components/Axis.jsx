const React = require('react')
const connect = require('react-redux').connect

const DetailSidebar = require('./DetailSidebar')
const timelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

const Axis = ({ labels, y = 0, seekPosition, barWidth, width, height }) => {
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
  const endWidth = width - seekPosition.end - (barWidth / 2) - 1
  const rectHeight = (height - barWidth)
  return (
    <g>
      <rect
        x={-barWidth / 2}
        y={y - rectHeight / 2}
        width={seekPosition.start}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandMedium'])}
      />
      <rect
        x={seekPosition.end + (barWidth / 2)}
        y={y - rectHeight / 2}
        width={endWidth < 0 ? 0 : endWidth}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandMedium'])}
      />
      {elements}
      <DetailSidebar y={y}>
        <text>Hello World</text>
      </DetailSidebar>
    </g>
  )
}

module.exports = connect(
  state => ({
    seekPosition: timelineSelectors.timelineSeekPositionSelector(state),
  })
)(Axis)
