const { createSelector } = require('reselect')

const { visualizationContentPosition } = require('./index')

const basePos = createSelector(
  visualizationContentPosition,
  visContent => Object.assign({}, visContent, { height: -50 })
)

const individualChartsPosition = createSelector(
  basePos,
  startPos => {
    let lastPos = startPos
    const positions = {}
    const types = [
      'Partially Processed Oil',
      'Jet Fuel',
      'Heavy Fuel Oil',
      'Motor Gasoline',
      'Middle Distillate',
    ]
    types.forEach(key => {
      positions[key] = {
        axis: Object.assign({}, lastPos, {
          top: lastPos.top + lastPos.height + 50,
          height: 30,
        }),
        chart: Object.assign({}, lastPos, {
          top: lastPos.top + lastPos.height + 50 + 30,
          height: 100,
        }),
      }
      lastPos = positions[key].chart
    })
    return positions
  }
)

module.exports = {
  individualChartsPosition,
}
