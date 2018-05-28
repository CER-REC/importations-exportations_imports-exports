import Immutable from 'immutable'

import { createSelector } from './selectHelper'
import Constants from '../Constants'
import {
  visualizationSettings,
  arrangeByOverride,
  amountOverride,
  activityGroupOverride,
  selectedVisualization,
} from './visualizationSettings'

export const analyticsConstants = () => Constants.get('analytics')

const emptyMap = new Immutable.Map()
const emptyList = new Immutable.List()

export const getAggregateKey = (_, props = {}) => props.aggregateKey
export const getValueKey = (_, props = {}) => props.valueKey

export const timelinePlayback = state => state.timelinePlayback

export const getLanguage = state => state.language

export const subType = createSelector(
  visualizationSettings,
  settings => settings.get('subtype'),
)
// TODO These should be in visualizationSettings with the overrides
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

export const selectedActivityGroup = createSelector(
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

export const selectedPieces = createSelector(
  selection,
  points => points.reduce((acc, nextValue) => {
    if (Immutable.Map.isMap(nextValue)) {
      nextValue.forEach((value) => {
        acc = acc.concat(value.keySeq().toList())
      })
    } else if (Immutable.List.isList(nextValue)) {
      acc = acc.concat(nextValue)
    }
    return acc
  }, new Immutable.List()),
)

export const timeLineScaleSelector = createSelector(
  selectedVisualization,
  amount,
  visualizationSettings,
  state => state.scales,
  (vis, unit, visSettings, scale) => {
    const result = scale.getIn([vis, unit])
    return result
  },
)

export const analyticsDataSelector = createSelector(
  selectedVisualization,
  visualizationSettings,
  analyticsConstants,
  getLanguage,
  (visualization, filter, constants, language) => {
    return {
      visualization,
      filter: JSON.stringify(filter.toJS()),
      language,
      parentVisualzation: constants.get('parentVizualizationName'),
      event: constants.getIn(['events', 'visualizationInteraction']),
    }
  },
)
