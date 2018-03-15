import { List } from 'immutable'

export const Types = ({
  EXPAND_COLLAPSE_EXPLANATION: 'expandCollapseExplanation',
  RESET_EXPLANATION: 'resetExplanation',
  RESET_VISUALIZATION: 'visualizationSettings.reset',
})

export const ExpandCollapseExplanation = dot => ({
  type: Types.EXPAND_COLLAPSE_EXPLANATION,
  payload: { dot },
})

const initialState = new List(['electricityTitleExplanation', 'crudeOilTitleExplanation',
  'naturalGasTitleExplanation', 'naturalGasLiquidsTitleExplanation',
  'refinedPetroleumProductsTitleExplanation'])
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXPAND_COLLAPSE_EXPLANATION:
      return state.contains(action.payload.dot)
        ? state.filter(dot => dot !== action.payload.dot)
        : state.concat(action.payload.dot)
    case Types.RESET_VISUALIZATION: return initialState
    default: return state
  }
}