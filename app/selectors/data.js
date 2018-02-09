import { createSelector } from 'reselect'
import Immutable from 'immutable'

import Constants from '../Constants'
import {
  visualizationSettings,
  arrangeByOverride,
  amountOverride,
  activityGroupOverride,
  selectedVisualization,
} from './visualizationSettings'

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

export const subType = createSelector(
  visualizationSettings,
  settings => settings.get('subtype'),
)
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
    points.filter(point => (
      point.get('activityGroup') === filterActivityGroup ||
      point.get('activity') === filterActivityGroup
    )),
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
      acc[originKey].destinationCountry[destinationCountry] = acc[originKey].destinationCountry[destinationCountry] || {}
      if (!(acc[originKey].destinationCountry[destinationCountry])[destinationKey]) {
        acc[originKey].destinationCountry[destinationCountry][destinationKey] = {}
        acc[originKey].destinationCountry[destinationCountry][destinationKey][activity] = next.get('value', 0)
      } else {
        if (!acc[originKey].destinationCountry[destinationCountry][destinationKey][activity]) {
          acc[originKey].destinationCountry[destinationCountry][destinationKey][activity] = 0
        }
        acc[originKey].destinationCountry[destinationCountry][destinationKey][activity] += next.get('value', 0)
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
      let destination = next.get('destinationKey') === ''? next.get('destination'): next.get('destinationKey')
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
      acc[destination].value = (currentVal + next.get('value'))
      if (!acc[destination].subType) {
        acc[destination].subType = {
          propaneButane: {},
        }
      }
      if (!acc[destination].subType[next.get('productSubtype')]) {
        acc[destination].subType[next.get('productSubtype')] = {}
      }
      const activityVal = acc[destination].subType[next.get('productSubtype')][activity] || 0
      const totalValue = acc[destination].subType.propaneButane[activity] || 0
      acc[destination].subType[next.get('productSubtype')][activity] = activityVal + next.get('value') || 0
      acc[destination].subType.propaneButane[activity] = totalValue + next.get('value') || 0
      const totalCount = acc[destination].totalCount || 0
      const confidentialCount = acc[destination].confidentialCount || 0
      acc[destination].transport = next.get('transport')
      acc[destination].totalCount = (totalCount + 1)
      acc[destination].confidentialCount = (confidentialCount + next.get('confidential'))
      acc[destination].country = next.get('destinationCountry')
      return acc
    }, {})
    return Immutable.fromJS(result)
  },
)

export const aggregateLocationNaturalGasSelector = createSelector(
  filterByTimelineSelector,
  (points) => {
    const ports = Constants.getIn(['dataloader', 'mapping', 'ports'], Immutable.fromJS({}))
    const result = points.reduce((acc, next) => {
      const port = ports.get(next.get('port'))
      if (typeof port === 'undefined') {
        //console.log(`missing data for ${next.get('port')} in the constant list.`)
        return acc
      }
      const province = port.get('Province')
      const portName = next.get('port')
      const activityName = next.get('activity')
      if (!acc[province]) {
        acc[province] = {}
      }
      if (!acc[province][portName]) {
        acc[province][portName] = {
          portName
        }
        acc[province][portName].activities = {}
      }
      if (!acc[province][portName].activities[activityName]) {
        acc[province][portName].activities[activityName] = next.get('value')
      } else {
        acc[province][portName].activities[activityName] += next.get('value')
      }
      const totalCount = acc[province][portName].totalCount || 0
      const confidentialCount = acc[province][portName].confidentialCount || 0
      acc[province][portName].unit = next.get('units')
      acc[province][portName].totalCount = (totalCount + 1)
      acc[province][portName].confidentialCount = (confidentialCount + next.get('confidential'))
      return acc
    }, {})
    return Immutable.fromJS(result)
  },
)
