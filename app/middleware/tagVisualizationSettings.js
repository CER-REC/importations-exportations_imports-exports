const { Types: VisSettingsTypesRaw } = require('../actions/visualizationSettings')

const VisualizationSettingsTypes = Object.values(VisSettingsTypesRaw)

const tagVisualizationSettings = store => next => action => {
  if (!VisualizationSettingsTypes.includes(action.type)) { return next(action) }

  if (!action.meta) { action.meta = {} }
  // Don't tag actions that are already tagged
  if (action.meta.visualization) { return next(action) }

  // TODO: This shouldn't mutate the action
  action.meta.visualization = store.getState().importExportVisualization
  next(action)
}

module.exports = tagVisualizationSettings
