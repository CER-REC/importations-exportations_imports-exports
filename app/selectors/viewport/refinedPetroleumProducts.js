import { createSelector } from 'reselect'

import { visualizationContentPosition } from './index'
import Constants from '../../Constants'

const axisHeight = Constants.getIn(['timeline', 'axisHeight'])

export const stackedChartPosition = createSelector(
  visualizationContentPosition,
  startPos => ({
    axis: Object.assign({}, startPos, {
      top: startPos.top,
      height: axisHeight,
    }),
    chart: Object.assign({}, startPos, {
      top: startPos.top + axisHeight,
      height: 500,
    }),
  }),
)

const basePos = createSelector(
  visualizationContentPosition,
  visContent => Object.assign({}, visContent, { height: -50 }),
)

export const individualChartsPosition = createSelector(
  basePos,
  (startPos) => {
    let lastPos = startPos
    const positions = {}
    const types = [
      'Partially Processed Oil',
      'Jet Fuel',
      'Heavy Fuel Oil',
      'Motor Gasoline',
      'Middle Distillate',
    ]
    types.forEach((key) => {
      positions[key] = {
        axis: Object.assign({}, lastPos, {
          top: lastPos.top + lastPos.height + 50,
          height: axisHeight,
        }),
        chart: Object.assign({}, lastPos, {
          top: lastPos.top + lastPos.height + 50 + axisHeight,
          height: 100,
        }),
      }
      lastPos = positions[key].chart
    })
    return positions
  },
)

export const sidebarTotalPosition = createSelector(
  basePos,
  startPos => ({
    ...startPos,
    top: startPos.top - 29,
    height: 19,
  }),
)
