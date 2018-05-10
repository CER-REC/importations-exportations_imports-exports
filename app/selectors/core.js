import { createSelector } from './selectHelper'
import {
  unitSelector,
  groupingBy,
  timelineRange,
  selection,
  selectedPieces,
  selectedActivityGroup,
} from './data'
import { selectedVisualization } from './visualizationSettings'

// TODO: Reorganize logic for unit selector, since it is the main data
export const getVisualizationData = unitSelector

export const getTimelineFilterPredicate = createSelector(
  timelineRange,
  groupingBy,
  (range, groupBy) => (point) => {
    if (groupBy === 'year') {
      if (point.get('year') < range.getIn(['start', 'year'])) { return false }
      if (point.get('year') > range.getIn(['end', 'year'])) { return false }
      // Point is between start and end years

      if (point.get('year') === range.getIn(['start', 'year']) &&
          point.get('quarter') < range.getIn(['start', 'quarter'])) {
        // Start year, but before start quarter
        return false
      }
      if (point.get('year') === range.getIn(['end', 'year']) &&
          point.get('quarter') > range.getIn(['end', 'quarter'])) {
        // End year, but after end quarter
        return false
      }
      return true
    }

    // Group by quarter
    if (range.getIn(['start', 'quarter']) !== range.getIn(['end', 'quarter'])) { return true }
    return (range.getIn(['start', 'year']) <= point.get('year')
      && point.get('year') <= range.getIn(['end', 'year'])
      && range.getIn(['start', 'quarter']) === point.get('quarter')
    )
  },
)

export const filterByTimeline = createSelector(
  getVisualizationData,
  getTimelineFilterPredicate,
  (data, predicate) => data.filter(predicate),
)

export const getMapFilterPredicate = createSelector(
  selection,
  selectedPieces,
  selectedVisualization,
  (selectionState, selectedMapPieces, visualization) => (point) => {
    if (selectedMapPieces.count() === 0) { return true }
    if (visualization === 'naturalGasLiquids' || visualization === 'crudeOil') {
      if (visualization === 'crudeOil') {
        if (point.get('destination') === 'ca' || selectionState.get('country') === 'ca') {
          return true
        }
      }
      return selectedMapPieces.includes(point.get('destination'))
        || selectedMapPieces.includes(point.get('destinationKey'))
    }
    if (visualization === 'electricity') {
      const origins = selectionState.get('origins')
      return origins.includes(point.get('destination'))
        || origins.includes(point.get('destinationKey'))
        || origins.includes(point.get('originKey'))
        || origins.includes(point.get('origin'))
    }
    return selectedMapPieces.includes(point.get('originKey'))
      || selectedMapPieces.includes(point.get('origin'))
      || selectedMapPieces.includes(point.get('port'))
  },
)

export const filterByMap = createSelector(
  getVisualizationData,
  getMapFilterPredicate,
  (data, predicate) => data.filter(predicate),
)

export const filterByTimelineAndMap = createSelector(
  getVisualizationData,
  getTimelineFilterPredicate,
  getMapFilterPredicate,
  (data, timelinePredicate, mapPredicate) =>
    record => (timelinePredicate(record) && mapPredicate(record)),
)

export const getActivityFilterPredicate = createSelector(
  selectedActivityGroup,
  activityGroup => point => (
    point.get('activityGroup') === activityGroup ||
    point.get('activity') === activityGroup
  ),
)
