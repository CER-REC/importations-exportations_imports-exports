import { createSelector } from 'reselect'
import Immutable from 'immutable'

import { aggregateFilterLocationSelector, aggregateLocationSelector, arrangeBy, unitSelector } from './data'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import { visualizationSettings } from './visualizationSettings'

// get import data for the electricity visualization
// rows from the CSV
const selectedVisualization = state => state.importExportVisualization

export const getSelectionSettings = createSelector(
  visualizationSettings,
  settings => settings.get('selection'),
)

const getCountry = (state, props) => props.country

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

const initializeDefaultValues = (originKey, origin, country, unit) => Immutable.fromJS({
  units: unit,
  exports: 0,
  imports: 0,
  totalCount: 0,
  confidentialCount: 0,
  origin,
  country,
  originKey,
})

const getElectricityImportAndExport = createSelector(
  aggregateFilterLocationSelector,
  aggregateLocationSelector,
  getSelectionSettings,
  (filteredData, allData, selection) => allData
    .map((region, key) => (selection.get('country') === region.get('country')
      ? region
      : filteredData.get(key, initializeDefaultValues(
        region.get('originKey'),
        region.get('origin'),
        region.get('country'),
        region.get('unit'),
      ))))
    .map((r) => {
      if (!r.has('sumForAvg')) { return r }

      let imports = r.getIn(['sumForAvg', 'imports'], 0)
      if (Immutable.Map.isMap(imports)) {
        imports = imports.get('divisor', 0) === 0
          ? 0
          : imports.get('value') / imports.get('divisor')
      }
      let exports = r.getIn(['sumForAvg', 'exports'], 0)
      if (Immutable.Map.isMap(exports)) {
        exports = exports.get('divisor', 0) === 0
          ? 0
          : exports.get('value') / exports.get('divisor')
      }

      return r.merge({ imports, exports })
    }),
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

const createSortedLayout = createSelector(
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
          columns -= 1
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

const parseLocationData = createSelector(
  getElectricityImportAndExport,
  getElectricityMapLayoutConstants,
  getCountry,
  (data, layout, country) => {
    const resultList = []
    let tabIndex = getTabIndexStart(country)
    if (data.size > 0 && typeof layout !== 'undefined') {
      layout.forEach((statesOrProvinces) => {
        const originKey = statesOrProvinces.get('originKey')
        const result = {
          name: originKey,
          exports: data.getIn([originKey, 'exports']) || 0,
          imports: data.getIn([originKey, 'imports']) || 0,
          x: statesOrProvinces.get('x'),
          y: statesOrProvinces.get('y'),
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
      })
    }
    return Immutable.fromJS(resultList)
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
