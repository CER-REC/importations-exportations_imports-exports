import React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import SVGDrag from './SVGDrag/'
import Constants from '../Constants'
import { timelineFilter } from '../actions/visualizationSettings'
import TimelineSelector from '../selectors/timeline'

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ExplanationDot = require('./ExplanationDot.jsx')

class TimelineSeek extends React.PureComponent {
  static get defaultProps() {
    return {
      side: 'start',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      offset: this.getOffsetFromPosition(props.seekPosition[props.side]),
    }
    this.adjustOffset = this.adjustOffset.bind(this)
    this.dragStop = this.dragStop.bind(this)
    // Get the position of the other side, so that we don't drag past it
    const otherSide = props.side === 'start' ? 'end' : 'start'
    this.otherSideLimit =
      this.getOffsetFromPosition(props.seekPosition[otherSide], otherSide)
  }

  getOffsetFromPosition(position, side = this.props.side) {
    return (side === 'start') ? position : this.props.width - position
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

  adjustOffset(rawOffset) {
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

  dragStop(rawOffset) {
    const { data, side, timelineGroup } = this.props
    const offset = (side === 'start')
      ? this.state.offset + rawOffset.x
      : this.state.offset - rawOffset.x
    const filterPoint = (side === 'start')
      ? data.find(p => p.get('offsetX') > offset - 1)
      : data.findLast(p => p.get('offsetX') < (this.props.width - offset + 1))

    const newRange = this.props.timelineRange.set(side, {
      year: filterPoint.get('year'),
      quarter: filterPoint.get('quarter'),
    }).toJS()
    if (timelineGroup === 'quarter') {
      const otherSide = (side === 'start') ? 'end' : 'start'
      const firstPoint = data.first().toJS()
      const lastPoint = data.last().toJS()
      if ((firstPoint.year !== newRange.start.year) ||
          (firstPoint.quarter !== newRange.start.quarter) ||
          (lastPoint.year !== newRange.end.year) ||
          (lastPoint.quarter !== newRange.end.quarter)) {
        newRange[otherSide].quarter = filterPoint.get('quarter')
        if (newRange.start.year > newRange.end.year) {
          newRange[otherSide].year = newRange[side].year
        }
      }
    }
    this.props.timelineFilter(fromJS(newRange))
  }

  explanationDot() {
    if(this.props.side !== 'start') {
      return null
    }
    return (<g><ExplanationDot
      key="timeSeekDot"
      xPosition={12}
      yPosition={12}
    />
      <use xlinkHref="#back" x={22} y={12} />
    </g>)
  }

  render() {
    const sideTransform = (this.props.side === 'start')
      ? `translate(${this.props.left} ${this.props.top})`
      : `scale(-1,1) translate(${-this.props.width - this.props.left} ${this.props.top})`
    return (
      <g transform={sideTransform}>
        <SVGDrag
          adjustOffset={this.adjustOffset}
          dragStop={this.dragStop}
          invertedX={this.props.side !== 'start'}
        >
          <g
            transform={`translate(${this.state.offset - 12} 0)`}
          >
            <polygon
              points="7,0 10,0 10,26 0,26"
              stroke={Constants.getIn(['styleGuide', 'colours', 'SandExtraDark'])}
              fill="white"
            />
            { this.explanationDot() }
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
