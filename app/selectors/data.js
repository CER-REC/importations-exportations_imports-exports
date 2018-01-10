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
      const originKey = next.get('originKey')
      // Safe to mutate the acc argument as we created it for only this reduce
      if (!acc[originKey]) {
        acc[originKey] = {
          units: next.get('units'),
          origin,
        }
      }
      acc[originKey]['country'] = next.get('country')
      acc[originKey]['originKey'] = originKey
      const activity = next.get('activity')
      const currentVal = acc[originKey][activity] || 0
      acc[originKey][activity] = (currentVal + next.get('value'))
      
      const totalCount = acc[originKey]['totalCount'] || 0
      const confidentialCount = acc[originKey]['confidentialCount'] || 0
      acc[originKey]['totalCount'] = (totalCount + 1)
      acc[originKey]['confidentialCount'] = (confidentialCount + next.get('confidential'))
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

module.exports = {
  filterByHexSelector,
  aggregateLocationSelector,
  sortAggregatedLocationsSelector,
  unitSelector,
  activityGroupSelector,
}
