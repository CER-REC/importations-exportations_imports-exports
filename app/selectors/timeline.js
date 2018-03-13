import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import {
  activityGroupSelector,
  filterByHexSelector,
  filterByTimelineAndHexData,
  timelineRange,
  timelinePlayback,
  groupingBy as timelineGrouping,
} from './data'
import { visualizationContentPosition as visContentSize } from './viewport/'
import { visualizationSettings, selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

const getAggregateKey = (_, props) => props.aggregateKey
export const getValueKey = (_, props) => props.valueKey
const getScaleKey = (state, props) => props.scaleKey || getValueKey(state, props)

const mapToValue = (data, key) => data.map(v => v.get(key))

export const timelineScaleLinked = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'scaleLinked']),
)

export const aggregateQuarter = createSelector(
  filterByHexSelector,
  getAggregateKey,
  selectedVisualization,
  (points, aggregateKey, vizName) => {
    const valueKeys = []
    const result = aggregateQuarterPoints(points, valueKeys, aggregateKey, vizName)
    return { points: fromJS(result), valueKeys }
  },
)
const aggregateQuarterPoints = (points, valueKeys, aggregateKey, vizName) => {
  return points
    .reduce((acc, next) => {
      if (vizName === 'crudeOil' && aggregateKey === 'activity' && next.get('destination') === 'ca') {
        return acc
      }
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
      acc[period].confidential.total = (acc[period].confidential.total || 0) +
        (next.get('confidential', false) ? 1 : 0)
      acc[period].totalPoints[key] = (acc[period].totalPoints[key] || 0) + 1
      acc[period].totalPoints.total = (acc[period].totalPoints.total || 0) + 1
      return acc
    }, {})
}
export const aggregateQuarterFilteredValue = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  selectedVisualization,
  (points, aggregateKey, vizName) => {
    const valueKeys = []
    const result = aggregateQuarterPoints(points, valueKeys, aggregateKey, vizName)
    return { points: fromJS(result), valueKeys }
  },
)

export const sortTimeline = createSelector(
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

export const timelineScaleBase = createSelector(
  activityGroupSelector,
  getAggregateKey,
  selectedVisualization,
  (points, aggregateKey, vizName) => fromJS(points.reduce((acc, next) => {
    if (vizName === 'crudeOil' && aggregateKey === 'activity' && next.get('destination') === 'ca') {
      return acc
    }

    const period = next.get('period')
    if (!acc.period.min || period < acc.period.min) { acc.period.min = period }
    if (!acc.period.max || period > acc.period.max) { acc.period.max = period }

    const key = next.get(aggregateKey)
    if (!key) { return acc }

    if (!acc.values[period]) { acc.values[period] = {} }
    acc.values[period][key] = (acc.values[period][key] || 0) + next.get('value', 0)

    return acc
  }, { period: {}, values: {} })),
)

export const timelineYearScaleCalculation = createSelector(
  timelineScaleBase,
  scaleBase => ({
    min: parseInt(scaleBase.getIn(['period', 'min'], '2000Q1').substr(0, 4), 10),
    max: parseInt(scaleBase.getIn(['period', 'max'], '2000Q4').substr(0, 4), 10),
  }),
)

export const timelineScaleCalculation = createSelector(
  activityGroupSelector,
  getAggregateKey,
  selectedVisualization,
  timelineYearScaleCalculation,
  getScaleKey,
  timelineScaleLinked,
  (data, aggregateKey, vizName, yearScale, scaleKey, linked) => {
    const valueKeys = []
    const points = fromJS(aggregateQuarterPoints(data, valueKeys, aggregateKey, vizName))
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

export const timelinePositionCalculation = createSelector(
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
    let barWidth
    const labels = []
    let bars = points

    if (grouping === 'year') {
      const widthAfterPads = size.width
        - (totalYears * groupPadding)
        - ((totalYears * 4) * barPadding)
      barWidth = widthAfterPads / ((totalYears + 1) * 4)

      for (let y = scale.x.min; y <= scale.x.max; y += 1) {
        labels.push({
          offsetX: (offset + ((barWidth + barPadding) * 2)) - (barWidth / 2),
          label: y.toString().substr(-2),
        })
        for (let q = 1; q <= 4; q += 1) {
          if (bars.has(`${y}Q${q}`)) {
            bars = bars.setIn([`${y}Q${q}`, 'offsetX'], offset)
          }
          offset += barPadding + barWidth
        }
        offset += groupPadding
      }
    } else {
      const widthAfterPads = size.width
        - (groupPadding * 3)
        - ((totalYears * 4) * barPadding)
      barWidth = widthAfterPads / ((totalYears + 1) * 4)

      const labelYears = [
        scale.x.min + 2,
        scale.x.min + Math.floor(totalYears / 3),
        scale.x.max - Math.ceil(totalYears / 3),
        scale.x.max - 2,
      ]
      let quarterStart = 0

      for (let q = 1; q <= 4; q += 1) {
        for (let y = scale.x.min; y <= scale.x.max; y += 1) {
          if (labelYears.includes(y)) {
            labels.push({
              offsetX: offset,
              label: y.toString().substr(-2),
              key: `${y}Q${q}`,
            })
          }

          if (bars.has(`${y}Q${q}`)) {
            bars = bars.setIn([`${y}Q${q}`, 'offsetX'], offset)
          }
          offset += barPadding + barWidth
        }

        const dividerOffset = (offset - (barWidth / 2)) + (groupPadding / 2)
        if (q !== 4) {
          labels.push({
            offsetX: dividerOffset,
            label: '|',
            key: `divider-${q}`,
          })
        }
        labels.push({
          offsetX: ((dividerOffset - quarterStart) / 2) + quarterStart,
          label: `Q${q}`,
          fontWeight: 'bold',
        })
        quarterStart = dividerOffset

        offset += groupPadding
      }
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

export const timelineData = createSelector(
  timelineScaleCalculation,
  timelinePositionCalculation,
  timelineRange,
  timelinePlayback,
  (scale, position, range, playback) => ({ timelineRange: range, timelinePlayback: playback, ...scale, ...position }),
)

export const timelineSeekPositionSelector = createSelector(
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
      start: (typeof start !== 'undefined' ? start.get('offsetX') : 0),
      end: (typeof end !== 'undefined' ? end.get('offsetX') : size.width),
    }
  },
)
