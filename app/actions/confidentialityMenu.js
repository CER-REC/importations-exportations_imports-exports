

export const Types = {
  TOGGLE_CONFIDENTIALITY_MENU: 'toggleConfidentialityMenu',
}

export const ToggleConfidentialityMenu = () => ({
  type: Types.TOGGLE_CONFIDENTIALITY_MENU,
  payload: { },
})

const initialState = false
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_CONFIDENTIALITY_MENU: return !state
    default: return state
  }
}