import { createSelector } from 'reselect'

import { selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

export const activityOptions = createSelector(
  selectedVisualization,
  (vis) => {
    if (vis === 'crudeOil' || vis === 'refinedPetroleumProducts') {
      return ['exports']
    } else if (vis === 'naturalGas') {
      return ['importsExports', 'importsForReexport', 'exportsForReimport']
    }
    return ['importsExports', 'imports', 'exports']
  },
)

export const arrangeByOptions = createSelector(
  selectedVisualization,
  vis => ((vis === 'refinedPetroleumProducts')
    ? ['stack', 'split']
    : ['location', 'imports', 'exports']
  ),
)

export const amountOptions = state =>
  Constants.getIn(['energyMeasurementTypes', state.importExportVisualization]).toJS()

export const subtypeOptions = () => (['', 'butane', 'propane'])
