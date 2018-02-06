

export const Types = {
  TOGGLE_EXPLANATION: 'toggleExplanation',
}

export const ToggleExplanation = () => ({
  type: Types.TOGGLE_EXPLANATION,
  payload: { },
})

const initialState = true
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_EXPLANATION: return !state
    default: return state
  }
}