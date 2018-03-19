import { List } from 'immutable'
import { Types as visualizationSettings } from './visualizationSettings'

export const Types = ({
  EXPAND_COLLAPSE_CONFIDENTIALITY: 'expandCollapseConfidentiality',
  RESET_VISUALIZATION: 'visualizationSettings.reset',
})

export const ExpandCollapseConfidentiality = icon => ({
  type: Types.EXPAND_COLLAPSE_CONFIDENTIALITY,
  payload: { icon },
})

const initialState = new List()
export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case Types.EXPAND_COLLAPSE_CONFIDENTIALITY:
      return state.contains(action.payload.icon)
        ? state.filter(icon => icon !== action.payload.icon)
        : state.concat(action.payload.icon)
    case Types.RESET_VISUALIZATION: return initialState
    default: return state }
}