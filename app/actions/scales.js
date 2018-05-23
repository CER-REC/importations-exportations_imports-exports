import { fromJS } from 'immutable'

export const Types = {
  LOAD_SCALES: 'loadScales',
}

export const LoadScales = scales => ({
  type: Types.LOAD_SCALES,
  payload: { scales },
})

const initialState = fromJS({})
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_SCALES: 
    return fromJS(action.payload.scales)
    default: return state
  }
}
