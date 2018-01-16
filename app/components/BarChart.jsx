const React = require('react')
const PropTypes = require('prop-types')
const { connect } = require('react-redux')

const Chart = require('./Chart')
const AnimatedLine = require('./SVGAnimation/AnimatedLine')
const AxisGuide = require('./AxisGuide')
const TimelineSelector = require('../selectors/timeline')

class BarChart extends Chart {
  static get propTypes() {
    return Object.assign({}, super.propTypes, {
      valueKey: PropTypes.string.isRequired,
    })
  }

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
      layout,
    } = this.props
    if (data.count() === 0) { return null }

    const barSize = layout.get('barWidth')

    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
    const elements = data.map(point => {
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
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
    return (
      <g transform={this.getTransform()}>
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

module.exports = connect((state, props) => {
  return Object.assign({
    timelineGroup: TimelineSelector.timelineGrouping(state, props),
  }, TimelineSelector.timelineData(state, props))
})(BarChart)
