import Immutable, { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import { arrangeBy } from './data'
import { getVisualizationData } from './core'
import { calculateValueSum } from './renderData'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'

const selectedVisualization = state => state.importExportVisualization
const getCountry = (_, props = {}) => props.country

const getElectricityMapLayoutConstants = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country) => MapLayoutGridConstant.getIn([visualization, country, 'layout']),
)

const getColumns = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country) => MapLayoutGridConstant.getIn([visualization, country, 'defaultColumns']),
)

const getPadding = createSelector(
  selectedVisualization,
  getCountry,
  (visualization, country) => MapLayoutGridConstant.getIn([visualization, country, 'sortingRowPadding']),
)

const sortData = (points, sortBy) => {
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
  getVisualizationData,
  getColumns,
  getPadding,
  arrangeBy,
  getCountry,
  getElectricityMapLayoutConstants,
  (records, columns, rowPadding, sortBy, country, layout) => {
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
  getVisualizationData,
  getElectricityMapLayoutConstants,
  getCountry,
  (records, layout, country) => {
    // TODO: This should calculate averages in some cases
    const data = calculateValueSum(records, ['originKey', 'destinationKey'], 'activity')

    let tabIndex = getTabIndexStart(country)
    const tabIndexes = {}
    const tilePositions = {}

    if (records.count() !== 0 && typeof layout !== 'undefined') {
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

export const getElectricityMapLayout = createSelector(
  createSortedLayout,
  parseLocationData,
  arrangeBy,
  (sortedPoints, locationPoints, sortBy) => {
    switch (sortBy) {
      case 'exports':
      case 'imports':
        return sortedPoints
      default:
        return locationPoints
    }
  },
)
