import { createSelector } from 'reselect'

import { aggregateLocationPaddSelector } from './data'
import { visualizationSettings } from './visualizationSettings'

export const getSelectionSettings = createSelector(
  visualizationSettings,
  settings => settings.get('selection'),
)

export const getSubtype = createSelector(
  visualizationSettings,
  settings => settings.get('subtype'),
)

export const PaddSelector = createSelector(
  aggregateLocationPaddSelector,
  points => points,
)
