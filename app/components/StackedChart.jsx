const React = require('react')
const { connect } = require('react-redux')

const Chart = require('./Chart')
const AnimatedLine = require('./SVGAnimation/AnimatedLine')
const Constants = require('../Constants')
const TimelineSelector = require('../selectors/timeline')

class StackedChart extends Chart {
  static get defaultProps() {
    return Object.assign({
      colors: Constants.getIn(['styleGuide', 'categoryColours']),
    }, super.defaultProps)
  }

  render() {
    const {
      bars: data,
      height,
      layout,
      scale,
      color,
      colors: categoryColours,
    } = this.props

    const elements = data.map(point => {
      const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      let offsetY = 0
      let stackIndex = 0
      const colourOffset = (categoryColours.count() - point.get('values').count())
      const lines = point
        .get('values')
        .map((value, type) => {
          const lineColor = categoryColours.get(stackIndex + colourOffset, color)
          const line = (
            <AnimatedLine
              x1={point.get('offsetX')}
              x2={point.get('offsetX')}
              y2={height - offsetY}
              y1={height - (offsetY + value * heightPerUnit)}
              key={type}
              strokeWidth={layout.get('barWidth')}
              stroke={lineColor}
              strokeLinecap="round"
              opacity={opacity}
              animate={{ y1: '1s' }}
            />
          )
          offsetY += (value * heightPerUnit)
          stackIndex++
          return line
        })
        .toArray()
      return <g key={`${point.get('year')}-${point.get('quarter')}`}>{lines}</g>
    }).toArray()
    return (
      <g transform={this.getTransform()}>
        {elements}
      </g>
    )
  }
}

module.exports = connect((state, props) => {
  return Object.assign({
    timelineGroup: TimelineSelector.timelineGrouping(state, props),
  }, TimelineSelector.timelineData(state, props))
})(StackedChart)
