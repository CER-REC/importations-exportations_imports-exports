const { fromJS } = require('immutable')
const { combineReducers } = require('redux')

const Types = {
  DATA_LOADING_COMPLETE: 'data_loading_complete',
}

const DataLoadComplete = isLoadingComplete => ({
  type: Types.DATA_LOADING_COMPLETE,
  payload: { isLoadingComplete },
})

const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.DATA_LOADING_COMPLETE: return action.payload.isLoadingComplete
    default: return state
  }
}

module.exports = {
  Types,
  DataLoadComplete,
  reducer,
}
