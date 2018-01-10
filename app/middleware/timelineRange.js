const DataTypes = require('../actions/data').Types
const timelineFilter = require('../actions/ui').timelineFilter
const timelineScaleSelector = require('../selectors/timeline').timelineScaleSelector

const timelineRange = store => next => action => {
  // Process the action immediately
  next(action)

  // TODO: Convert SetVisualization to constant
  // If we aren't changing the data displayed, don't process timeline ranges
  if (action.type !== DataTypes.LOAD_DATA && action.type !== 'SetVisualization') {
    return
  }

  const scale = timelineScaleSelector(store.getState())
  store.dispatch(timelineFilter('start', {
    year: scale.year.min,
    quarter: 1,
  }))
  store.dispatch(timelineFilter('end', {
    year: scale.year.max,
    quarter: 4,
  }))
}

module.exports = timelineRange
