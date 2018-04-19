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

export const getAggregateKey = (_, props) => props.aggregateKey
export const getValueKey = (_, props) => props.valueKey

export const timelinePlayback = state => state.timelinePlayback

export const subType = createSelector(
  visualizationSettings,
  settings => settings.get('subtype'),
)
export const arrangeBy = createSelector(
  visualizationSettings,
  arrangeByOverride,
  (settings, override) => override || settings.get('arrangeBy'),
)

export const amount = createSelector(
  visualizationSettings,
  amountOverride,
  (settings, override) => override || settings.get('amount'),
)

const selectedActivityGroup = createSelector(
  visualizationSettings,
  activityGroupOverride,
  (settings, override) => override || settings.get('activity'),
)

export const selection = createSelector(
  visualizationSettings,
  settings => settings.get('selection'),
)

export const timelineRange = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'range']),
)

export const timelineFilterRange = createSelector(
  timelineRange,
  timelinePlayback,
  (range, playback) => (playback ? Immutable.fromJS({ start: playback, end: playback }) : range),
)

export const groupingBy = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'grouping']),
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

export const subTypeSelector = createSelector(
  selectedVisualization,
  unitSelector,
  subType,
  (viz, points, filterSubType) =>{
    if(viz !==  'naturalGasLiquids' 
      || ( viz ===  'naturalGasLiquids' 
            && (['propaneButane','' ].includes(filterSubType)))) { return points }
    return points.filter(point => {
      if(point.get('product') !== 'naturalGasLiquids'){return false}
      return point.get('productSubtype') === filterSubType
    })
  },
) 

export const activityGroupSelector = createSelector(
  subTypeSelector,
  selectedActivityGroup,
  (points, filterActivityGroup) =>
    points.filter(point => (
      point.get('activityGroup') === filterActivityGroup ||
      point.get('activity') === filterActivityGroup
    )),
)

export const selectedPieces = createSelector(
  selection,
  points => points.reduce((acc, nextValue) => {
    if (Immutable.Map.isMap(nextValue)) {
      nextValue.forEach((value) => {
        acc = acc.concat(value.keySeq().toList())
      })
    } else if (Immutable.List.isList(nextValue)) {
      acc = acc.concat(nextValue)
    }
    return acc
  }, new Immutable.List()),
)

const filterByTimeline = (point, range, groupBy) => {
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
}

export const filterByHex = (point, selectedMapPieces, visualization, selectionState) => {
  if (selectedMapPieces.count() === 0) {
    return point
  }
  if (visualization === 'naturalGasLiquids' || visualization === 'crudeOil') {
    if (visualization === 'crudeOil') {
      if (point.get('destination') === 'ca' || selectionState.get('country') === 'ca') {
        return true
      }
    }
    return selectedMapPieces.includes(point.get('destination')) || selectedMapPieces.includes(point.get('destinationKey'))
  }
  if(visualization === 'electricity'){
    const origins = selectionState.get('origins')
    return origins.includes(point.get('destination')) 
    || origins.includes(point.get('destinationKey'))
    || origins.includes(point.get('originKey'))
    || origins.includes(point.get('origin'))
  }
  return selectedMapPieces.includes(point.get('originKey'))
  || selectedMapPieces.includes(point.get('origin'))
  || selectedMapPieces.includes(point.get('port'))
}

export const filterByTimelineSelector = createSelector(
  activityGroupSelector,
  timelineFilterRange,
  groupingBy,
  (points, range, groupBy) => points.filter(point => filterByTimeline(point, range, groupBy)),
)
export const filterByHexSelector = createSelector(
  activityGroupSelector,
  selectedPieces,
  selectedVisualization,
  selection,
  (points, selectedMapPieces, visualization, selectionState) => points.filter(point => filterByHex(point, selectedMapPieces, visualization, selectionState)),
)

export const filterByTimelineAndHexData = createSelector(
  filterByHexSelector,
  timelineFilterRange,
  groupingBy,
  (points, range, groupBy) => points.filter(point => filterByTimeline(point, range, groupBy)),
)

const mapPieceLocationDataStructure = (acc, next, origin, originKey, originCountryKeyName, destinationKeyName, destinationCountryKeyName) => {
  // Safe to mutate the acc argument as we created it for only this reduce
  if (!acc[originKey]) {
    acc[originKey] = {
      units: next.get('units'),
      origin,
    }
  }
  acc[originKey].country = next.get(originCountryKeyName)
  acc[originKey].originKey = originKey
  const activity = next.get('activity')
  const currentVal = acc[originKey][activity] || 0
  acc[originKey][activity] = (currentVal + next.get('value'))

  const totalCount = acc[originKey].totalCount || 0
  const confidentialCount = acc[originKey].confidentialCount || 0
  const destinationKey = next.get(destinationKeyName)
  const destinationCountry = next.get(destinationCountryKeyName)
  acc[originKey].destinationCountry = acc[originKey].destinationCountry || {}
  acc[originKey].destinationCountry[destinationCountry] = acc[originKey].destinationCountry[destinationCountry] || {}
  const destCountryObj = acc[originKey].destinationCountry[destinationCountry]
  if (!destCountryObj[destinationKey]) { destCountryObj[destinationKey] = {} }
  if (!destCountryObj[destinationKey][activity]) { destCountryObj[destinationKey][activity] = 0 }

  destCountryObj[destinationKey][activity] += next.get('value', 0)
  if (next.has('forAverageDivisor')) {
    if (!acc[originKey].sumForAvg) { acc[originKey].sumForAvg = {} }
    const { sumForAvg } = acc[originKey]
    if (!sumForAvg[activity]) { sumForAvg[activity] = { value: 0, divisor: 0 } }
    sumForAvg[activity].value += next.get('forAverageValue', 0)
    sumForAvg[activity].divisor += next.get('forAverageDivisor', 0)
  }

  acc[originKey].totalCount = (totalCount + 1)
  acc[originKey].confidentialCount = (confidentialCount + next.get('confidential'))
  return acc
}

