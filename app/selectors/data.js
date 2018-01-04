const createSelector = require('reselect').createSelector
const Immutable = require('immutable')

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

const selectedVisualization = state => state.importExportVisualization
const selectedSort = state => state.electricitySortState
const selectedUnit = state => state.electricityDataTypes
const selectedActivityGroup =
  state => state.selectedActivity || 'importsExports'
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

const activityGroupSelector = createSelector(
  unitSelector,
  selectedActivityGroup,
  (points, filterActivityGroup) =>
    points.filter(point => (point.get('activityGroup') === filterActivityGroup))
)

const filterByTimelineSelector = createSelector(
  activityGroupSelector,
  points => {
    // TODO: Add filtering by timeline year-domain
    return points
  }
)

const filterByHexSelector = createSelector(
  activityGroupSelector,
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
          units: next.get('units'),
          origin,
        }
      }

      const activity = next.get('activity')
      const currentVal = acc[origin][activity] || 0
      acc[origin][activity] = (currentVal + next.get('value'))

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
          units: next.get('units'),
          period,
          year: next.get('year'),
          quarter: next.get('quarter'),
          imports: 0,
          exports: 0,
        }
      }

      const activity = next.get('activity')
      const currentVal = acc[period][activity] || 0
      acc[period][activity] = (currentVal + next.get('value'))

      return acc
    }, {})
    return Immutable.fromJS(result)
  }
)

const sortAggregatedLocationsSelector = createSelector(
  selectedSort,
  aggregateLocationSelector,
  (sortBy, points) => {
    switch (sortBy) {
      case 'imports':
        return points.sort((a, b) => (b.get('imports', 0) - a.get('imports', 0)))
      case 'exports':
        return points.sort((a, b) => (b.get('exports', 0) - a.get('exports', 0)))
      case location:
        // TODO Use constants to sort for the map
      default:
        return points
    }
  }
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
  sortAggregatedLocationsSelector,
  sortTimelineSelector,
  sortQuarterSelector,
  unitSelector,
  activityGroupSelector,
}
