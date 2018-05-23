import { createSelector } from 'reselect'

import { visualizationContentPosition, viewport } from './index'
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
  visContent => Object.assign({}, visContent, { height: -70 }),
)

export const individualChartsPosition = createSelector(
  basePos,
  viewport,
  (startPos, viewp) => {
    let lastPos = startPos
    const positions = {}
    const height = viewp.get('changeWidthRatio') > 1.2 ? 100 : 75
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
          top: lastPos.top + lastPos.height + 30,
          height: axisHeight,
        }),
        chart: Object.assign({}, lastPos, {
          top: lastPos.top + lastPos.height + 30 + axisHeight,
          height,
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
    top: startPos.top - 60,
    height: 19,
  }),
)
