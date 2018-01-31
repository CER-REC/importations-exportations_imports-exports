

export const Types = {
  SHOW_EXPLANATION: 'showExplanation',
  HIDE_EXPLANATION: 'hideExplanation',
}

export const ShowExplanation = () => ({
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
    case Types.SHOW_EXPLANATION: return true
    case Types.HIDE_EXPLANATION: return initialState
    default: return state
  }
}