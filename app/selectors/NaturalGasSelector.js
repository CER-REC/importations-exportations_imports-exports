import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateFilterLocationSelector, arrangeBy, subType } from './data'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import { visualizationSettings } from './visualizationSettings'

const emptyMap = fromJS({})

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

export const getPointsByCountry = createSelector(
  aggregateFilterLocationSelector,
  getCountry,
  (points, country) => points.filter(point => point.get('country') === country),
)

const getNaturalGasLiquidsImportAndExport = createSelector(
  getPointsByCountry,
  (points) => points.map(region => region.set('values', region.get('sumForAvg'))),
)

const sortData = points => points
  .sort((a, b) => (b.getIn(['values', 'imports'], 0) - a.getIn(['values', 'imports'], 0)))

const createSortedLayout = createSelector(
  getNaturalGasLiquidsImportAndExport,
  getColumns,
  getPadding,
  arrangeBy,
  subType,
  (data, columns, rowPadding, sortBy, stype) => {
    let row = 0
    let column = 0
    const sortedArray = []
    const sortedData = sortData(data)
    const orderedRegionNames = sortedData.keySeq()
      .concat(Constants.getIn(['dataloader', 'mapping', 'country', 'ca'])
        .filter(k => !sortedData.has(k)))
    orderedRegionNames.forEach((name) => {
      const statesOrProvinces = sortedData.get(name, emptyMap)
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
        name,
        values: statesOrProvinces.get('values', emptyMap).toJS(),
        totalCount: statesOrProvinces.get('totalCount') || 0,
        confidentialCount: statesOrProvinces.get('confidentialCount') || 0,
        showLabel: statesOrProvinces.get('showLabel', false),
        x,
        y: row,
      })

      // Column value is updated for the next iteration
      column += 1
    })
    return fromJS(sortedArray)
  },
)

const parseLocationData = createSelector(
  getNaturalGasLiquidsImportAndExport,
  getElectricityMapLayoutConstants,
  (data, layout) => {
    const resultList = []
    if (typeof layout !== 'undefined') {
      layout.forEach((statesOrProvinces) => {
        const originKey = statesOrProvinces.get('originKey')
        const result = {
          name: originKey,
          values: data.getIn([originKey, 'values'], emptyMap).toJS(),
          x: statesOrProvinces.get('x'),
          y: statesOrProvinces.get('y'),
          showLabel: statesOrProvinces.get('showLabel', false),
          totalCount: data.getIn([originKey, 'totalCount']) || 0,
          confidentialCount: data.getIn([originKey, 'confidentialCount']) || 0,
        }
        resultList.push(result)
      })
    }
    return fromJS(resultList)
  },
)


export const getNaturalGasLiquidMapLayout = createSelector(
  createSortedLayout,
  parseLocationData,
  arrangeBy,
  (sortedPoints, locationPoints, sortBy) => {
    switch (sortBy) {
      case 'amount':
        return sortedPoints
      case 'location':
      default:
        return locationPoints
    }
  },
)
