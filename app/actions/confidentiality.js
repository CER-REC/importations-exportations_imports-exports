

const Types = {
  SHOW_CONFIDENTIALITY: 'showConfidentiality',
}

const ShowConfidentiality = () => ({
  type: Types.SHOW_CONFIDENTIALITY,
  payload: { },
})

const reducer = (state = true, action) => {
  switch (action.type) {
    case Types.SHOW_CONFIDENTIALITY: return !state
    default: return true
  }
}


module.exports = {
  Types,
  ShowConfidentiality,
  reducer,
}