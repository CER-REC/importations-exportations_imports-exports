import { List } from 'immutable'
import { Types as visualizationSettings } from './visualizationSettings'

export const Types = ({
  EXPAND_COLLAPSE_EXPLANATION: 'expandCollapseExplanation',
})

export const ExpandCollapseExplanation = dot => ({
  type: Types.EXPAND_COLLAPSE_EXPLANATION,
  payload: { dot },
})

const initialState = new List(['electricityTitleExplanation', 'crudeOilImportsTitleExplanation', 'crudeOilExportsTitleExplanation',
  'naturalGasTitleExplanation', 'naturalGasLiquidsTitleExplanation',
  'refinedPetroleumProductsTitleExplanation'])
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXPAND_COLLAPSE_EXPLANATION:
      return state.contains(action.payload.dot)
        ? state.filter(dot => dot !== action.payload.dot)
        : state.concat(action.payload.dot)
    case visualizationSettings.RESET_VISUALIZATION_STATE: return initialState
    default: return state
  }
}
