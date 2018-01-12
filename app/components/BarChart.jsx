const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')

const AnimatedLine = require('./SVGAnimation/AnimatedLine')
const AxisGuide = require('./AxisGuide')
const TimelineSelector = require('../selectors/timeline')

class BarChart extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      axisGuide: props.trueScale.get('max'),
    }

    this.updateAxisGuide = this.updateAxisGuide.bind(this)
  }

  componentWillReceiveProps(props) {
    // Reset the axis guide when the scale changes.
    // Watch scale since that changes the bar height, but use trueScale in order
    // to put the guide on top of the tallest bar
    if (props.scale.getIn(['y', 'max']) !== this.props.scale.getIn(['y', 'max'])) {
      this.updateAxisGuide(props.trueScale.get('max'))
    }
  }

  updateAxisGuide(position) {
    this.setState({ axisGuide: position })
  }

  render() {
    const {
      bars: data,
      scale,
      height,
      flipped,
      valueKey,
      colour,
      barSize,
      timelineRange,
    } = this.props
    if (data.count() === 0) { return null }

    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
    const elements = data.map(point => {
      let opacity = 1
      const year = point.get('year')
      const quarter = point.get('quarter')
      const start = timelineRange.get('start').toJS()
      const end = timelineRange.get('end').toJS()
      if (this.props.timelineGroup === 'quarter') {
        // If the start and end quarters don't match, no filtering is applied
        if (start.quarter === end.quarter &&
          (quarter !== start.quarter || year < start.year || year > end.year)) {
          opacity = 0.5
        }
      } else if (year < start.year || year > end.year ||
        (year === start.year && quarter < start.quarter) ||
        (year === end.year && quarter > end.quarter)) {
        opacity = 0.5
      }
      return (
        <AnimatedLine
          x1={point.get('offsetX')}
          x2={point.get('offsetX')}
          y2={height}
          y1={height - point.getIn(['values', valueKey], 0) * heightPerUnit}
          key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
          strokeWidth={barSize}
          stroke={colour}
          strokeLinecap="round"
          opacity={opacity}
          animate={{ y1: '1s' }}
        />
      )
    }).toArray()
    const transform = (flipped === true)
      ? `scale(1,-1) translate(${this.props.left} ${-this.props.top - height})`
      : `translate(${this.props.left} ${this.props.top})`
    return (
      <g transform={transform}>
        <g>{elements}</g>
        <AxisGuide
          flipped={flipped}
          scale={scale.get('y').toJS()}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
          width={this.props.width}
          barSize={barSize}
        />
      </g>
    )
  }
}

BarChart.propTypes = {
  valueKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
}

BarChart.defaultProps = {
  height: 200,
  flipped: false,
  colour: 'black',
  barSize: 4,
}

module.exports = connect((state, props) => {
  return Object.assign({
    timelineGroup: TimelineSelector.timelineGrouping(state, props),
  }, TimelineSelector.timelineData(state, props))
})(BarChart)
