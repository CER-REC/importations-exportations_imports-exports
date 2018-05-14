import { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import { getVisualizationData, getActivityFilterPredicate, filterByTimelineAndMap } from './core'
import { } from './renderData'

import {
  getAggregateKey,
  unitSelector,
  getValueKey,
  selectedActivityGroup,
  timelineRange,
  timelinePlayback,
  groupingBy as timelineGrouping,
} from './data'
import { visualizationContentPosition as visContentSize } from './viewport/'
import { visualizationSettings, selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

export const getScaleKey = (state, props) => props.scaleKey || getValueKey(state, props)

export const mapToValue = (data, key) => data.map(v => v.get(key))

export const sortTimeline = createSelector(
  timelineGrouping,
  ({ points }, grouping) => points.sort((a, b) => {
    if (grouping === 'period') {
      const year = a.get('year') - b.get('year')
      return (year !== 0) ? year : (a.get('quarter') - b.get('quarter'))
    }
  }),
)

export const timelineScaleBase = createSelector(
  filterByTimelineAndMap,
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

export const timelinePositionCalculation = createSelector(
  sortTimeline,
  timelineGrouping,
  visContentSize,
  (points, grouping, size) => {
    const scale = timeLineScale
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
  timelinePositionCalculation,
  timelineRange,
  timelinePlayback,
  (position, range, playback) => ({ timelineRange: range, timelinePlayback: playback, ...scale, ...position }),
)