const DataTypes = require('../actions/data').Types
const {
  Types: VisualizationSettingsTypes,
  timelineFilter,
} = require('../actions/visualizationSettings')
const { timelineXScale } = require('../selectors/timeline')
const { visualizationSettings } = require('../selectors/visualizationSettings')

const timelineRange = store => next => (action) => {
  // Process the action immediately
  next(action)
  return

  // TODO: Convert SetVisualization to constant
  // Only do a full timeline reset if we are changing the data displayed
  if (action.type === DataTypes.LOAD_DATA || action.type === 'SetVisualization') {
    const scale = timelineXScale(store.getState(), {})
    store.dispatch(timelineFilter({
      start: { year: scale.min, quarter: 1 },
      end: { year: scale.max, quarter: 4 },
    }))
  } else if (action.type === VisualizationSettingsTypes.SET_GROUPING) {
    const range = visualizationSettings(store.getState(), {}).getIn(['timeline', 'range'])
    if (range.getIn(['start', 'quarter']) !== range.getIn(['end', 'quarter'])) {
      store.dispatch(timelineFilter(range.setIn(['end', 'quarter'], range.getIn(['start', 'quarter']))))
    }
  }
}

module.exports = timelineRange
