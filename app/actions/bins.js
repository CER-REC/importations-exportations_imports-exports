import { fromJS } from 'immutable'

export const Types = {
  LOAD_BINS: 'loadBins',
}

export const LoadBins = bins => ({
  type: Types.LOAD_BINS,
  payload: { bins },
})

const initialState = fromJS({})
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_BINS: return fromJS(action.payload.bins)
    default: return state
  }
}
