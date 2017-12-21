const fromJS = require('immutable').fromJS

const Types = {
  BARGRAPH_SCALE_LINKED: 'bargraph.scaleLinked',
}

const bargraphScaleLinked = linked => ({
  type: Types.BARGRAPH_SCALE_LINKED,
  payload: { linked },
})

const initialState = fromJS({
  barGraphScaleLinked: true,
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BARGRAPH_SCALE_LINKED:
      return state.set('barGraphScaleLinked', action.payload.linked)
    default: return state
  }
}

module.exports = {
  Types,
  bargraphScaleLinked,
  reducer,
}
