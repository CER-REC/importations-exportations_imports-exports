
export const Types = {
  SCREENSHOT_MODE: 'ScreenshotMode',
}

export const ScreenshotMode = () => ({
  type: Types.SCREENSHOT_MODE,
  payload: { },
})

export const DismissComponent = () => ({
  type: Types.DISMISS_COMPONENT,
  payload: { },
})

// don't display when in screenshot mode
const initialState = false
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SCREENSHOT_MODE: return true
    case Types.DISMISS_COMPONENT: return false
    default: return initialState
  }
}
