const defaultState = false

const ShowAboutWindowReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ShowAboutWindow':
      return true

      // TODO: reset visualization state
      // case 'ResetVisualization':
      //   return defaultState

    default:
      return defaultState
  }
}

module.exports = ShowAboutWindowReducer
