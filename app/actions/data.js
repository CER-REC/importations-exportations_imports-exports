import { fromJS } from 'immutable'

export const Types = {
  LOAD_DATA: 'loadData',
}

export const LoadData = data => ({
  type: Types.LOAD_DATA,
  payload: { data },
})

const initialState = fromJS({})
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_DATA: return fromJS(action.payload.data)
    default: return state
  }
}
