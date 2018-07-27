import { Map } from 'immutable'

export const showData = data => ({
  type: 'BarData',
  payload: data,
})


export const barData = (state = {}, action) => {
  switch (action.type) {
    case 'BarData': {
      return action.payload }
    default: return state
  }
}
