import { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import { getVisualizationData } from './core'
import { barChartValues } from './renderData'

import {
  getAggregateKey,
  getValueKey,
  timelineRange,
  timelinePlayback,
  timeLineScaleSelector,
  groupingBy as timelineGrouping,
  selectedActivityGroup
} from './data'
import { visualizationContentPosition as visContentSize } from './viewport/'
import { selectedVisualization, scaledLinkedSelector } from './visualizationSettings'
import Constants from '../Constants'

export const getScaleKey = (state, props = {}) => props.scaleKey || getValueKey(state, props)

export const mapToValue = (data, key) => data.map(v => v.get(key))
mapToValue.isSelector = false

export const timelineScaleBase = createSelector(
  getVisualizationData,
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

const scaleBytype = (yaxis, xaxis, scaleLinked, type) => {
  const scale = {}
  yaxis.entrySeq().forEach(([activity, activityValue]) => {
    if (!scale[activity]) {
      scale[activity] = {}
    }
    if (activityValue.get(type)) {
      activityValue.get(type).keySeq().forEach((category) => {
        if (!scale[activity][category]) {
          scale[activity][category] = {
            y: {
              min: 0,
              max: 0,
            },
            x: {
              min: xaxis.min,
              max: xaxis.max,
            },
          }
        }
        if (scaleLinked) {
          let result = yaxis.getIn(['exports', type, category]) > yaxis.getIn(['imports', type, category])
            ? yaxis.getIn(['exports', type, category])
            : yaxis.getIn(['imports', type, category])
          if (!result && !yaxis.getIn(['exports', type, category])) {
            result = yaxis.getIn(['imports', type, category])
          } else if (!result && !yaxis.getIn(['imports', type, category])) {
            result = yaxis.getIn(['exports', type, category])
          }
          scale[activity][category].y.max = result
        } else {
          scale[activity][category].y.max = yaxis.getIn([activity, type, category])
        }
      })
    }
  })
  return fromJS(scale)
}

export const timeLineScaleValueByProductSubtype = createSelector(
  timeLineScaleSelector,
  timelineYearScaleCalculation,
  scaledLinkedSelector,
  (yaxis, xaxis, scaleLinked) => scaleBytype(yaxis, xaxis, scaleLinked, 'productSubtype'),
)

export const timeLineScaleValueByTransport = createSelector(
  timeLineScaleSelector,
  timelineYearScaleCalculation,
  scaledLinkedSelector,
  (yaxis, xaxis, scaleLinked) => scaleBytype(yaxis, xaxis, scaleLinked, 'transport'),
)

export const timeLineScaleValue = createSelector(
  timeLineScaleSelector,
  timelineYearScaleCalculation,
  scaledLinkedSelector,
  selectedActivityGroup,
  (yaxis, xaxis, scaleLinked, activityGroup) => {
    const exportsText = activityGroup === 'importsExports' ? 'exports': activityGroup
    const importsText = activityGroup === 'importsExports' ? 'imports': activityGroup
    if (scaleLinked) {
      let result = yaxis.getIn([exportsText, 'activityTotal']) > yaxis.getIn([importsText, 'activityTotal']) ?
        yaxis.getIn([exportsText, 'activityTotal']) : yaxis.getIn([importsText, 'activityTotal'])
      if (!result && !yaxis.getIn([exportsText, 'activityTotal'])) {
        result = yaxis.getIn([importsText, 'activityTotal'])
      } else if (!result && !yaxis.getIn([importsText, 'activityTotal'])) {
        result = yaxis.getIn([exportsText, 'activityTotal'])
      }
      return fromJS({
        exports: {
          y: {
            min: 0,
            max: result,
          },
          x: {
            min: xaxis.min,
            max: xaxis.max,
          },
        },
        imports: {
          y: {
            min: 0,
            max: result,
          },
          x: {
            min: xaxis.min,
            max: xaxis.max,
          },
        },
      })
    }
    return fromJS({
      exports: {
        y: {
          min: 0,
          max: yaxis.getIn([exportsText, 'activityTotal']),
        },
        x: {
          min: xaxis.min,
          max: xaxis.max,
        },
      },
      imports: {
        y: {
          min: 0,
          max: yaxis.getIn([importsText, 'activityTotal']),
        },
        x: {
          min: xaxis.min,
          max: xaxis.max,
        },
      },
    })
  },
)

export const timelinePositionCalculation = createSelector(
  timelineGrouping,
  visContentSize,
  timelineYearScaleCalculation,
  (grouping, size, scale) => {
    const groupPadding = Constants.getIn(['timeline', 'groupPadding'])
    const barPadding = Constants.getIn(['timeline', 'barPadding'])
    const totalYears = (scale.max - scale.min)
    let offset = 0
    let barWidth
    const labels = []
    const barPositions = {}
    if (grouping === 'year') {
      const widthAfterPads = size.width
        - ((totalYears * 4) * barPadding)
        - (totalYears * groupPadding)
      barWidth = widthAfterPads / ((totalYears + 1) * 4)

      for (let y = scale.min; y <= scale.max; y += 1) {
        labels.push({
          offsetX: (offset + ((barWidth + barPadding) * 2)) - (barWidth / 2),
          label: y.toString().substr(-2),
        })
        for (let q = 1; q <= 4; q += 1) {
          barPositions[`${y}Q${q}`] = offset
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
        scale.min + 2,
        scale.min + Math.floor(totalYears / 3),
        scale.max - Math.ceil(totalYears / 3),
        scale.max - 2,
      ]
      let quarterStart = 0

      for (let q = 1; q <= 4; q += 1) {
        for (let y = scale.min; y <= scale.max; y += 1) {
          if (labelYears.includes(y)) {
            labels.push({
              offsetX: offset,
              label: y.toString().substr(-2),
              key: `${y}Q${q}`,
            })
          }

          barPositions[`${y}Q${q}`] = offset
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
      labels: fromJS(labels).sortBy(l => l.get('offsetX')),
      barPositions: fromJS(barPositions).sort(),
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
  timelineRange,
  timelinePlayback,
  timelineYearScaleCalculation,
  timelinePositionCalculation,
  barChartValues,
  (range, playback, scale, position, data) => ({
    timelineRange: range,
    timelinePlayback: playback,
    bars: data,
    ...scale,
    ...position,
  }),
)

export const timelineSeekPositionSelector = createSelector(
  timelineRange,
  timelinePositionCalculation,
  visContentSize,
  (range, { barPositions }, size) => {
    const start = barPositions
      .get(`${range.getIn(['start', 'year'])}Q${range.getIn(['start', 'quarter'])}`, 0)
    const end = barPositions
      .get(`${range.getIn(['end', 'year'])}Q${range.getIn(['end', 'quarter'])}`, size.width)
    return { start, end }
  },
)
