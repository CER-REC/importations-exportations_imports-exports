
export const Types = {
  SET_FROM_ROUTER_STATE: 'SetFromRouterState',
}

export const SetFromRouterState = options => ({
  type: Types.SET_FROM_ROUTER_STATE,
  payload: { 
    options:language,
    options:visualizationContainer,
    options:confidentiality,
    options:explanations,
    options:detailSidebar,
    options:header,
    options:menuBar,
    options:screenshotMode,
  },
})


// When true: we should render in screenshot mode
export const reducer = (state = false, action) => {
  switch (action.type) {
    case Types.SET_FROM_ROUTER_STATE: return action.payload.screenshotMode
    default: return state
  }
}