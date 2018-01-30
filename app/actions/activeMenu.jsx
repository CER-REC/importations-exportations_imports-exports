export const Types = {
  SET_ACTIVE_MENU: 'menu.setActive',
}

export const setActiveMenu = menu => ({
  type: Types.SET_ACTIVE_MENU,
  payload: { menu },
})

const initialState = ''
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ACTIVE_MENU: return action.payload.menu
    default: return state
  }
}
