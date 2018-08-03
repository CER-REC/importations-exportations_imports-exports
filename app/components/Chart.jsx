import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { parsePeriod } from '../utilities'

class Chart extends React.PureComponent {
  static propTypes = {
    // Unused prop-types are used by reselect
    // aggregateKey: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    scaleKey: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    height: PropTypes.number.isRequired,
    flipped: PropTypes.bool,
    color: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    timelineRange: PropTypes.instanceOf(Immutable.Map).isRequired,
    timelinePlayback: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.instanceOf(Immutable.Map),
    ]).isRequired,
    timelineGroup: PropTypes.oneOf(['year', 'quarter']).isRequired,
  }

  static defaultProps = {
    flipped: false,
    color: 'black',
    scaleKey: '', // The selector will default this to the valueKey if not set
  }

  getTransform() {
    const { left, top, height } = this.props
    return (this.props.flipped === true)
      ? `scale(1,-1) translate(${left} ${-top - height})`
      : `translate(${left} ${top})`
  }
  findMaxValues(props = this.props) {
    const { bars, valueKey, activityValueKey } = props
    const values = bars.get('values')
      .map(point => (valueKey === 'productSubtype' || valueKey === 'transport'
        ? point.reduce((acc, next) => (acc + next), 0)
        : point.get(activityValueKey, 0)
      ))
      .toArray()
    return Math.max(0, ...values)
  }

  isTimelinePointFiltered(period) {
    const { year, quarter } = parsePeriod(period)

    if (this.props.timelinePlayback) {
      const playback = this.props.timelinePlayback.toJS()
      return (year !== playback.year || quarter !== playback.quarter)
    }

    const start = this.props.timelineRange.get('start').toJS()
    const end = this.props.timelineRange.get('end').toJS()

    if (this.props.timelineGroup === 'quarter') {
      // If the start and end quarters don't match, no filtering is applied
      if (start.quarter === end.quarter &&
        (quarter !== start.quarter || year < start.year || year > end.year)) {
        return true
      }
    } else if (year < start.year || year > end.year ||
      (year === start.year && quarter < start.quarter) ||
      (year === end.year && quarter > end.quarter)) {
      return true
    }
    return false
  }

  render() {
    return null
  }
}

export default Chart
