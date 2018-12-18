import Immutable from 'immutable'

export const Types = {
  RESIZE_SCREEN: 'viewport.resizeScreen',
}

export const resizeScreen = (x, y, changeWidthRatio, changeHeightRatio) => ({
  type: Types.RESIZE_SCREEN,
  payload: {
    x,
    y,
    changeWidthRatio,
    changeHeightRatio,
  },
})

const defaults = Immutable.fromJS({
  x: 0,
  y: 0,
  changeWidthRatio: 1,
  changeHeightRatio: 1,
})

export const reducer = (state = defaults, action) => {
  switch (action.type) {
    case Types.RESIZE_SCREEN:
      return state.merge(action.payload)
    default:
      return state
  }
}
