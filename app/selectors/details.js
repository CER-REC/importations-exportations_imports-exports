import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarterFilteredValue } from './timeline'
import { filterByTimelineAndHexData, getAggregateKey, getValueKey, activityGroupSelector, aggregateFilterLocationSelector, selectedPieces, selection as getSelection, filterByHex } from './data'
import { selectedVisualization } from './visualizationSettings'
import { PaddSelector } from './Padd'
import { getNaturalGasLiquidMapLayout } from './NaturalGasSelector'
import Constants from '../Constants'

export const electricityDetailBreakdownValues = createSelector(
  getSelection,
  aggregateFilterLocationSelector,
  (selection, filteredDataPoints) => {
    const data = {}

    const valueTypes = ['imports', 'exports']
    selection.get('destinations').forEach((nextValue) => {
      nextValue.forEach((stateOrProvince, key) => {
        valueTypes.forEach((activity) => {
          const regionData = filteredDataPoints.get(key)
          if (!regionData) { return }
          if (!regionData.get(activity)) { return }

          if (!data[activity]) { data[activity] = {} }
          data[activity][key] = regionData.has('sumForAvg')
            ? regionData.getIn(['sumForAvg', activity])
            : regionData.get(activity)
        })
      })
    })

    return fromJS(data).map(v => v.sort((a, b) => (b - a)))
  },
)

// This is only used in the US PADD map for Crude Oil. The subtype/transport
// skip the main DetailBreakdown
export const crudeOilDetailBreakdownValues = createSelector(
  getSelection,
  aggregateFilterLocationSelector,
  PaddSelector,
  (selection, filteredDataPoints, padd) => {
    const data = padd.filter((_, key) => key !== 'ca').map((value, paddId) => {
      if (selection.get('origins').count() > 0 && !selection.get('origins').includes('ca')) {
        return selection.get('origins').includes(paddId) ? value.get('value') : 0
      }
      return value.get('value')
    })

    return fromJS(data).sort((a, b) => (b - a))
  },
)

export const naturalGasLiquidsDetailBreakdownValues = createSelector(
  getSelection,
  (_, props) => props.type,
  (_, props) => props.subtype,
  (_, props) => props.country,
  PaddSelector,
  getNaturalGasLiquidMapLayout,
  (selection, activity, subtype, country, padd, layout) => {
    /*
     * NGL - Canada
     *   layout
     *   selection.origins
     *   subtype
     * NGL - US
     *   Padd
     *   selection.origins
     *   subtype
     */
    const detailBreakdownData = Constants.getIn(['detailBreakDown', country])
    const data = {}

    if (activity === 'imports') {
      const origins = selection.get('origins')
      layout.forEach((nextValue) => {
        if (origins.count() > 0 && !origins.includes(nextValue.get('name'))) { return }
        nextValue.get('subType').forEach((subTypeVal, subTypeKey) => {
          if (subtype !== '' && subtype !== 'propaneButane') {
            if (subTypeKey !== 'propaneButane' && subTypeKey === subtype) {
              data[subTypeKey] = (data[subTypeKey] || 0) + subTypeVal.get(detailBreakdownData.get('type'), 0)
            }
          } else if (subTypeKey !== 'propaneButane') {
            data[subTypeKey] = (data[subTypeKey] || 0) + subTypeVal.get(detailBreakdownData.get('type'), 0)
          }
        })
      })
    } else {
      const origins = selection.get('origins')
      padd.filter(v => v.has('subType')).forEach((nextValue) => {
        if (origins.count() > 0 && !origins.includes(nextValue.get('destination'))) { return }
        nextValue.get('subType').forEach((subTypeVal, subTypeKey) => {
          if (subtype !== '' && subtype !== 'propaneButane') {
            if (subTypeKey !== 'propaneButane' && subTypeKey === subtype) {
              data[subTypeKey] = (data[subTypeKey] || 0) + subTypeVal.get(detailBreakdownData.get('type'), 0)
            }
          } else if (subTypeKey !== 'propaneButane') {
            data[subTypeKey] = (data[subTypeKey] || 0) + subTypeVal.get(detailBreakdownData.get('type'), 0)
          }
        })
      })
    }

    return fromJS(data).sort((a, b) => (b - a))
  },
)

export const detailBreakdownValues = (state, props) => {
  switch (selectedVisualization(state, props)) {
    case 'electricity': return electricityDetailBreakdownValues(state, props)
    case 'crudeOil': return crudeOilDetailBreakdownValues(state, props)
    case 'naturalGasLiquids': return naturalGasLiquidsDetailBreakdownValues(state, props)
    default: return fromJS({})
  }
}

export const detailTotalValue = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  detailBreakdownValues,
  selectedVisualization,
  (data, aggregateKey, valueKey, breakdownValues, vis) => {
    const filteredData = valueKey === 'total'
      ? data
      : data.filter(p => (
        p.get(aggregateKey) === valueKey &&
        (vis === 'naturalGasLiquids' || p.get('productSubtype', '') === '') &&
        p.get('transport', '') === ''
      ))

    if (filteredData.count() > 0 && filteredData.first().has('forAverageDivisor')) {
      const sumForAvg = filteredData.reduce((acc, next) => {
        acc.value += next.get('forAverageValue', 0)
        acc.divisor += next.get('forAverageDivisor', 0)
        return acc
      }, { value: 0, divisor: 0 })
      if (sumForAvg.divisor === 0) { return { value: 0, average: true } }
      const value = sumForAvg.value / sumForAvg.divisor
      return { value, average: true }
    }

    const value = filteredData.reduce((acc, next) => (acc + next.get('value', 0)), 0)
    return { value, average: false }
  },
)

export const detailLargestValue = createSelector(
  detailBreakdownValues,
  detailTotalValue,
  getValueKey,
  (breakdown, total, valueKey) => Math.max(
    breakdown.get(valueKey, fromJS({})).map(Math.abs).max() || 0,
    Math.abs(total.value),
  ),
)

export const detailTotal = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  detailBreakdownValues,
  detailTotalValue,
  (data, aggregateKey, valueKey, breakdownValues, totalValue) => {
    const largestBreakdown = (breakdownValues.get(valueKey, fromJS({})).count() > 0)
      ? breakdownValues.get(valueKey).map(Math.abs).max()
      : 0
    const largestValue = Math.max(Math.abs(totalValue.value), largestBreakdown)
    return {
      ...totalValue,
      percentage: (largestValue !== 0)
        ? ((totalValue.value / largestValue) * 100)
        : 100,
    }
  },
)

export const confidentialTotal = createSelector(
  aggregateQuarterFilteredValue,
  getValueKey,
  ({ points }, valueKey) => points.reduce((acc, next) => ({
    confidential: acc.confidential + next.getIn(['confidential', valueKey], 0),
    total: acc.total + next.getIn(['totalPoints', valueKey], 0),
  }), { confidential: 0, total: 0 }),
)

export const missingDataTotal = createSelector(
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  (data, aggregateKey, valueKey) => {
    const filteredData = data.filter(p => p.get(aggregateKey) === valueKey)
    return {
      missing: filteredData.filter(p => (
        p.get('destination') === '(blank)' ||
        p.get('forAverageDivisor', undefined) === 0
      )).count(),
      total: filteredData.count(),
    }
  },
)
