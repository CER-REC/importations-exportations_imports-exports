const { fromJS } = require('immutable')
const { combineReducers } = require('redux')

const Types = {
  RESET_VISUALIZATION: 'visualizationSettings.reset',
  TIMELINE_FILTER: 'visualizationSettings.timelineFilter',
}

const timelineFilter = (side, point) => ({
  type: Types.TIMELINE_FILTER,
  payload: { side, point },
})

const initialState = fromJS({
  amount: '',
  arrangeBy: 'location',
  activity: 'importsExports',
  subtype: '',
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
      return state.setIn(
        ['timeline', 'range', action.payload.side],
        fromJS(action.payload.point)
      )
    case Types.RESET_VISUALIZATION:
      return fromJS(action.payload.settings)
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
}
