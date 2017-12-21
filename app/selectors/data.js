const createSelector = require('reselect').createSelector
const Immutable = require('immutable')

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

//const selectedVisualization = state => state.importExportVisualization
//const selectedSort = state => state.electricitySortState
//const selectedUnit = state => state.electricityDataTypes
const selectedVisualization = () => 'Electricity'
const selectedSort = () => 'import'
const selectedUnit = () => 'MW.h'
//const selectedActivity = state => state.selectedActivity || 'both'
const selectedActivity = state => state.selectedActivity || 'exports'
const dataSelector = state => state.data

const productSelector = createSelector(
  dataSelector,
  selectedVisualization,
  (data, viz) => data.get(viz, emptyMap)
)

const unitSelector = createSelector(
  productSelector,
  selectedUnit,
  (product, unit) => product.get(unit, emptyList)
)

const activitySelector = createSelector(
  unitSelector,
  selectedActivity,
  (points, filterActivity) => {
    if (filterActivity === 'both') { return points }
    return points.filter(point => {
      const activity = point.get('activity')
      return (
        activity === filterActivity ||
        activity.startsWith(filterActivity) || // importReexports
        activity.startsWith(`re${filterActivity}`) // reimportExports
      )
    })
  }
)

const filterByTimelineSelector = createSelector(
  activitySelector,
  points => {
    // TODO: Add filtering by timeline year-domain
    return points
  }
)

const filterByHexSelector = createSelector(
  activitySelector,
  points => {
    // TODO: Add filtering by selected hexes
    return points
  }
)

const aggregateLocationSelector = createSelector(
  filterByTimelineSelector,
  points => {
    const result = points.reduce((acc, next) => {
      const origin = next.get('origin') || next.get('port')

      // Safe to mutate the acc argument as we created it for only this reduce
      if (!acc[origin]) {
        acc[origin] = {
          imports: 0,
          exports: 0,
          units: next.get('units'),
          origin,
        }
      }

      acc[origin][next.get('activity')] += next.get('value')

      return acc
    }, {})
    return Immutable.fromJS(result)
  }
)

const aggregateQuarterSelector = createSelector(
  filterByHexSelector,
  points => {
    const result = points.reduce((acc, next) => {
      const period = next.get('period')
      // Safe to mutate the acc argument as we created it for only this reduce
      if (!acc[period]) {
        acc[period] = {
          imports: 0,
          exports: 0,
          units: next.get('units'),
          period,
          year: next.get('year'),
          quarter: next.get('quarter'),
        }
      }

      acc[period][next.get('activity')] += next.get('value')

      return acc
    }, {})
    return Immutable.fromJS(result)
  }
)

const sortLocationSelector = createSelector(
  aggregateLocationSelector,
  points => points.sort((a, b) => {
    // TODO: Use constants to sort for the map
    return 0
  })
)

const sortImportsSelector = createSelector(
  aggregateLocationSelector,
  points => points.sort((a, b) => (b.get('imports') - a.get('imports')))
)

const sortExportsSelector = createSelector(
  aggregateLocationSelector,
  points => points.sort((a, b) => (b.get('exports') - a.get('exports')))
)

const sortTimelineSelector = createSelector(
  aggregateQuarterSelector,
  points => points.sort((a, b) => {
    const year = a.get('year') - b.get('year')
    return (year !== 0) ? year : (a.get('quarter') - b.get('quarter'))
  })
)

const sortQuarterSelector = createSelector(
  aggregateQuarterSelector,
  points => points.sort((a, b) => {
    const quarter = a.get('quarter') - b.get('quarter')
    return (quarter !== 0) ? quarter : (a.get('year') - b.get('year'))
  })
)

module.exports = {
  aggregateLocationSelector,
  aggregateQuarterSelector,
  sortImportsSelector,
  sortExportsSelector,
  sortTimelineSelector,
  sortQuarterSelector,
  // Temporary
  filterByTimelineSelector,
  activitySelector,
  unitSelector,
  productSelector,
}
