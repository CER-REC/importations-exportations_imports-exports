import { createSelector } from 'reselect'
import Immutable from 'immutable'

import Constants from '../Constants'
import {
  visualizationSettings,
  arrangeByOverride,
  amountOverride,
  activityGroupOverride,
  selectedVisualization,
} from './visualizationSettings'

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

export const getAggregateKey = (_, props = {}) => props.aggregateKey
export const getValueKey = (_, props = {}) => props.valueKey

export const timelinePlayback = state => state.timelinePlayback

export const subType = createSelector(
  visualizationSettings,
  settings => settings.get('subtype'),
)
export const arrangeBy = createSelector(
  visualizationSettings,
  arrangeByOverride,
  (settings, override) => override || settings.get('arrangeBy'),
)

export const amount = createSelector(
  visualizationSettings,
  amountOverride,
  (settings, override) => override || settings.get('amount'),
)

const selectedActivityGroup = createSelector(
  visualizationSettings,
  activityGroupOverride,
  (settings, override) => override || settings.get('activity'),
)

export const selection = createSelector(
  visualizationSettings,
  settings => settings.get('selection'),
)

export const timelineRange = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'range']),
)

export const timelineFilterRange = createSelector(
  timelineRange,
  timelinePlayback,
  (range, playback) => (playback ? Immutable.fromJS({ start: playback, end: playback }) : range),
)

export const groupingBy = createSelector(
  visualizationSettings,
  settings => settings.getIn(['timeline', 'grouping']),
)

const dataSelector = state => state.data

const productSelector = createSelector(
  dataSelector,
  selectedVisualization,
  (data, viz) => data.get(viz, emptyMap),
)

export const unitSelector = createSelector(
  productSelector,
  amount,
  (product, unit) => product.get(unit, emptyList),
)

export const binSelector = createSelector(
  selectedVisualization,
  amount,
  state => state.bins,
  (vis, unit, bins) => bins.getIn([vis, unit], emptyList),
)

