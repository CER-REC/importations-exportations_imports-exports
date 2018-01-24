

const Types = {
  SHOW_CONFIDENTIALITY: 'showConfidentiality',
}

const ShowConfidentiality = () => ({
  type: Types.SHOW_CONFIDENTIALITY,
  payload: { },
})

const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.SHOW_CONFIDENTIALITY: return !state
    default: return false
  }
}


module.exports = {
  Types,
  ShowConfidentiality,
  reducer,
}