
export const Types = {
  OPEN_MODAL: 'openModal',
  CLOSE_MODAL: 'closeModal',
  DISMISS_COMPONENT: 'dismissComponent',
}

export const OpenModal = modal => ({
  type: Types.OPEN_MODAL,
  payload: { modal },
})

export const CloseModal = () => ({
  type: Types.CLOSE_MODAL,
  payload: { },
})

export const DismissComponent = () => ({
  type: Types.DISMISS_COMPONENT,
  payload: { },
})

const initialState = ''
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_MODAL: return action.payload.modal
    case Types.CLOSE_MODAL: return ''
    case Types.DISMISS_COMPONENT: return ''
    default: return state
  }
}