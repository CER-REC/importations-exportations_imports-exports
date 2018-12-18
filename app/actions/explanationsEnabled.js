import { Types as VisualizationSettingsTypes } from './visualizationSettings'

export const Types = {
  ENABLE_EXPLANATIONS: 'explanations.enable',
}

export const enableExplanations = enabled => ({
  type: Types.ENABLE_EXPLANATIONS,
  payload: { enabled },
})

const initialState = true
export const reducer = (state = initialState, action) => {
  if (action.type === VisualizationSettingsTypes.RESET_VISUALIZATION_STATE) {
    return initialState
  }
  if (action.type !== Types.ENABLE_EXPLANATIONS) { return state }
  return action.payload.enabled
}
