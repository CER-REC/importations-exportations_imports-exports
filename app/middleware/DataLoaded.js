import { Types as DataTypes } from '../actions/data'
import { Types } from '../actions/DataLoadComplete'

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

export default DataLoaded
