
export const Types = {
  EXPAND_SOCIALBAR: 'expandSocialBar',
}

export const expandSocialBar = () => ({
  type: Types.EXPAND_SOCIALBAR,
  payload: { },
})

const initialState = false
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.EXPAND_SOCIALBAR: return !state
    default: return initialState
  }
}

