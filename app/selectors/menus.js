import { createSelector } from 'reselect'

import { selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

export const activityOptions = createSelector(
  selectedVisualization,
  vis => ((vis === 'crudeOil') ? ['exports'] : ['importsExports', 'imports', 'exports']),
)

export const arrangeByOptions = () => (['location', 'imports', 'exports'])

export const amountOptions = state =>
  Constants.getIn(['energyMeasurementTypes', state.importExportVisualization]).toJS()

export const subtypeOptions = () => (['', 'butane', 'propane'])
