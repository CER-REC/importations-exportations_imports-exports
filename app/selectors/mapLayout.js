import Immutable, { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import { arrangeBy } from './data'
import {
  calculateValueSum,
  calculateValueWeighted,
  calculateValueAverage,
  getCountry,
  getFullyFilteredData,
} from './renderData'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'

const selectedVisualization = state => state.importExportVisualization

const getMapLayoutConstants = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country) => MapLayoutGridConstant
    .getIn([visualization, country], new Immutable.Map()),
)

const sortData = (points, sortBy) => {
  if (sortBy === 'amount') {
    return points.sort((a, b) => (
      b.reduce((acc, next) => acc + next, 0) -
      a.reduce((acc, next) => acc + next, 0)
    ))
  }
  if (sortBy !== 'imports' && sortBy !== 'exports') { return points }
  return points.sort((a, b) => (b.get(sortBy, 0) - a.get(sortBy, 0)))
}

const getTabIndexStart = (country) => {
  let tabIndex = 0
  switch (country) {
    case 'ca':
      tabIndex = Constants.getIn(['tabIndex', 'start', 'visualization', 'caMap'])
      break
    case 'us':
      tabIndex = Constants.getIn(['tabIndex', 'start', 'visualization', 'usMap'])
      break
    default:
      tabIndex = Constants.getIn(['tabIndex', 'start', 'visualization', 'powerpool'])
  }
  return tabIndex
}

export const createSortedLayout = createSelector(
  getFullyFilteredData,
  arrangeBy,
  getCountry,
  getMapLayoutConstants,
  (records, sortBy, country, gridConstants) => {
    const layout = gridConstants.get('layout', new Immutable.Map())
    let columns = gridConstants.get('defaultColumns', 0)
    const rowPadding = gridConstants.get('sortingRowPadding', 0)
    // TODO: This should calculate averages in some cases
    const data = calculateValueSum(
      records,
      ['originKey', 'destinationKey'],
      'activity',
    )

    const valuesToSort = {}
    layout.forEach((v) => {
      valuesToSort[v.get('name')] = data.values[v.get('name')] || {}
    })
    const orderedValues = sortData(fromJS(valuesToSort), sortBy)

    let row = 0
    let column = 0
    let tabIndex = getTabIndexStart(country)
    const tabIndexes = {}
    const tilePositions = {}
    orderedValues.forEach((value, region) => {
      if (column >= columns) {
        column = 0
        row += 1
        if (row % 2 === 1) {
          columns -= 1 // eslint-disable-line no-param-reassign
        }
      }
      let x = row + column
      if (row !== 0) {
        x += (row * rowPadding)
      }

      tabIndexes[region] = tabIndex
      tilePositions[region] = { x, y: row }

      // Column value is updated for the next iteration
      column += 1
      tabIndex += 1
    })
    return fromJS({ ...data, tabIndexes, tilePositions })
  },
)

export const parseLocationData = createSelector(
  getFullyFilteredData,
  getMapLayoutConstants,
  getCountry,
  selectedVisualization,
  (_, props = {}) => props.valueAverage || false,
  (_, props = {}) => props.aggregateKey || false,
  (records, gridConstants, country, visualization, averageMode, aggregateKey) => {
    const layout = gridConstants.get('layout', new Immutable.Map())
    let data
    if (averageMode === 'weighted') {
      data = calculateValueWeighted(records, ['originKey', 'destinationKey'], 'activity')
    } else if (averageMode === true) {
      if (visualization === 'naturalGasLiquids' && aggregateKey) {
        data = calculateValueSum(records, ['originKey', 'destinationKey'], aggregateKey)
        const calculatedValues = {}
        Object.entries(data.values).forEach(([key, value]) => {
          if (key.toLowerCase().includes('padd') || key.toLowerCase().includes('mexico')) return
          if (!calculatedValues[key]) {
            calculatedValues[key] = { imports:0 }
          }
          Object.entries(value).forEach(([subtype, amt]) => {
            calculatedValues[key].imports += amt
          })
        })
        data.values = calculatedValues
      } else {
        data = calculateValueAverage(records, ['originKey', 'destinationKey'], 'activity')
      }
    } else {
      data = calculateValueSum(records, ['originKey', 'destinationKey'], 'activity')
    }

    let tabIndex = getTabIndexStart(country)
    const tabIndexes = {}
    const tilePositions = {}

    if (typeof layout !== 'undefined') {
      layout.forEach((region) => {
        const originKey = region.get('originKey')
        tabIndexes[originKey] = tabIndex
        tabIndex += 1

        tilePositions[originKey] = { x: region.get('x'), y: region.get('y') }
      })
    }
    return fromJS({ ...data, tabIndexes, tilePositions })
  },
)

export const getMapLayout = createSelector(
  createSortedLayout,
  parseLocationData,
  arrangeBy,
  (sortedPoints, locationPoints, sortBy) => {
    switch (sortBy) {
      case 'exports':
      case 'imports':
      case 'amount':
        return sortedPoints
      default:
        return locationPoints
    }
  },
)
