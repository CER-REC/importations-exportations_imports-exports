const fromJS = require('immutable').fromJS

const Types = {
  BARGRAPH_SCALE_LINKED: 'bargraph.scaleLinked',
  TIMELINE_FILTER: 'timeline.filter',
  TIMELINE_GROUP: 'timeline.group',
}

const bargraphScaleLinked = linked => ({
  type: Types.BARGRAPH_SCALE_LINKED,
  payload: { linked },
})

const timelineFilter = (side, point) => ({
  type: Types.TIMELINE_FILTER,
  payload: { side, point },
})

const timelineGroup = group => ({
  type: Types.TIMELINE_GROUP,
  payload: { timelineGroup: group },
})

const initialState = fromJS({
  barGraphScaleLinked: true,
  timelineRange: {
    start: { year: 0, quarter: 0 },
    end: { year: 9999, quarter: 9999 },
  },
  timelineGroup: 'year',
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.BARGRAPH_SCALE_LINKED:
      return state.set('barGraphScaleLinked', action.payload.linked)
    case Types.TIMELINE_FILTER:
      return state.setIn(
        ['timelineRange', action.payload.side],
        fromJS(action.payload.point)
      )
    case Types.TIMELINE_GROUP:
      return state.set('timelineGroup', action.payload.timelineGroup)
    default: return state
  }
}

module.exports = {
  Types,
  bargraphScaleLinked,
  timelineFilter,
  timelineGroup,
  reducer,
}
