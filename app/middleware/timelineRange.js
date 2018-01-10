const DataTypes = require('../actions/data').Types
const UITypes = require('../actions/ui').Types
const timelineFilter = require('../actions/ui').timelineFilter
const { timelineXScale }= require('../selectors/timeline')

const timelineRange = store => next => action => {
  // Process the action immediately
  next(action)

  // TODO: Convert SetVisualization to constant
  // Only do a full timeline reset if we are changing the data displayed
  if (action.type === DataTypes.LOAD_DATA || action.type === 'SetVisualization') {
    const scale = timelineXScale(store.getState(), {})
    store.dispatch(timelineFilter({
      start: { year: scale.min, quarter: 1 },
      end: { year: scale.max, quarter: 4 },
    }))
  } else if (action.type === UITypes.TIMELINE_GROUP) {
    const range = store.getState().ui.get('timelineRange')
    if (range.getIn(['start', 'quarter']) !== range.getIn(['end', 'quarter'])) {
      store.dispatch(timelineFilter(
        range.setIn(['end', 'quarter'], range.getIn(['start', 'quarter']))
      ))
    }
  }
}

module.exports = timelineRange
