const DataTypes = require('../actions/data').Types
const { Types } = require('../actions/DataLoadComplete.js')

const DataLoaded = store => next => (action) => {
  next(action)
  if (action.type !== DataTypes.LOAD_DATA) { return }

  const state = store.getState()
  const { data } = state
  if (data.count() > 0) {
    store.dispatch({
      type: Types.DATA_LOADING_COMPLETE,
      payload: { isLoadingComplete: true },
    })
  }
}

module.exports = DataLoaded
