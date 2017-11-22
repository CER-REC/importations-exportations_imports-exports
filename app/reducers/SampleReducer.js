// TODO: Delete this file

const Immutable = require('immutable')

const SampleReducer = (state = Immutable.List(), action) => {

  switch(action.type) {
  case 'Append':
    return state.push(action.item)
  case 'Reset':
    return Immutable.List()
  default:
    return state
  }

}

module.exports = SampleReducer