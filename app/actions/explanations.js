

export const Types = {
  TOGGLE_EXPLANATION: 'toggleExplanation',
}

export const ToggleExplanation = dot => ({
  type: Types.TOGGLE_EXPLANATION,
  payload: { dot },
})

const initialState = true
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_EXPLANATION: return action.dot
    default: return state
  }
}