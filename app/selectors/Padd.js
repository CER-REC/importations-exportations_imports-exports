import { createSelector } from 'reselect'

import { aggregateLocationPaddSelector } from './data'

const PaddSelector = createSelector(
  aggregateLocationPaddSelector,
  points => points,
)

module.exports = {
  PaddSelector,
}
