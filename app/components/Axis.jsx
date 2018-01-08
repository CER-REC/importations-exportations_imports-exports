const React = require('react')
const connect = require('react-redux').connect

const DetailSidebar = require('./DetailSidebar')
const ChartOptions = require('./ChartOptions')
const TimelineSeek = require('./TimelineSeek')
const TimelinePlay = require('./TimelinePlay')
const timelineSelectors = require('../selectors/timeline')
const Constants = require('../Constants')

const Axis = props => {
  const { labels, top = 0, left = 0, seekPosition, barWidth, width, height, data } = props
  if (data.count() === 0) { return null }
  const elements = labels.map(label => (
    <text
      key={`label-${label.get('label')}`}
      x={left + label.get('offsetX')}
      y={top + height / 2}
      textAnchor="middle"
      alignmentBaseline="middle"
    >
      {label.get('label')}
    </text>
  ))
  const endWidth = width - seekPosition.end - (barWidth / 2)
  const rectHeight = (height - barWidth)
  return (
    <g>
      <rect
        x={left + -barWidth / 2}
        y={top}
        width={seekPosition.start}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandMedium'])}
      />
      <rect
        x={left + seekPosition.end + (barWidth / 2)}
        y={top}
        width={endWidth < 0 ? 0 : endWidth}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandMedium'])}
      />
      {elements}
      <TimelinePlay
        top={top + height / 2}
        left={left - 20}
      />
      <TimelineSeek
        top={top}
        left={left}
        width={width}
        height={height}
        data={data}
      />
      <TimelineSeek
        top={top}
        left={left}
        width={width}
        height={height}
        data={data}
        side="end"
      />
      <DetailSidebar top={top} height={rectHeight}>
        <ChartOptions height={rectHeight} />
      </DetailSidebar>
    </g>
  )
}

module.exports = connect(
  (state, props) => ({
    seekPosition: timelineSelectors.timelineSeekPositionSelector(state, props),
  })
)(Axis)
