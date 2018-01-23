const { fromJS } = require('immutable')

const Types = {
  LOAD_DATA: 'loadData',
}

const LoadData = data => ({
  type: Types.LOAD_DATA,
  payload: { data },
})

const initialState = fromJS({})
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_DATA: return fromJS(action.payload.data)
    default: return state
  }
}


module.exports = {
  Types,
  LoadData,
  reducer,
}
