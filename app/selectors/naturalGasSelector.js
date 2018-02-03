import { createSelector } from 'reselect'

import { visualizationSettings } from './visualizationSettings'

export const getSelectionSettings = createSelector(
  visualizationSettings,
  settings => settings.get('selection'),
)
