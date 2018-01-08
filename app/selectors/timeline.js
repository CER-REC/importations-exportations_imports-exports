const createSelector = require('reselect').createSelector
const fromJS = require('immutable').fromJS

const { filterByHexSelector }= require('./data')
const { visualizationContentPosition: visContentSize } = require('./viewport/')
const Constants = require('../Constants.js')

const timelineGrouping = state => state.ui.get('timelineGroup')
const timelineRange = state => state.ui.get('timelineRange')
const chartScaleBy = (_, props) => ({
  primary: props.valueKey,
  others: props.linkedKeys || [],
})
const linkedScale = state => state.ui.get('barGraphScaleLinked')

const aggregateQuarterSelector = createSelector(
  filterByHexSelector,
  points => {
    const result = points.reduce((acc, next) => {
      const period = next.get('period')
      // Safe to mutate the acc argument as we created it for only this reduce
      if (!acc[period]) {
        acc[period] = {
          units: next.get('units'),
          period,
          year: next.get('year'),
          quarter: next.get('quarter'),
          imports: 0,
          exports: 0,
        }
      }

      const activity = next.get('activity')
      const currentVal = acc[period][activity] || 0
      acc[period][activity] = (currentVal + next.get('value'))

      return acc
    }, {})
    return fromJS(result)
  }
)

const sortTimelineSelector = createSelector(
  aggregateQuarterSelector,
  timelineGrouping,
  (points, grouping) => points.sort((a, b) => {
    if (grouping === 'year') {
      const year = a.get('year') - b.get('year')
      return (year !== 0) ? year : (a.get('quarter') - b.get('quarter'))
    }

    const quarter = a.get('quarter') - b.get('quarter')
    return (quarter !== 0) ? quarter : (a.get('year') - b.get('year'))
  })
)

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
  const totalYears = (scale.x.max - scale.x.min)
  let offset = 0
  let lastPoint
  const labels = []

  if (grouping === 'year') {
    const widthAfterPads = size.width
      - (totalYears * groupPadding)
      - ((totalYears * 4) * barPadding)
    const barWidth = widthAfterPads / ((totalYears + 1) * 4)

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
  } else {
    const barWidth = (size.width - (points.count() * barPadding)) / points.count()

    const labelYears = [
      scale.x.min + 2,
      scale.x.min + Math.floor(totalYears / 3),
      scale.x.max - Math.ceil(totalYears / 3),
      scale.x.max - 2,
    ]
    let quarterStart = 0

    const bars = points.map(point => {
      if (lastPoint && lastPoint.get('quarter') !== point.get('quarter')) {
        const dividerOffset = offset - barWidth / 2
        labels.push({
          offsetX: dividerOffset,
          label: '|',
          key: `divider-${point.get('quarter')}`
        })
        labels.push({
          offsetX: (dividerOffset - quarterStart) / 2 + quarterStart,
          label: `Q${lastPoint.get('quarter')}`,
          fontWeight: 'bold',
        })
        quarterStart = dividerOffset
      }
      if (labelYears.includes(point.get('year'))) {
        labels.push({
          offsetX: offset,
          label: point.get('year').toString().substr(-2),
          key: point.get('period'),
        })
      }
      const newPoint = point.set('offsetX', offset)
      offset += barPadding + barWidth
      lastPoint = newPoint
      return newPoint
    })

    labels.push({
      offsetX: (offset - quarterStart) / 2 + quarterStart,
      label: `Q${points.last().get('quarter')}`
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
