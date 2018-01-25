import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { filterByHexSelector } from './data'
import { visualizationContentPosition as visContentSize } from './viewport/'
import { visualizationSettings } from './visualizationSettings'
import Constants from '../Constants'

const getAggregateKey = (_, props) => props.aggregateKey
const getValueKey = (_, props) => props.valueKey
const getScaleKey = (state, props) => props.scaleKey || getValueKey(state, props)

const mapToValue = (data, key) => data.map(v => v.get(key))

const timelineGrouping = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'grouping']),
)
const timelineRange = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'range']),
)
const timelineScaleLinked = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'scaleLinked']),
)

const aggregateQuarter = createSelector(
  filterByHexSelector,
  getAggregateKey,
  (points, aggregateKey) => {
    const valueKeys = []
    const result = points
      .reduce((acc, next) => {
        const period = next.get('period')
        if (!acc[period]) {
          acc[period] = {
            units: next.get('units'),
            period,
            year: next.get('year'),
            quarter: next.get('quarter'),
            total: 0,
            values: {},
            confidential: {},
            totalPoints: {},
          }
        }

        const key = next.get(aggregateKey)
        if (!key) { return acc }

        if (!valueKeys.includes(key)) { valueKeys.push(key) }
        acc[period].values[key] = (acc[period].values[key] || 0) + next.get('value', 0)
        acc[period].total += next.get('value', 0)
        acc[period].confidential[key] = (acc[period].confidential[key] || 0) +
          (next.get('confidential', false) ? 1 : 0)
        acc[period].totalPoints[key] = (acc[period].totalPoints[key] || 0) + 1
        return acc
      }, {})
    return { points: fromJS(result), valueKeys }
  },
)

const sortTimeline = createSelector(
  aggregateQuarter,
  timelineGrouping,
  ({ points }, grouping) => points.sort((a, b) => {
    if (grouping === 'year') {
      const year = a.get('year') - b.get('year')
      return (year !== 0) ? year : (a.get('quarter') - b.get('quarter'))
    }

    const quarter = a.get('quarter') - b.get('quarter')
    return (quarter !== 0) ? quarter : (a.get('year') - b.get('year'))
  }),
)

const timelineYearScaleCalculation = createSelector(
  sortTimeline,
  (points) => {
    const years = mapToValue(points, 'year')
    return { min: years.min() || 0, max: years.max() || 0 }
  },
)

const timelineScaleCalculation = createSelector(
  sortTimeline,
  aggregateQuarter,
  timelineYearScaleCalculation,
  getScaleKey,
  timelineScaleLinked,
  (points, { valueKeys }, yearScale, scaleKey, linked) => {
    const values = mapToValue(points, 'values')

    let valuesScale = valueKeys.reduce((acc, next) => {
      const valueList = values.map(v => v.get(next, 0))
      return acc.merge({
        [next]: {
          min: Math.min(0, valueList.min()),
          max: valueList.max(),
        },
      })
    }, fromJS({}))

    if (scaleKey === 'total') {
      const totals = points.map(p => p.get('total'))
      valuesScale = valuesScale.set('total', fromJS({
        min: totals.min() || 0,
        max: totals.max() || 0,
      }))
    }

    const scaleY = !linked
      ? valuesScale.get(scaleKey, fromJS({ min: 0, max: 0 }))
      : {
        min: valuesScale.map(v => v.get('min')).min() || 0,
        max: valuesScale.map(v => v.get('max')).max() || 0,
      }

    return {
      scale: fromJS({ x: yearScale, y: scaleY }),
      trueScale: valuesScale.get(scaleKey, fromJS({ min: 0, max: 0 })),
    }
  },
)

const timelinePositionCalculation = createSelector(
  sortTimeline,
  timelineScaleCalculation,
  timelineGrouping,
  visContentSize,
  (points, { scale: scaleRaw }, grouping, size) => {
    const scale = scaleRaw.toJS()
    const groupPadding = Constants.getIn(['timeline', 'groupPadding'])
    const barPadding = Constants.getIn(['timeline', 'barPadding'])
    const totalYears = (scale.x.max - scale.x.min)
    let offset = 0
    let lastPoint
    let bars
    let barWidth
    const labels = []

    if (grouping === 'year') {
      const widthAfterPads = size.width
        - (totalYears * groupPadding)
        - ((totalYears * 4) * barPadding)
      barWidth = widthAfterPads / ((totalYears + 1) * 4)

      bars = points.map((point) => {
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
    } else {
      barWidth = (size.width - (points.count() * barPadding)) / points.count()

      const labelYears = [
        scale.x.min + 2,
        scale.x.min + Math.floor(totalYears / 3),
        scale.x.max - Math.ceil(totalYears / 3),
        scale.x.max - 2,
      ]
      let quarterStart = 0

      bars = points.map((point) => {
        if (lastPoint && lastPoint.get('quarter') !== point.get('quarter')) {
          const dividerOffset = offset - barWidth / 2
          labels.push({
            offsetX: dividerOffset,
            label: '|',
            key: `divider-${point.get('quarter')}`,
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
        label: `Q${points.last().get('quarter')}`,
      })
    }

    return {
      bars: fromJS(bars),
      labels: fromJS(labels),
      layout: fromJS({
        width: size.width,
        groupPadding,
        barPadding,
        barWidth,
      }),
    }
  },
)

const timelineData = createSelector(
  timelineScaleCalculation,
  timelinePositionCalculation,
  timelineRange,
  (scale, position, range) =>
    Object.assign({ timelineRange: range }, scale, position),
)

const timelineSeekPositionSelector = createSelector(
  timelineData,
  visContentSize,
  ({ bars, timelineRange: range }, size) => {
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
  },
)

module.exports = {
  timelineGrouping,
  timelineRange,
  timelineScaleLinked,
  aggregateQuarter,
  sortTimeline,
  timelineYearScaleCalculation,
  timelineScaleCalculation,
  timelinePositionCalculation,
  timelineData,
  timelineSeekPositionSelector,
  getValueKey,
}
