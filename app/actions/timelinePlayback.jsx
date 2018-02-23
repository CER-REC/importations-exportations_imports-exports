import { fromJS } from 'immutable'

export const Types = {
  SET_TIMELINE_PLAYBACK: 'timeline.setPlayback',
  RESET_TIMELINE_PLAYBACK: 'timeline.resetPlayback',
}

export const setTimelinePlayback = (year, quarter) => ({
  type: Types.SET_TIMELINE_PLAYBACK,
  payload: { year, quarter },
})

export const resetTimelinePlayback = () => ({
  type: Types.RESET_TIMELINE_PLAYBACK,
  payload: {},
})

const initialState = false
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_TIMELINE_PLAYBACK: return fromJS(action.payload)
    case Types.RESET_TIMELINE_PLAYBACK: return false
    default: return state
  }
}
