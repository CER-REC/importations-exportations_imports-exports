const createSelector = require('reselect').createSelector
const Immutable = require('immutable')

const { visualizationContentPosition } = require('./viewport/')
const { filterByHexSelector } = require('./data')
const {
  timelineGrouping,
  timelinePositionCalculation,
  timelineYearScaleCalculation,
} = require('./timeline')

const timelineCrudeScaleCalculation = createSelector(
  filterByHexSelector,
  data => ({ x: timelineYearScaleCalculation(data) })
)

const transportOrder = ['Pipeline', 'Marine', 'Railroad', 'Truck']
const aggregateCrudeTransportQuarterSelector = createSelector(
  filterByHexSelector,
  points => {
    const result = points
      .filter(point => point.get('transport'))
      .reduce((acc, next) => {
        const period = next.get('period')
        // Safe to mutate the acc argument as we created it for only this reduce
        if (!acc[period]) {
          acc[period] = {
            units: next.get('units'),
            period,
            year: next.get('year'),
            quarter: next.get('quarter'),
            total: 0,
            transport: {},
          }
        }
        const transport = next.get('transport')
        const currentVal = acc[period].transport[transport] || 0
        acc[period].transport[transport] = (currentVal + next.get('value'))
        acc[period].total += next.get('value')

        return acc
      }, {})
    return Immutable.fromJS(result)
      // Sort the types in each point
      .map(point => {
        return point.update('transport', transport => transport.sortBy(
          (_, key) => key,
          (a, b) => (transportOrder.indexOf(b) - transportOrder.indexOf(a))
        ))
      })
      // Sort the points
      .sort((a, b) => {
        if (a.get('year') === b.get('year')) {
          return a.get('quarter') - b.get('quarter')
        }
        return a.get('year') - b.get('year')
      })
  }
)

const timelineCrudeTransportQuarterSelector = createSelector(
  aggregateCrudeTransportQuarterSelector,
  timelineCrudeScaleCalculation,
  timelineGrouping,
  visualizationContentPosition,
  timelinePositionCalculation
)

const aggregateCrudeSubtypeQuarterSelector = createSelector(
  filterByHexSelector,
  points => {
    const result = points
      .filter(point => point.get('productSubtype'))
      .reduce((acc, next) => {
        const period = next.get('period')
        // Safe to mutate the acc argument as we created it for only this reduce
        if (!acc[period]) {
          acc[period] = {
            units: next.get('units'),
            period,
            year: next.get('year'),
            quarter: next.get('quarter'),
            total: 0,
            subtype: {},
          }
        }
        const subtype = next.get('productSubtype')
        const currentVal = acc[period].subtype[subtype] || 0
        acc[period].subtype[subtype] = (currentVal + next.get('value'))
        acc[period].total += next.get('value')

        return acc
      }, {})
    return Immutable.fromJS(result)
      // Sort the types in each point
      .map(point => {
        return point.update('subtype', subtype => subtype.sortBy(
          (_, key) => key,
          (key) => (key === 'Heavy' ? 1 : -1)
        ))
      })
      // Sort the points
      .sort((a, b) => {
        if (a.get('year') === b.get('year')) {
          return a.get('quarter') - b.get('quarter')
        }
        return a.get('year') - b.get('year')
      })
  }
)

const timelineCrudeSubtypeQuarterSelector = createSelector(
  aggregateCrudeSubtypeQuarterSelector,
  timelineCrudeScaleCalculation,
  timelineGrouping,
  visualizationContentPosition,
  timelinePositionCalculation
)

module.exports = {
  timelineCrudeTransportQuarterSelector,
  timelineCrudeSubtypeQuarterSelector,
}
