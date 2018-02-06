import { createSelector } from 'reselect'
import Immutable from 'immutable'

import { visualizationSettings } from './visualizationSettings'

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

const arrangeByOverride = (_, props) => props._overrideArrangeBy
const amountOverride = (_, props) => props._overrideAmount
const activityGroupOverride = (_, props) => props._overrideActivityGroup

export const arrangeBy = createSelector(
  visualizationSettings,
  arrangeByOverride,
  (settings, override) => override || settings.get('arrangeBy'),
)

const amount = createSelector(
  visualizationSettings,
  amountOverride,
  (settings, override) => override || settings.get('amount'),
)

const selectedActivityGroup = createSelector(
  visualizationSettings,
  activityGroupOverride,
  (settings, override) => override || settings.get('activity'),
)

const selectedVisualization = (state, props) =>
  props._overrideVisualization || state.importExportVisualization
const dataSelector = state => state.data

const productSelector = createSelector(
  dataSelector,
  selectedVisualization,
  (data, viz) => data.get(viz, emptyMap),
)

export const unitSelector = createSelector(
  productSelector,
  amount,
  (product, unit) => product.get(unit, emptyList),
)

export const binSelector = createSelector(
  selectedVisualization,
  amount,
  state => state.bins,
  (vis, unit, bins) => bins.getIn([vis, unit], emptyList),
)

export const activityGroupSelector = createSelector(
  unitSelector,
  selectedActivityGroup,
  (points, filterActivityGroup) =>
    points.filter(point => (point.get('activityGroup') === filterActivityGroup)),
)

const filterByTimelineSelector = createSelector(
  activityGroupSelector,
  points =>
    // TODO: Add filtering by timeline year-domain
    points,

)

export const filterByHexSelector = createSelector(
  activityGroupSelector,
  points =>
    // TODO: Add filtering by selected hexes
    points,

)

export const aggregateLocationSelector = createSelector(
  filterByTimelineSelector,
  (points) => {
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
      acc[originKey].country = next.get('country')
      acc[originKey].originKey = originKey
      const activity = next.get('activity')
      const currentVal = acc[originKey][activity] || 0
      acc[originKey][activity] = (currentVal + next.get('value'))

      const totalCount = acc[originKey].totalCount || 0
      const confidentialCount = acc[originKey].confidentialCount || 0
      const destinationKey = next.get('destinationKey')
      const destinationCountry = next.get('destinationCountry')
      acc[originKey].destinationCountry = acc[originKey].destinationCountry || {}
      acc[originKey].destinationCountry[destinationCountry] = acc[originKey].destinationCountry[destinationCountry] || []
      if ((acc[originKey].destinationCountry[destinationCountry]).indexOf(destinationKey) === -1) {
        (acc[originKey].destinationCountry[destinationCountry]).push(destinationKey)
      }
      acc[originKey].totalCount = (totalCount + 1)
      acc[originKey].confidentialCount = (confidentialCount + next.get('confidential'))
      return acc
    }, {})
    return Immutable.fromJS(result)
  },
)

export const aggregateLocationPaddSelector = createSelector(
  filterByTimelineSelector,
  (points) => {
    const result = points.reduce((acc, next) => {
      let destination = next.get('destination')
      if (typeof destination === 'undefined') {
        return acc
      }
      destination = destination === '' ? 'ca' : destination
      if (!acc[destination]) {
        acc[destination] = {
          units: next.get('units'),
          destination,
        }
      }
      const activity = next.get('activity')
      const currentVal = acc[destination].value || 0
      acc[destination].activity = activity
      acc[destination].value = (currentVal + next.get('value'))

      const totalCount = acc[destination].totalCount || 0
      const confidentialCount = acc[destination].confidentialCount || 0
      const transport = next.get('transport')
      acc[destination].transport = acc[destination].transport || {}
      acc[destination].transport[transport] = acc[destination].transport[transport] + next.get('value') || 0
      acc[destination].totalCount = (totalCount + 1)
      acc[destination].confidentialCount = (confidentialCount + next.get('confidential'))
      return acc
    }, {})
    return Immutable.fromJS(result)
  },
)

export const sortAggregatedLocationsSelector = createSelector(
  arrangeBy,
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
  },
)
