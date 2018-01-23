const { fromJS } = require('immutable')

const Types = {
  LOAD_BINS: 'loadBins',
}

const LoadBins = bins => ({
  type: Types.LOAD_BINS,
  payload: { bins },
})

const initialState = fromJS({})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_BINS: return fromJS(action.payload.bins)
    default: return state
  }
}


module.exports = {
  Types,
  LoadBins,
  reducer,
}
