import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarterFilteredValue, getValueKey } from './timeline'
import { aggregateLocationSelector, selectedPieces, selection, filterByHex } from './data'
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
  aggregateLocationSelector,
  selectedPieces,
  selectedVisualization,
  selection,
  (data, selectedMapPieces, visualization, selectionState) => data
    .filter(p => filterByHex(p, selectedMapPieces, visualization, selectionState))
    .reduce((acc, next) => ({
      missing: acc.missing + (next.get('origin') === '(blank)' ? next.get('totalCount', 0) : 0),
      total: acc.total + next.get('totalCount', 0),
    }), { missing: 0, total: 0 }),
)
