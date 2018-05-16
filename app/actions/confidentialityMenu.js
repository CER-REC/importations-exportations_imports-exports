import { Types as visualizationSettings } from './visualizationSettings'

export const Types = {
  TOGGLE_CONFIDENTIALITY_MENU: 'toggleConfidentialityMenu',
  RESET_VISUALIZATION: 'visualizationSettings.reset',
}

export const ToggleConfidentialityMenu = () => ({
  type: Types.TOGGLE_CONFIDENTIALITY_MENU,
  payload: { },
})

const initialState = true
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_CONFIDENTIALITY_MENU: return !state
    case Types.RESET_VISUALIZATION: return initialState
    default: return state
  }
}