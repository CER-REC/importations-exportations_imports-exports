import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarter, getValueKey } from './timeline'
import { aggregateLocationSelector } from './data'

export const detailTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) =>
    points.reduce((acc, next) => {
      if (valueKey === 'total') { return acc + next.get('total') }
      return acc + next.getIn(['values', valueKey], 0)
    }, 0),
)

export const confidentialTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) => points.reduce((acc, next) => ({
    confidential: acc.confidential + next.getIn(['confidential', valueKey], 0),
    total: acc.total + next.getIn(['totalPoints', valueKey], 0),
  }), { confidential: 0, total: 0 }),
)

export const missingDataTotal = createSelector(
  aggregateLocationSelector,
  data => data.reduce((acc, next) => ({
    missing: acc.missing + (next.get('origin') === '(blank)' ? next.get('totalCount', 0) : 0),
    total: acc.total + next.get('totalCount', 0),
  }), { missing: 0, total: 0 }),
)
