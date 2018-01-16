const { fromJS } = require('immutable')
const { combineReducers } = require('redux')

const Types = {
  RESET_VISUALIZATION: 'visualizationSettings.reset',
  TIMELINE_FILTER: 'visualizationSettings.timelineFilter',
  ARRANGE_BY: 'visualizationSettings.arrangeBy',
  SET_AMOUNT: 'visualizationSettings.setAmount',
  SET_GROUPING: 'visualizationSettings.setGrouping',
  SET_SCALE_LINKED: 'visualizationSettings.setScaleLinked',
  SET_ACTIVITY: 'visualizationSettings.setActivity',
  SET_SUBTYPE: 'visualizationSettings.setSubtype',
  SET_SELECTION: 'visualizationSettings.setSelection',
}

const timelineFilter = range => ({
  type: Types.TIMELINE_FILTER,
  payload: { range },
})

const setArrangeBy = value => ({
  type: Types.ARRANGE_BY,
  payload: { arrangeBy: value },
})

const setAmount = amount => ({
  type: Types.SET_AMOUNT,
  payload: { amount },
})

const setGrouping = grouping => ({
  type: Types.SET_GROUPING,
  payload: { grouping },
})

const setScaleLinked = scaleLinked => ({
  type: Types.SET_SCALE_LINKED,
  payload: { scaleLinked },
})

const setActivity = activity => ({
  type: Types.SET_ACTIVITY,
  payload: { activity },
})

const setSubtype = subtype => ({
  type: Types.SET_SUBTYPE,
  payload: { subtype },
})

const setSelection = selection => ({
  type: Types.SET_SELECTION,
  payload: { selection },
})

const initialState = fromJS({
  amount: '',
  arrangeBy: 'location',
  activity: 'importsExports',
  subtype: '',
  selection:{
    country: null,
    origins:[],
    destinations:{}
  },
  timeline: {
    scaleLinked: true,
    grouping: 'year',
    range: {
      start: { year: 0, quarter: 1 },
      end: { year: 9999, quarter: 4 },
    },
  },
})

const subReducer = visualization => (state = initialState, action) => {
  if (!action.meta || visualization !== action.meta.visualization) {
    return state
  }

  switch (action.type) {
    case Types.TIMELINE_FILTER:
      return state.setIn(['timeline', 'range'], fromJS(action.payload.range))
    case Types.ARRANGE_BY:
      return state.set('arrangeBy', action.payload.arrangeBy)
    case Types.SET_AMOUNT:
      return state.set('amount', action.payload.amount)
    case Types.SET_ACTIVITY:
      return state.set('activity', action.payload.activity)
    case Types.SET_SUBTYPE:
      return state.set('subtype', action.payload.subtype)
    case Types.SET_GROUPING:
      return state.setIn(['timeline', 'grouping'], action.payload.grouping)
    case Types.SET_SCALE_LINKED:
      return state.setIn(['timeline', 'scaleLinked'], action.payload.scaleLinked)
    case Types.RESET_VISUALIZATION:
      return fromJS(action.payload.settings)
    case Types.SET_SELECTION:
      return state.set('selection', fromJS(action.payload.selection))
    default: return state
  }
}

const reducer = combineReducers([
  'electricity',
  'crudeOil',
  'naturalGas',
  'naturalGasLiquids',
  'refinedPetroleumProducts'
].reduce((acc, next) => { acc[next] = subReducer(next); return acc }, {}))

module.exports = {
  Types,
  reducer,
  timelineFilter,
  setArrangeBy,
  setAmount,
  setGrouping,
  setScaleLinked,
  setActivity,
  setSubtype,
  setSelection
}
