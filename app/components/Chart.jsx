const React = require('react')
const PropTypes = require('prop-types')

class Chart extends React.PureComponent {
  static get propTypes() {
    return {
      aggregateKey: PropTypes.string.isRequired,
      scaleKey: PropTypes.string,
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      flipped: PropTypes.bool,
      color: PropTypes.string,
    }
  }

  static get defaultProps() {
    return {
      flipped: false,
      color: 'black',
      scaleKey: '', // The selector will default this to the valueKey if not set
    }
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

  getTransform() {
    const { left, top, height } = this.props
    return (this.props.flipped === true)
      ? `scale(1,-1) translate(${left} ${-top - height})`
      : `translate(${left} ${top})`
  }

  render() {
    return null
  }
}

module.exports = Chart
