import { Map } from 'immutable'
import { Types as visualizationSettings } from './visualizationSettings'

export const Types = ({
  TOGGLE_OUTLIER_DISPLAY: 'outlier.toggle',
})

export const toggleOutlier = (activity, positive, period) => ({
  type: Types.TOGGLE_OUTLIER_DISPLAY,
  payload: { activity, positive, period },
})

const initialState = new Map()
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.TOGGLE_OUTLIER_DISPLAY: {
      const { activity, positive, period } = action.payload
      return state.updateIn(
        [activity, positive ? 'positive' : 'negative'],
        oldVal => (oldVal === period ? '' : period),
      )
    }

    // If any actions are taken that change the data, reset the expanded outliers
    case visualizationSettings.SET_AMOUNT:
    case visualizationSettings.SET_ACTIVITY:
    case visualizationSettings.SET_SUBTYPE:
    case visualizationSettings.SET_SELECTION:
    case visualizationSettings.RESET_VISUALIZATION:
    case visualizationSettings.RESET_VISUALIZATION_STATE:
      return initialState

    default: return state
  }
}
