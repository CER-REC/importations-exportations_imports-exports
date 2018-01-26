
export const Types = {
  OPEN_MODAL: 'openModal',
  CLOSE_MODAL: 'closeModal',
  DISMISS_POPOVER: 'dismissPopover',
}

export const OpenModal = modal => ({
  type: Types.OPEN_MODAL,
  payload: { modal },
})

export const CloseModal = () => ({
  type: Types.CLOSE_MODAL,
  payload: { },
})

export const DismissPopover = () => ({
  type: Types.DISMISS_POPOVER,
  payload: { },
})

const initialState = ''
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_MODAL: return action.payload.modal
    case Types.CLOSE_MODAL: return ''
    case Types.DISMISS_POPOVER: return ''
    default: return state
  }
}