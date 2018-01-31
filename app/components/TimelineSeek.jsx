import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'

import SVGDrag from './SVGDrag/'
import Constants from '../Constants'
import { timelineFilter } from '../actions/visualizationSettings'
import TimelineSelector from '../selectors/timeline'

class TimelineSeek extends React.PureComponent {
  static propTypes = {
    seekPosition: PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
    }).isRequired,
    side: PropTypes.oneOf(['start', 'end']),
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    data: PropTypes.instanceOf(Map).isRequired,
    timelineGroup: PropTypes.oneOf(['year', 'quarter']).isRequired,
    timelineRange: PropTypes.instanceOf(Map).isRequired,
    timelineFilter: PropTypes.func.isRequired,
  }

  static defaultProps = {
    side: 'start',
  }

  constructor(props) {
    super(props)
    this.state = {
      offset: this.getOffsetFromPosition(props.seekPosition[props.side]),
    }
    // Get the position of the other side, so that we don't drag past it
    const otherSide = props.side === 'start' ? 'end' : 'start'
    this.otherSideLimit =
      this.getOffsetFromPosition(props.seekPosition[otherSide], otherSide)
  }

  componentWillReceiveProps(props) {
    const { seekPosition, side } = props
    if (seekPosition[side] !== this.props.seekPosition[side]) {
      const offset = this.getOffsetFromPosition(seekPosition[side])
      this.setState({ offset })
    }
    // Get the position of the other side, so that we don't drag past it
    const otherSide = props.side === 'start' ? 'end' : 'start'
    if (seekPosition[otherSide] !== this.props.seekPosition[otherSide]) {
      this.otherSideLimit =
        this.getOffsetFromPosition(props.seekPosition[otherSide], otherSide)
    }
  }

  onArrowKey = (e) => {
    const data = this.props.data.toList()
    const currentPosition = this.props.timelineRange.get(this.props.side)
    const currentIndex = data.findIndex(p => (
      p.get('year') === currentPosition.get('year') &&
      p.get('quarter') === currentPosition.get('quarter')
    ))

    const direction = (e.key === 'ArrowRight' || e.key === 'PageDown') ? 1 : -1
    const scale = (e.key === 'ArrowLeft' || e.key === 'ArrowRight') ? 1 : 4

    const newPoint = data.get(currentIndex + (direction * scale)) || data.get(currentIndex)

    const newOffsets = {
      ...this.props.seekPosition,
      [this.props.side]: newPoint.get('offsetX'),
    }

    const newRange = {
      ...this.props.timelineRange.toJS(),
      [this.props.side]: {
        year: newPoint.get('year'),
        quarter: newPoint.get('quarter'),
      },
    }

    // Ensure the curtains can't overlap
    if (newOffsets.start <= newOffsets.end) {
      this.props.timelineFilter(fromJS(this.ensureRangeAllowed(newRange)))
    }
  }

  getOffsetFromPosition(position, side = this.props.side) {
    return (side === 'start') ? position : this.props.width - position
  }

  adjustOffset = (rawOffset) => {
    const { side, seekPosition } = this.props
    const offset = { x: rawOffset.x, y: 0 }
    const flippedInverter = (side === 'start') ? 1 : -1
    const newX = this.state.offset + (rawOffset.x * flippedInverter)
    if (newX < 0) {
      offset.x = -this.state.offset * flippedInverter
    } else if (newX > this.props.width) {
      offset.x = this.props.width * flippedInverter
    }

    if (newX >= this.props.width - this.otherSideLimit) {
      offset.x = (side === 'start')
        ? (this.props.width - this.otherSideLimit - seekPosition[side])
        : (this.otherSideLimit - seekPosition[side])
    }
    return offset
  }

  dragStop = (rawOffset) => {
    const { data, side } = this.props
    const offset = (side === 'start')
      ? this.state.offset + rawOffset.x
      : this.state.offset - rawOffset.x
    const filterPoint = (side === 'start')
      ? data.find(p => p.get('offsetX') > offset - 1)
      : data.findLast(p => p.get('offsetX') < ((this.props.width - offset) + 1))

    const newRange = this.props.timelineRange.set(side, {
      year: filterPoint.get('year'),
      quarter: filterPoint.get('quarter'),
    }).toJS()
    this.props.timelineFilter(fromJS(this.ensureRangeAllowed(newRange)))
  }

  ensureRangeAllowed(newRangeRaw) {
    const { data, side, timelineGroup } = this.props
    const newRange = { ...newRangeRaw }
    if (timelineGroup === 'quarter') {
      const otherSide = (side === 'start') ? 'end' : 'start'
      const firstPoint = data.first().toJS()
      const lastPoint = data.last().toJS()
      if ((firstPoint.year !== newRange.start.year) ||
          (firstPoint.quarter !== newRange.start.quarter) ||
          (lastPoint.year !== newRange.end.year) ||
          (lastPoint.quarter !== newRange.end.quarter)) {
        newRange[otherSide].quarter = newRange[side].quarter
        if (newRange.start.year > newRange.end.year) {
          newRange[otherSide].year = newRange[side].year
        }
      }
    }
    return newRange
  }

  render() {
    const { side, timelineRange } = this.props
    const sideTransform = (side === 'start')
      ? `translate(${this.props.left} ${this.props.top})`
      : `scale(-1,1) translate(${-this.props.width - this.props.left} ${this.props.top})`
    const label = `${side} curtain at ${timelineRange.getIn([side, 'year'])} quarter ${timelineRange.getIn([side, 'quarter'])}`
    return (
      <g transform={sideTransform}>
        <SVGDrag
          adjustOffset={this.adjustOffset}
          dragStop={this.dragStop}
          invertedX={side !== 'start'}
          onArrowKey={this.onArrowKey}
          aria-label={label}
        >
          <g
            transform={`translate(${this.state.offset - 12} 0)`}
          >
            <polygon
              points="7,0 10,0 10,26 0,26"
              stroke={Constants.getIn(['styleGuide', 'colours', 'SandExtraDark'])}
              fill="white"
            />
          </g>
        </SVGDrag>
      </g>
    )
  }
}

module.exports = connect(
  (state, props) => ({
    seekPosition: TimelineSelector.timelineSeekPositionSelector(state, props),
    timelineRange: TimelineSelector.timelineRange(state, props),
    timelineGroup: TimelineSelector.timelineGrouping(state, props),
  }),
  { timelineFilter },
)(TimelineSeek)
