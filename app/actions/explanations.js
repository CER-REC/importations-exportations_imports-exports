

export const Types = {
  SHOW_EXPLANATION: 'showExplanation',
  HIDE_EXPLANATION: 'hideExplanation',
  DISMISS_COMPONENT: 'dismissComponent1',
}

export const ToggleExplanation = () => ({
  type: Types.SHOW_EXPLANATION,
  payload: { },
})

export const HideExplanation = () => ({
  type: Types.HIDE_EXPLANATION,
  payload: { },
})

const initialState = false
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOW_EXPLANATION: return !state
    case Types.HIDE_EXPLANATION: return initialState
    default: return state
  }
}