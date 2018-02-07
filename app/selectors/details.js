import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarter, getValueKey } from './timeline'

export const detailTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) =>
    points.reduce((acc, next) => acc + next.getIn(['values', valueKey], 0), 0),
)

export const confidentialTotal = createSelector(
  aggregateQuarter,
  getValueKey,
  ({ points }, valueKey) => points.reduce((acc, next) => ({
    confidential: acc.confidential + next.getIn(['confidential', valueKey], 0),
    total: acc.total + next.getIn(['totalPoints', valueKey], 0),
  }), { confidential: 0, total: 0 }),
)


