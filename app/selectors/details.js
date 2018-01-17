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
