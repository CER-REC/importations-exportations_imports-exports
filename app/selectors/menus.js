import Constants from '../Constants'

export const activityOptions = () => (['imports', 'exports', 'importsExports'])

export const arrangeByOptions = () => (['location', 'imports', 'exports'])

export const amountOptions = state =>
  Constants.getIn(['energyMeasurementTypes', state.importExportVisualization]).toJS()

export const subtypeOptions = () => (['', 'butane', 'propane'])
