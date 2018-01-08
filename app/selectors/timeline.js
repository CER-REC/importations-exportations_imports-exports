const createSelector = require('reselect').createSelector
const fromJS = require('immutable').fromJS

const sortTimelineSelector = require('./data').sortTimelineSelector
const { visualizationContentPosition: visContentSize } = require('./viewport/')
const Constants = require('../Constants.js')

const timelineGrouping = state => state.ui.get('timelineGroup')
const timelineRange = state => state.ui.get('timelineRange')
const chartScaleBy = (_, props) => ({
  primary: props.valueKey,
  others: props.linkedKeys || [],
})
const linkedScale = state => state.ui.get('barGraphScaleLinked')

const timelineYearScaleCalculation = data => {
  const years = data
    .map(point => point.get('year'))
    .toSet() // toSet to keep unique values
    .toArray()

  return { min: Math.min(...years), max: Math.max(...years) }
}

const mapToValue = (data, key) => data.map(v => v.get(key))

const timelineXScale = createSelector(
  sortTimelineSelector,
  data => {
    const years = mapToValue(data, 'year')
    return {
      min: years.min(),
      max: years.max(),
    }
  }
)

const timelineYScales = createSelector(
  sortTimelineSelector,
  chartScaleBy,
  (data, scaleBy) => {
    const primaryValues = mapToValue(data, scaleBy.primary)
    const scale = {
      [scaleBy.primary]: {
        min: Math.min(primaryValues.min(), 0),
        max: primaryValues.max(),
      },
    }
    scaleBy.others.forEach(key => {
      const values = mapToValue(data, key)
      scale[key] = {
        min: Math.min(values.min(), 0),
        max: values.max(),
      }
    })

    return scale
  }
)

const timelineTrueScale = createSelector(
  chartScaleBy,
  timelineXScale,
  timelineYScales,
  (scaleBy, xScale, yScales) => {
    return {
      x: xScale,
      y: yScales[scaleBy.primary],
    }
  }
)

const timelineScaleSelector = createSelector(
  chartScaleBy,
  timelineXScale,
  timelineYScales,
  linkedScale,
  (scaleBy, xScale, yScales, linked) => {
    if (linked === false) {
      return {
        x: xScale,
        y: yScales[scaleBy.primary],
      }
    }

    const yScaleImmutable = fromJS(yScales)
    return {
      x: xScale,
      y: {
        min: yScaleImmutable.minBy(v => v.get('min')).get('min'),
        max: yScaleImmutable.maxBy(v => v.get('max')).get('max'),
      },
    }
  }
)

const timelinePositionCalculation = (points, scale, grouping, size) => {
  const groupPadding = Constants.getIn(['timeline', 'groupPadding'])
  const barPadding = Constants.getIn(['timeline', 'barPadding'])
  if (grouping === 'year') {
    const totalYears = (scale.x.max - scale.x.min)
    const widthAfterPads = size.width
      - (totalYears * groupPadding)
      - ((totalYears * 4) * barPadding)
    const barWidth = widthAfterPads / ((totalYears + 1) * 4)

    let offset = 0
    let lastPoint
    const labels = []
    const bars = points.map(point => {
      if (!lastPoint || lastPoint.get('year') !== point.get('year')) {
        if (lastPoint) { offset += groupPadding }
        labels.push({
          // Add two bars width, and then subtract half a bar for centering
          offsetX: offset + (barWidth + barPadding) * 2 - (barWidth / 2),
          label: point.get('year').toString().substr(-2),
        })
      }
      const newPoint = point.set('offsetX', offset)
      offset += barPadding + barWidth
      lastPoint = newPoint
      return newPoint
    })
    return fromJS({
      bars,
      labels,
      scale,
      layout: {
        width: size.width,
        groupPadding,
        barPadding,
        barWidth,
      },
    })
  }
}

const timelinePositionSelector = createSelector(
  sortTimelineSelector,
  timelineScaleSelector,
  timelineGrouping,
  visContentSize,
  timelinePositionCalculation
)

const timelineSeekPositionSelector = createSelector(
  timelinePositionSelector,
  timelineRange,
  visContentSize,
  (data, range, size) => {
    const bars = data.get('bars')
    const start = bars.find(point => (
      point.get('year') >= range.getIn(['start', 'year']) &&
      point.get('quarter') >= range.getIn(['start', 'quarter'])
    ))
    const end = bars.findLast(point => (
      point.get('year') <= range.getIn(['end', 'year']) &&
      point.get('quarter') <= range.getIn(['end', 'quarter'])
    ))
    return {
      start: start && start.get('offsetX') || 0,
      end: end && end.get('offsetX') || size.width,
    }
  }
)

module.exports = {
  timelineGrouping,
  timelineXScale,
  timelineScaleSelector,
  timelinePositionCalculation,
  timelinePositionSelector,
  timelineSeekPositionSelector,
  timelineRange,
  timelineYearScaleCalculation,
  timelineTrueScale,
}