export const aggregateLocationSelector = createSelector(
  filterByTimelineSelector,
  (points) => {
    const result = Immutable.fromJS(points.reduce((acc, next) => {
      const origin = next.get('origin') || next.get('port')
      const originKey = next.get('originKey')
      acc = mapPieceLocationDataStructure(acc, next, origin, originKey, 'country','destinationKey', 'destinationCountry')

      const destination = next.get('destination') || next.get('port')
      const destinationKey = next.get('destinationKey')
      acc = mapPieceLocationDataStructure(acc, next, destination, destinationKey, 'destinationCountry', 'originKey', 'country')
      return acc
    }, {}))
    return result
  },
)

export const aggregateFilterLocationSelector = createSelector(
  filterByTimelineAndHexData,
  (points) => {
    const result = Immutable.fromJS(points.reduce((acc, next) => {
      const origin = next.get('origin') || next.get('port')
      const originKey = next.get('originKey')
      acc = mapPieceLocationDataStructure(acc, next, origin, originKey, 'country','destinationKey', 'destinationCountry')

      const destination = next.get('destination') || next.get('port')
      const destinationKey = next.get('destinationKey')
      acc = mapPieceLocationDataStructure(acc, next, destination, destinationKey, 'destinationCountry', 'originKey', 'country')
      return acc
    }, {}))

    if (result.count() > 0 && result.first().has('sumForAvg')) {
      return result.map(region => region.update('sumForAvg', val => val.map((activity) => {
        // Prevent divide by zero
        if (activity.get('divisor', 0) === 0) { return 0 }
        return activity.get('value', 0) / activity.get('divisor')
      })))
    }

    return result
  },
)

export const aggregateLocationPaddSelector = createSelector(
  filterByTimelineSelector,
  selectedVisualization,
  (points, viz) => {
    let missingpPadds = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'], Immutable.fromJS({}))
    missingpPadds = missingpPadds.merge(Constants.getIn(['dataloader', 'mapping', 'padd', 'ca'], Immutable.fromJS({})))
    let paddData = points.reduce((acc, next) => {
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
      missingpPadds = missingpPadds.delete(destination)
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
    missingpPadds.forEach((data, paddName) => {
      if(viz === 'naturalGasLiquids' && paddName === 'Non-USA'){
        return
      }else if(viz === 'crudeOil' && paddName === 'Mexico'){
        return
      }
      paddData[paddName] = {}
    })
    return Immutable.fromJS(paddData)
  },
)

export const aggregateLocationNaturalGasSelector = createSelector(
  filterByTimelineSelector,
  (points) => {
    const ports = Constants.getIn(['dataloader', 'mapping', 'ports'], Immutable.fromJS({}))
    let missingPorts = Constants.getIn(['dataloader', 'mapping', 'ports'], Immutable.fromJS({}))
    let portData = points.reduce((acc, next) => {
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
      missingPorts = missingPorts.delete(portName)
      if (!acc[province][portName]) {
        acc[province][portName] = {
          portName
        }
        acc[province][portName].activities = {}
      }
      const accPort = acc[province][portName]

      if (!accPort.activities[activityName]) {
        accPort.activities[activityName] = next.get('value')
      } else {
        accPort.activities[activityName] += next.get('value')
      }

      if (next.has('forAverageDivisor')) {
        if (!accPort.sumForAvg) { accPort.sumForAvg = {} }
        const { sumForAvg } = accPort
        if (!sumForAvg[activityName]) { sumForAvg[activityName] = { value: 0, divisor: 0 } }
        sumForAvg[activityName].value += next.get('forAverageValue', 0)
        sumForAvg[activityName].divisor += next.get('forAverageDivisor', 0)
        accPort.activities[activityName] = (sumForAvg[activityName].divisor === 0)
          ? 0
          : sumForAvg[activityName].value / sumForAvg[activityName].divisor
      }
      const totalCount = accPort.totalCount || 0
      const confidentialCount = accPort.confidentialCount || 0
      accPort.unit = next.get('units')
      accPort.totalCount = (totalCount + 1)
      accPort.confidentialCount = (confidentialCount + next.get('confidential'))
      return acc
    }, {})
    //create ports with the empty data and push it
    missingPorts.forEach((port, portName) => {
      const province = port.get('Province')
      if (!portData[province]) {
        portData[province] = {}
      }
      if (!portData[province][portName]) {
        portData[province][portName] = {
          portName
        }
      }
    })
    return Immutable.fromJS(portData)
  },
)
