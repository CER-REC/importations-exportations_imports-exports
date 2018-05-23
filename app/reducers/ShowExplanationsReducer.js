import { Types as visualizationSettings } from '../actions/visualizationSettings'

const defaultState = true

const ShowExplanationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ShowExplanations':
      return !state

    case 'visualizationSettings.reset':
      return defaultState

    default:
      return state
  }
}

export default ShowExplanationsReducer
