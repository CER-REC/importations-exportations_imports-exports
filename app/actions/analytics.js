import { fromJS } from 'immutable'

export const Types = {
  LOAD_ANALYTICS: 'loadAnalytics',
}

export const SetUpAnalytics = analytics => ({
  type: Types.LOAD_ANALYTICS,
  payload: { analytics },
})

const initialState = fromJS({})
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_ANALYTICS: return state
    default: return state
  }
}
