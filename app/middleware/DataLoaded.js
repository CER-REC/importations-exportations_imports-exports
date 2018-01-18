const DataTypes = require('../actions/data').Types
const { Types } = require('../actions/DataLoadComplete.js')

const DataLoaded = store => next => (action) => {
  next(action)
  if (action.type !== DataTypes.LOAD_DATA) { return }

  const state = store.getState()
  const { data } = state

  const dataLoaderState = {
    type: Types.DATA_LOADING_COMPLETE,
    payload: { isLoadingComplete: false },
  }
  if (data.count() > 0) {
    dataLoaderState.payload.isLoadingComplete = true
  }
  store.dispatch(dataLoaderState)
}

module.exports = DataLoaded
