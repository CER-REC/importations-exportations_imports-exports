import { List } from 'immutable'

export const Types = ({
  EXPAND_COLLAPSE_EXPLANATION: 'expandCollapseExplanation',
  RESET_EXPLANATION: 'resetExplanation',
})

export const ExpandCollapseExplanation = dot => ({
  type: Types.EXPAND_COLLAPSE_EXPLANATION,
  payload: { dot },
})

const initialState = new List(['resetExplanation'])
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXPAND_COLLAPSE_EXPLANATION:
      return state.contains(action.payload.dot)
        ? state.filter(dot => dot !== action.payload.dot)
        : state.concat(action.payload.dot)
    case Types.RESET_EXPLANATION:
      return initialState
    default: return state
  }
}