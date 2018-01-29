

export const Types = {
  SHOW_EXPLANATION: 'showExplanation',
  HIDE_EXPLANATION: 'hideExplanation',
}

export const ShowExplanation = popover => ({
  type: Types.SHOW_EXPLANATION,
  payload: { popover },
})

export const HideExplanation = () => ({
  type: Types.HIDE_EXPLANATION,
  payload: { },
})

const initialState = ''
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOW_EXPLANATION: return action.payload.popover
    case Types.HIDE_EXPLANATION: return state
    default: return state
  }
}