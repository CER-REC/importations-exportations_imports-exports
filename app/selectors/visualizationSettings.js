import { createSelector } from 'reselect'

export const visualizationSettings = state =>
  state.visualizationSettings[state.importExportVisualization]

export const showImportsSelector = createSelector(
  visualizationSettings,
  settings => ['imports', 'importsExports'].includes(settings.get('activity')),
)

export const showExportsSelector = createSelector(
  visualizationSettings,
  settings => ['exports', 'importsExports'].includes(settings.get('activity')),
)
