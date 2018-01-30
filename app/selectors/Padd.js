import { createSelector } from 'reselect'

import { aggregateLocationPaddSelector } from './data'

const PaddSelector = createSelector(
  aggregateLocationPaddSelector,
  (points) =>{
    return points
  },
)

module.exports = {
  PaddSelector,
}
