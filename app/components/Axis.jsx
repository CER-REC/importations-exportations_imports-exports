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
  const elements = labels.map(label => {
    const key = label.get('key', `label-${label.get('label')}`)
    if (label.get('label') !== '|') {
      return (
        <text
          key={key}
          x={left + label.get('offsetX')}
          y={top + height / 2}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight={label.get('fontWeight', 'normal')}
        >
          {label.get('label')}
        </text>
      )
    }
    return (
      <line
        key={key}
        x1={left + label.get('offsetX')}
        x2={left + label.get('offsetX')}
        y1={top + barWidth / 2}
        y2={top + height - barWidth / 2}
        strokeWidth={Constants.getIn(['timeline', 'barPadding'])}
        stroke="black"
      />
    )
  })
  const endWidth = width - seekPosition.end - (barWidth / 2)
  const rectHeight = (height - barWidth)
  return (
    <g>
      <rect
        x={left + -barWidth / 2}
        y={top}
        width={seekPosition.start}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandLight'])}
      />
      <rect
        x={left + seekPosition.end + (barWidth / 2)}
        y={top}
        width={endWidth < 0 ? 0 : endWidth}
        height={rectHeight}
        fill={Constants.getIn(['styleGuide', 'colours', 'SandLight'])}
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
        <ChartOptions height={rectHeight} canChangeScale={props.canChangeScale} />
      </DetailSidebar>
    </g>
  )
}

module.exports = connect(
  (state, props) => ({
    seekPosition: timelineSelectors.timelineSeekPositionSelector(state, props),
  })
)(Axis)
