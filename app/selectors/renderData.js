import { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import {
  filterByTimeline,
  filterByTimelineAndMap,
  filterByMap,
  getActivityFilterPredicate,
  getSubtypeFilterPredicate,
} from './core'
import { visualizationSettings } from './visualizationSettings'

export const getCountry = (_, props = {}) => props.country

export const calculateValueSum = (data, groupByRaw, valueKey) => {
  const groupByAll = [].concat(groupByRaw)
  const result = data.reduce((acc, next) => {
    groupByAll.forEach((groupBy) => {
      const rowGroup = next.get(groupBy)
      const rowKey = next.get(valueKey)

      if (!acc.values[rowGroup]) { acc.values[rowGroup] = {} }
      if (!acc.values[rowGroup][rowKey]) { acc.values[rowGroup][rowKey] = 0 }
      if (!acc.totalPoints[rowGroup]) { acc.totalPoints[rowGroup] = {} }
      if (!acc.totalPoints[rowGroup][rowKey]) { acc.totalPoints[rowGroup][rowKey] = 0 }
      if (!acc.confidential[rowGroup]) { acc.confidential[rowGroup] = {} }
      if (!acc.confidential[rowGroup][rowKey]) { acc.confidential[rowGroup][rowKey] = 0 }
      if (!acc.missing[rowGroup]) { acc.missing[rowGroup] = {} }
      if (!acc.missing[rowGroup][rowKey]) { acc.missing[rowGroup][rowKey] = 0 }

      acc.values[rowGroup][rowKey] += next.get('value', 0)
      acc.totalPoints[rowGroup][rowKey] += 1
      if (next.get('confidential', false)) {
        acc.confidential[rowGroup][rowKey] += 1
      }
      if (next.get('destination') === '(blank)') {
        acc.missing[rowGroup][rowKey] += 1
      }
    })

    return acc
  }, {
    values: {},
    totalPoints: {},
    confidential: {},
    missing: {},
  })
  return result
}
calculateValueSum.isSelector = false

export const calculateValueAverage = (data, groupByRaw, valueKey, averageByRaw) => {
  const averageBy = averageByRaw || valueKey
  const groupByAll = [].concat(groupByRaw)
  const result = data.reduce((acc, next) => {
    groupByAll.forEach((groupBy) => {
      const rowGroup = next.get(groupBy)
      const rowKey = next.get(valueKey)
      const avgKey = next.get(averageBy)

      if (!acc.values[rowGroup]) { acc.values[rowGroup] = {} }
      if (!acc.values[rowGroup][rowKey]) { acc.values[rowGroup][rowKey] = {} }
      if (!acc.values[rowGroup][rowKey][avgKey]) { acc.values[rowGroup][rowKey][avgKey] = 0 }
      if (!acc.totalPoints[rowGroup]) { acc.totalPoints[rowGroup] = {} }
      if (!acc.totalPoints[rowGroup][rowKey]) { acc.totalPoints[rowGroup][rowKey] = {} }
      if (!acc.totalPoints[rowGroup][rowKey][avgKey]) { acc.totalPoints[rowGroup][rowKey][avgKey] = 0 }
      if (!acc.confidential[rowGroup]) { acc.confidential[rowGroup] = {} }
      if (!acc.confidential[rowGroup][rowKey]) { acc.confidential[rowGroup][rowKey] = 0 }
      if (!acc.missing[rowGroup]) { acc.missing[rowGroup] = {} }
      if (!acc.missing[rowGroup][rowKey]) { acc.missing[rowGroup][rowKey] = 0 }

      acc.values[rowGroup][rowKey][avgKey] += next.get('value', 0)
      acc.totalPoints[rowGroup][rowKey][avgKey] += 1
      if (next.get('confidential', false)) {
        acc.confidential[rowGroup][rowKey] += 1
      }
      if (next.get('destination') === '(blank)') {
        acc.missing[rowGroup][rowKey] += 1
      }
    })

    return acc
  }, {
    values: {},
    totalPoints: {},
    confidential: {},
    missing: {},
  })

  Object.keys(result.values).forEach((groupKey) => {
    Object.keys(result.values[groupKey]).forEach((vk) => {
      let totalPoints = 0
      let sum = 0
      let averageByCount = 0
      Object.keys(result.values[groupKey][vk]).forEach((avgKeyFlatten) => {
        totalPoints += result.totalPoints[groupKey][vk][avgKeyFlatten]
        sum += result.values[groupKey][vk][avgKeyFlatten]
        averageByCount += 1
      })
      // If valueKey and averageBy are the same, get an overall average, otherwise
      // sum by valueKey and average across averageBy
      result.values[groupKey][vk] = (valueKey === averageBy)
        ? sum / totalPoints
        : sum / averageByCount
      result.totalPoints[groupKey][vk] = totalPoints
    })
  })

  return result
}

calculateValueAverage.isSelector = false

export const calculateValueWeighted = (data, groupByRaw, valueKey) => {
  const groupByAll = [].concat(groupByRaw)
  const result = data.reduce((acc, next) => {
    groupByAll.forEach((groupBy) => {
      const rowGroup = next.get(groupBy)
      const rowKey = next.get(valueKey)

      if (!acc.values[rowGroup]) { acc.values[rowGroup] = {} }
      if (!acc.values[rowGroup][rowKey]) { acc.values[rowGroup][rowKey] = { value: 0, amount: 0 } }
      if (!acc.totalPoints[rowGroup]) { acc.totalPoints[rowGroup] = {} }
      if (!acc.totalPoints[rowGroup][rowKey]) { acc.totalPoints[rowGroup][rowKey] = 0 }
      if (!acc.confidential[rowGroup]) { acc.confidential[rowGroup] = {} }
      if (!acc.confidential[rowGroup][rowKey]) { acc.confidential[rowGroup][rowKey] = 0 }
      if (!acc.missing[rowGroup]) { acc.missing[rowGroup] = {} }
      if (!acc.missing[rowGroup][rowKey]) { acc.missing[rowGroup][rowKey] = 0 }

      if (next.get('forAverageDivisor', 0) !== 0) {
        acc.values[rowGroup][rowKey].value += next.get('forAverageValue', 0)
        acc.values[rowGroup][rowKey].amount += next.get('forAverageDivisor', 0)
      }

      acc.totalPoints[rowGroup][rowKey] += 1
      if (next.get('confidential', false)) {
        acc.confidential[rowGroup][rowKey] += 1
      }
      if (next.get('destination') === '(blank)' || next.get('forAverageDivisor', 0) === 0) {
        acc.missing[rowGroup][rowKey] += 1
      }
    })

    return acc
  }, {
    values: {},
    totalPoints: {},
    confidential: {},
    missing: {},
  })

  Object.keys(result.values).forEach((groupKey) => {
    Object.keys(result.values[groupKey]).forEach((vk) => {
      const { amount, value } = result.values[groupKey][vk]
      result.values[groupKey][vk] = (amount !== 0)
        ? value / amount
        : 0
    })
  })

  return result
}
calculateValueWeighted.isSelector = false

export const getFullyFilteredData = createSelector(
  getCountry,
  visualizationSettings,
  filterByTimeline,
  filterByTimelineAndMap,
  getActivityFilterPredicate,
  getSubtypeFilterPredicate,
  (_, props = {}) => props.valueKey,
  (_, props = {}) => props.groupBy,
  (_, props = {}) => props.showGroup,
  (country, settings, timeline, timelineAndMap, activityFilter, subtypeFilter, valueKey, groupBy, showGroup) =>
    (country === settings.getIn(['selection', 'country'])
      ? timeline
      : timelineAndMap
    ).filter((p) => {
      if (valueKey && p.get(valueKey, '') === '') { return false }
      if (showGroup && p.get(groupBy, '') !== showGroup) { return false }
      return activityFilter(p) && subtypeFilter(p)
    }),
)

export const getFullyFilteredValues = createSelector(
  getFullyFilteredData,
  state => state.importExportVisualization,
  (_, props = {}) => props.groupBy,
  (_, props = {}) => props.valueKey,
  (_, props = {}) => props.valueAverage || false,
  (_, props = {}) => props.aggregateKey || false,
  (_, props = {}) => props.averageBy,
  (filteredRecords, selectedVisualization, groupBy, valueKey, averageMode, aggregateKey, averageBy) => {
    let data
    if (averageMode === 'weighted') {
      data = calculateValueWeighted(filteredRecords, groupBy, valueKey)
    } else if (averageMode === true) {
      if (selectedVisualization === 'naturalGasLiquids' && aggregateKey) {
        data = calculateValueAverage(filteredRecords, groupBy, aggregateKey, averageBy)
      } else {
        data = calculateValueAverage(filteredRecords, groupBy, valueKey, averageBy)
      }
    } else {
      data = calculateValueSum(filteredRecords, groupBy, valueKey)
    }
    return fromJS(data)
  },
)

export const detailBreakdownValues = createSelector(
  getFullyFilteredValues,
  state => state.importExportVisualization,
  (data, viz) => {
    if (viz !== 'crudeOilExports') { return data }
    return data.updateIn(
      ['values', 'exports'],
      fromJS({}),
      values => values.filter((_, k) => k !== 'ca'),
    )
  },
)

export const detailBreakdownTotal = createSelector(
  detailBreakdownValues,
  (_, props = {}) => props.showGroup,
  (data, showGroup) => data.get('values')
    .get(showGroup, fromJS({}))
    .reduce((acc, next) => acc + next, 0),
)

export const detailBreakdownSelector = createSelector(
  detailBreakdownValues,
  detailBreakdownTotal,
  (result, total) => result.merge({ total }),
)

export const barChartValues = createSelector(
  filterByMap,
  getActivityFilterPredicate,
  getSubtypeFilterPredicate,
  (_, props = {}) => props.groupBy,
  (_, props = {}) => props.valueKey,
  (_, props = {}) => props.valueAverage || false,
  (_, props = {}) => props.activityValueKey || false,
  (records, activityFilter, subtypeFilter, groupBy, valueKey, averageMode, activityValueKey) => {
    const filteredRecords = records.filter((p) => {
      if (valueKey && p.get(valueKey, '') === '') { return false }
      if (p.get('product') === 'crudeOilExports' && valueKey === 'activity') {
        // If there is a subtype or transport, filter them out
        if (p.get('productSubtype', '') || p.get('transport')) { return false }
      }
      if (activityValueKey) {
        return p.get('activity') === activityValueKey && subtypeFilter(p)
      }
      return activityFilter(p) && subtypeFilter(p)
    })

    let data
    if (averageMode === 'weighted') {
      data = calculateValueWeighted(filteredRecords, groupBy, valueKey)
    } else {
      data = calculateValueSum(filteredRecords, groupBy, valueKey)
    }
    return fromJS(data)
  },
)

export const barChartTotal = createSelector(
  barChartValues,
  (_, props = {}) => props.showGroup,
  (data, showGroup) => data.get('values')
    .get(showGroup, fromJS({}))
    .reduce((acc, next) => acc + next, 0),
)

export const barChartSelector = createSelector(
  barChartValues,
  barChartTotal,
  (result, total) => result.merge({ total }),
)
