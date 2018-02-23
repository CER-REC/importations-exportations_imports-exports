import Immutable from 'immutable'

const defaults = Immutable.fromJS({
  x: 0,
  y: 0,
  changeWidthRatio: 1,
  changeHeightRatio: 1,
})

const ViewportReducer = (state = defaults, action) => {
  switch (action.type) {
    case 'ResizeScreen':
      return state.set('x', action.x).set('y', action.y). set('changeWidthRatio', action.changeWidthRatio).set('changeHeightRatio', action.changeHeightRatio)
    default:
      return state
  }
}


export default ViewportReducer
