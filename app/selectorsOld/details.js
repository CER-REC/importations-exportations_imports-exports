import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

import { aggregateQuarterFilteredValue } from './timeline'
import {
  filterByTimelineSelector,
  filterByTimelineAndHexData,
  getAggregateKey,
  getValueKey,
  aggregateFilterLocationSelector,
  selection as getSelection,
} from './data'
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
  filterByTimelineAndHexData,
  getAggregateKey,
  (filteredDataPoints, aggregateKey) => {
    const data = {}
    filteredDataPoints
      .filter(p => p.get(aggregateKey, '') !== '')
      .forEach((point) => {
        // If it is for activity, switch to destination for the details
        const key = point.get(aggregateKey)
        if (!data[key]) { data[key] = { value: 0, divisor: 0 } }
        data[key].value += point.get('forAverageValue')
        data[key].divisor += point.get('forAverageDivisor')
      })

    const averageValues = fromJS(data)
      .map((v) => {
        if (v.get('divisor', 0) === 0) { return 0 }
        return v.get('value') / v.get('divisor')
      })


    return fromJS({
      exports: averageValues.sort((a, b) => (b - a)),
    })
  },
)

export const naturalGasLiquidsDetailBreakdownValues = createSelector(
  getSelection,
  filterByTimelineAndHexData,
  (selection, filteredDataPoints) => {
    const data = {}
    filteredDataPoints.forEach((point) => {
      const activity = point.get('activity')
      const subtype = point.get('productSubtype')
      if (!data[activity]) { data[activity] = {} }
      if (!data[activity][subtype]) { data[activity][subtype] = { value: 0, divisor: 0 } }
      data[activity][subtype].value += point.get('forAverageValue', 0)
      data[activity][subtype].divisor += point.get('forAverageDivisor', 0)
    })
    return fromJS(data).map(activity => activity.map((v) => {
      if (v.get('divisor', 0) === 0) { return 0 }
      return v.get('value') / v.get('divisor')
    }))
  },
)
/*
export const naturalGasLiquidsDetailBreakdownValues = createSelector(
  getSelection,
  (_, props) => props.subtype,
  (_, props) => props.country,
  PaddSelector,
  getNaturalGasLiquidMapLayout,
  (_, props) => props,
  (selection, subtype, country, padd, layout, props) => {
*/
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
/*
    const detailBreakdownData = Constants.getIn(['detailBreakDown', country])
    const data = { imports: {}, exports: {} }
    const origins = selection.get('origins')

    layout.forEach((nextValue) => {
      if (origins.count() > 0 && !origins.includes(nextValue.get('name'))) { return }
      nextValue.get('subType').forEach((subTypeVal, subTypeKey) => {
        if (subtype && subtype !== subTypeKey) { return }
        subTypeVal.forEach((val, activity) => {
          data[activity][subTypeKey] = (data[activity][subTypeKey] || 0) + val
        })
      })
    })

    if (detailBreakdownData) {
      // TODO: Why do we need this if-statement
      padd.filter(v => v.has('subType')).forEach((nextValue) => {
        if (origins.count() > 0 && !origins.includes(nextValue.get('destination'))) { return }
        nextValue.get('subType').forEach((subTypeVal, subTypeKey) => {
          if (subtype && subtype !== subTypeKey) { return }
          subTypeVal.forEach((val, activity) => {
            data[activity][subTypeKey] = (data[activity][subTypeKey] || 0) + val
          })
        })
      })
    }

    return fromJS(data).map(activity => activity.sort((a, b) => (b - a)))
  },
)
*/

export const refinedPetroleumProductsDetailBreakdownValues = createSelector(
  filterByTimelineSelector,
  (points) => {
    const values = points
      .reduce((acc, next) => {
        const type = next.get('productSubtype')
        if (!acc[type]) { acc[type] = { value: 0, divisor: 0 } }
        acc[type] = {
          value: acc[type].value + next.get('value', 0),
          divisor: acc[type].divisor + 1,
        }
        return acc
      }, {})
    const averageValues = Object.entries(values)
      .reduce((acc, [key, { value, divisor }]) => ({
        ...acc,
        [key]: (divisor === 0 ? 0 : value / divisor),
      }), {})

    return fromJS({
      exports: fromJS(averageValues).sort((a, b) => (b - a)),
    })
  },
)

export const detailBreakdownValues = (state, props) => {
  switch (selectedVisualization(state, props)) {
    case 'electricity': return electricityDetailBreakdownValues(state, props)
    case 'crudeOil': return crudeOilDetailBreakdownValues(state, props)
    case 'naturalGasLiquids': return naturalGasLiquidsDetailBreakdownValues(state, props)
    case 'refinedPetroleumProducts': return refinedPetroleumProductsDetailBreakdownValues(state, props)
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
  getValueKey,
  detailBreakdownValues,
  detailTotalValue,
  (valueKey, breakdownValues, totalValue) => {
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
