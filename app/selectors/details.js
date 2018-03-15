import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarterFilteredValue } from './timeline'
import { filterByTimelineAndHexData, getAggregateKey, getValueKey, activityGroupSelector, aggregateLocationSelector, selectedPieces, selection, filterByHex } from './data'
import { selectedVisualization } from './visualizationSettings'

export const detailTotal = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  (data, aggregateKey, valueKey) => {
    const filteredData = valueKey === 'total'
      ? data
      : data.filter(p => (
        p.get(aggregateKey) === valueKey &&
        p.get('productSubtype', '') === '' &&
        p.get('transport', '') === ''
      ))

    if (filteredData.count() > 0 && filteredData.first().has('quantityForAverage')) {
      const sumForAvg = filteredData.reduce((acc, next) => {
        acc.revenue += next.get('revenueForAverage', 0)
        acc.amount += next.get('quantityForAverage', 0)
        return acc
      }, { revenue: 0, amount: 0 })
      // Prevent divide by zero
      if (sumForAvg.amount === 0) { return 0 }
      return sumForAvg.revenue / sumForAvg.amount
    }

    return filteredData.reduce((acc, next) => (acc + next.get('value', 0)), 0)
  },
)

export const confidentialTotal = createSelector(
  aggregateQuarterFilteredValue,
  getValueKey,
  ({ points }, valueKey) => points.reduce((acc, next) => ({
    confidential: acc.confidential + next.getIn(['confidential', valueKey], 0),
    total: acc.total + next.getIn(['totalPoints', valueKey], 0),
  }), { confidential: 0, total: 0 }),
)

export const missingDataTotal = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  (data, aggregateKey, valueKey) => {
    const filteredData = data.filter(p => p.get(aggregateKey) === valueKey)
    return {
      missing: filteredData.filter(p => (
        p.get('destination') === '(blank)' ||
        p.get('quantityForAverage', undefined) === 0
      )).count(),
      total: filteredData.count(),
    }
  },
)
