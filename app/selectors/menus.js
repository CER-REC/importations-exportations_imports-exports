import { createSelector } from 'reselect'

import { selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

export const activityOptions = createSelector(
  selectedVisualization,
  (vis) => {
    if (vis === 'refinedPetroleumProducts') {
      return ['exports']
    } else if (vis === 'crudeOilImports') {
      return ['imports']
    } else if (vis === 'crudeOilExports') {
      return ['exports']
    } else if (vis === 'naturalGas') {
      return ['importsExports', 'importsForReexport', 'exportsForReimport']
    }
    return ['importsExports', 'imports', 'exports']
  },
)

export const arrangeByOptions = createSelector(
  selectedVisualization,
  (vis) => {
    if (vis === 'crudeOilExports') {
      return ['location', 'exports']
    } else if (vis === 'crudeOilImports') {
      return ['location', 'imports']
    } else if (vis === 'refinedPetroleumProducts') {
      return ['stack', 'split']
    } else if (vis === 'naturalGasLiquids') {
      return ['location', 'amount']
    }
    return ['location', 'imports', 'exports']
  },
)

export const amountOptions = state =>
  Constants.getIn(['energyMeasurementTypes', state.importExportVisualization]).toJS()

export const subtypeOptions = () => (['', 'Butane', 'Propane'])
