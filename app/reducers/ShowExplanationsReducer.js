const defaultState = true

const ShowExplanationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ShowExplanations':
      return !state

      // TODO: reset visualization state
      // case 'ResetVisualization':
      //   return defaultState

    default:
      return state
  }
}

export default ShowExplanationsReducer
