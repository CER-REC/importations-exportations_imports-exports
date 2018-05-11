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
  switch (sortBy) {
    case 'imports':
      return points.sort((a, b) => (b.get('imports', 0) - a.get('imports', 0)))
    case 'exports':
      return points.sort((a, b) => (b.get('exports', 0) - a.get('exports', 0)))
    default:
      return points
  }
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

const getElectricityImportAndExport = createSelector(
  getVisualizationData,
  (data) => {
    console.log(data)
    return []
  },
)

export const createSortedLayout = createSelector(
  getElectricityImportAndExport,
  getColumns,
  getPadding,
  arrangeBy,
  getCountry,
  (pointsRaw, columns, rowPadding, sortBy, country) => {
    const points = sortData(pointsRaw.filter(p => p.get('country') === country), sortBy)
    let row = 0
    let column = 0
    const sortedArray = []
    let tabIndex = getTabIndexStart(country)
    points.forEach((statesOrProvinces) => {
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
      sortedArray.push({
        name: statesOrProvinces.get('originKey'),
        exports: statesOrProvinces.get('exports') || 0,
        imports: statesOrProvinces.get('imports') || 0,
        totalCount: statesOrProvinces.get('totalCount') || 0,
        confidentialCount: statesOrProvinces.get('confidentialCount') || 0,
        x,
        y: row,
        tabIndex,
      })
      tabIndex += 1
      // Column value is updated for the next iteration
      column += 1
    })
    return Immutable.fromJS(sortedArray)
  },
)

export const parseLocationData = createSelector(
  getVisualizationData,
  getElectricityMapLayoutConstants,
  getCountry,
  (records, layout, country) => {
    const resultList = []
    if (records.count() === 0 || typeof layout === 'undefined') { return resultList }

    const data = calculateValueSum(records, 'originKey', 'activity')

    let tabIndex = getTabIndexStart(country)
    console.log(layout.toJS())
    const tabIndexes = {}
    const tilePositions = {}
    layout.forEach((region) => {
      const originKey = region.get('originKey')
      tabIndexes[originKey] = tabIndex
      tabIndex += 1

      tilePositions[originKey] = { x: region.get('x'), y: region.get('y') }
      /*
      const originKey = region.get('originKey')
      const result = {
        name: originKey,
        exports: data.getIn([originKey, 'exports']) || 0,
        imports: data.getIn([originKey, 'imports']) || 0,
        x: region.get('x'),
        y: region.get('y'),
        totalCount: data.getIn([originKey, 'totalCount']) || 0,
        confidentialCount: data.getIn([originKey, 'confidentialCount']) || 0,
        tabIndex,
      }
      if (data.getIn([originKey, 'sumForAvg'], false) !== false) {
        result.imports = data.getIn([originKey, 'sumForAvg', 'imports'], 0)
        if (Immutable.Map.isMap(result.imports)) {
          result.imports = result.imports.get('divisor', 0) === 0
            ? 0
            : result.imports.get('value') / result.imports.get('divisor')
        }
        result.exports = data.getIn([originKey, 'sumForAvg', 'exports'], 0)
        if (Immutable.Map.isMap(result.exports)) {
          result.exports = result.exports.get('divisor', 0) === 0
            ? 0
            : result.exports.get('value') / result.exports.get('divisor')
        }
      }
      tabIndex += 1
      resultList.push(result)
      */
    })
    console.log('result', { ...data, tabIndexes, tilePositions })
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
      case 'location':
      default:
        return locationPoints
    }
  },
)
