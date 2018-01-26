
export const Types = {
  EXPAND_SOCIALBAR: 'expandSocialBar',
  DISMISS_POPOVER: 'dismissPopover',
}

export const ExpandSocialBar = () => ({
  type: Types.EXPAND_SOCIALBAR,
  payload: { },
})

export const DismissPopover = () => ({
  type: Types.DISMISS_POPOVER,
  payload: { },
})

export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.EXPAND_SOCIALBAR: return true
    case Types.DISMISS_POPOVER: return false
    default: return false
  }
}

