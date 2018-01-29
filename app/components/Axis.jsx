import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'

import DetailSidebar from './DetailSidebar'
import ChartOptions from './ChartOptions'
import TimelineSeek from './TimelineSeek'
import TimelinePlay from './TimelinePlay'
import TimelineSelector from '../selectors/timeline'
import Constants from '../Constants'

class Axis extends React.PureComponent {
  static propTypes = {
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    bars: PropTypes.instanceOf(Immutable.Map).isRequired,
    labels: PropTypes.instanceOf(Immutable.List).isRequired,
    seekPosition: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    barWidth: PropTypes.number.isRequired,
    canSeek: PropTypes.bool,
    chartOptions: PropTypes.bool,
    canChangeScale: PropTypes.bool,
  }

  static defaultProps = {
    canSeek: true,
    chartOptions: true,
    canChangeScale: true,
  }

  seekControls() {
    const {
      top, left, width, height, bars: data,
    } = this.props
    return (
      <g>
        <TimelinePlay
          top={top + (height / 2)}
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
      </g>
    )
  }

  chartOptions() {
    const { top, height } = this.props
    return (
      <DetailSidebar top={top} height={height}>
        <ChartOptions height={height} canChangeScale={this.props.canChangeScale} />
      </DetailSidebar>
    )
  }

  render() {
    const {
      labels,
      top,
      left,
      seekPosition,
      barWidth,
      width,
      height,
      bars: data,
    } = this.props
    if (data.count() === 0) { return null }
    const elements = labels.map((label) => {
      const key = label.get('key', `label-${label.get('label')}`)
      if (label.get('label') !== '|') {
        return (
          <text
            className="timelineLabel"
            key={key}
            x={left + label.get('offsetX')}
            y={top + (height / 2)}
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
          y1={top + (barWidth / 2)}
          y2={(top + height) - (barWidth / 2)}
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
          x={left + (-barWidth / 2)}
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
        {this.props.canSeek ? this.seekControls() : null}
        {this.props.chartOptions ? this.chartOptions() : null}
      </g>
    )
  }
}

module.exports = connect((state, props) => Object.assign({
  seekPosition: TimelineSelector.timelineSeekPositionSelector(state, props),
}, TimelineSelector.timelineData(state, props)))(Axis)
