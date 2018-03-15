import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarterFilteredValue } from './timeline'
import { filterByTimelineAndHexData, getAggregateKey, getValueKey, activityGroupSelector, aggregateLocationSelector, selectedPieces, selection, filterByHex } from './data'
import { selectedVisualization } from './visualizationSettings'

export const detailTotal = createSelector(
  aggregateQuarterFilteredValue,
  getValueKey,
  ({ points }, valueKey) =>
    points.reduce((acc, next) => {
      if (valueKey === 'total') { return acc + next.get('total') }
      return acc + next.getIn(['values', valueKey], 0)
    }, 0),
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
