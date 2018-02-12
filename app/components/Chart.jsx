import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

class Chart extends React.PureComponent {
  static propTypes = {
    // Unused prop-types are used by reselect
    aggregateKey: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    scaleKey: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    height: PropTypes.number.isRequired,
    flipped: PropTypes.bool,
    color: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    timelineRange: PropTypes.instanceOf(Immutable.Map).isRequired,
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

  isTimelinePointFiltered(point) {
    const year = point.get('year')
    const quarter = point.get('quarter')
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
