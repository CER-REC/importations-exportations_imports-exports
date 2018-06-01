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

export const getWorldMapValues = createSelector(
  getFullyFilteredData,
  (recordsRaw) => {
    const seenContinentPeriods = [];
    const records = recordsRaw.reduce((acc, next) => {
      const continent = next.get('originContinent')
      const seen = seenContinentPeriods.includes(`${continent}-${next.get('period')}`)
      if (!seen) { seenContinentPeriods.push(`${continent}-${next.get('period')}`) }
      if (!acc[continent]) {
        acc[continent] = next.merge({
          value: 0,
          forAverageValue: 0,
          forAverageDivisor: 0,
          origin: continent,
          originKey: continent,
          country: continent,
        }).toJS()
      }
      acc[continent].forAverageValue += next.get('value')
      acc[continent].forAverageDivisor += (seen ? 0 : 1)
      return acc
    }, {})
    return calculateValueWeighted(fromJS(records), 'originContinent', 'activity')
  },
)

export const createSortedLayout = createSelector(
  getWorldMapValues,
  arrangeBy,
  getCountry,
  getMapLayoutConstants,
  (data, sortBy, country, gridConstants) => {
    const layout = gridConstants.get('layout', new Immutable.Map())
    const columns = gridConstants.get('defaultColumns', 0)
    const rowPadding = gridConstants.get('sortingRowPadding', 0)
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
      if (region === 'otherCountries') {
        const position = layout.find(layoutData => layoutData.get('originKey') === region)
        tilePositions[region] = { x: position.get('x'), y: position.get('y') }
        return
      }
      if (column >= columns) {
        column = 0
        row += 1
      }
      let x = column
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
  getWorldMapValues,
  getMapLayoutConstants,
  getCountry,
  (data, gridConstants, country, averageMode) => {
    const layout = gridConstants.get('layout', new Immutable.Map())

    let tabIndex = getTabIndexStart(country)
    const tabIndexes = {}
    const tilePositions = {}

    layout.forEach((region) => {
      const originKey = region.get('originKey')
      tabIndexes[originKey] = tabIndex
      tabIndex += 1

      tilePositions[originKey] = { x: region.get('x'), y: region.get('y') }
    })

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
