import { List } from 'immutable'
 
export const Types = ({
  EXPAND_COLLAPSE_CONFIDENTIALITY: 'expandCollapseConfidentiality',
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
    default: return state }
}