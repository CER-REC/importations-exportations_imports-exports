import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarter, getValueKey } from './timeline'

// const mapToValue = (data, key) => data.map(v => v.get(key))

export const detailTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) =>
    points.reduce((acc, next) => acc + next.getIn(['values', valueKey], 0), 0)
)

export const confidentialTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) => {
    return points.reduce((acc, next) => ({
      confidential: acc.confidential + next.getIn(['confidential', valueKey], 0),
      total: acc.total + next.getIn(['totalPoints', valueKey], 0),
    }), { confidential: 0, total: 0 })
  },
)
