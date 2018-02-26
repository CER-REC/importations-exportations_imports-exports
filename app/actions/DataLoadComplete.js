export const Types = {
  DATA_LOADING_COMPLETE: 'data_loading_complete',
}

export const DataLoadComplete = isLoadingComplete => ({
  type: Types.DATA_LOADING_COMPLETE,
  payload: { isLoadingComplete },
})

export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.DATA_LOADING_COMPLETE: return action.payload.isLoadingComplete
    default: return state
  }
}
