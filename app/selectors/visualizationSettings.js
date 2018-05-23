import { createSelector } from 'reselect'

/* eslint-disable no-underscore-dangle */
export const selectedVisualization = (state, props = {}) =>
  props._overrideVisualization || state.importExportVisualization
export const arrangeByOverride = (_, props = {}) => props._overrideArrangeBy
export const amountOverride = (_, props = {}) => props._overrideAmount
export const activityGroupOverride = (_, props = {}) => props._overrideActivityGroup
/* eslint-enable no-underscore-dangle */

const allSettings = state => state.visualizationSettings

export const visualizationSettings = createSelector(
  allSettings,
  selectedVisualization,
  (settings, vis) => settings[vis],
)

export const showImportsSelector = createSelector(
  visualizationSettings,
  settings => ['imports', 'importsExports', 'importsForReexport'].includes(settings.get('activity')),
)

export const showExportsSelector = createSelector(
  visualizationSettings,
  settings => ['exports', 'importsExports', 'exportsForReimport'].includes(settings.get('activity')),
)

export const scaledLinkedSelector = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'scaleLinked']),
)
