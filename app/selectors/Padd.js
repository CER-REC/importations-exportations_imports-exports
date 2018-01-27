import { createSelector } from 'reselect'
import Immutable from 'immutable'

import { aggregateLocationPaddSelector, arrangeBy, unitSelector } from './data'
import { visualizationSettings } from './visualizationSettings'

const selectedVisualization = state => state.importExportVisualization

const PaddSelector = createSelector(
  aggregateLocationPaddSelector,
  (points) => {
    return points
  }
)

module.exports = {
  PaddSelector
}
