
export const Types = {
  EXPAND_SOCIALBAR: 'expandSocialBar',
  COLLAPSE_SOCIALBAR: 'collapseSocialBar',
}

export const ExpandSocialBar = () => ({
  type: Types.EXPAND_SOCIALBAR,
  payload: { },
})

export const CollapseSocialBar = () => ({
  type: Types.COLLAPSE_SOCIALBAR,
  payload: { },
})

export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.EXPAND_SOCIALBAR: return true
    case Types.COLLAPSE_SOCIALBAR: return false
    default: return state
  }
}

