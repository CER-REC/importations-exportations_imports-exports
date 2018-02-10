const Immutable = require('immutable')

const defaults = Immutable.fromJS({
  isActive:false,
  explanationDot: null,
})

const ExplanationReducer = (state = defaults, action) => {
  switch(action.type) {

  case 'ExplanationSummoned':
    return state.merge({isActive:true, explanationDot: action.explanationDot})

  case 'ExplanationDismissed':
    return state.merge({isActive:false, explanationDot: null})

  default:
    return state
  }
}


module.exports = ExplanationReducer