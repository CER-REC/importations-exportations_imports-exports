import { fromJS } from 'immutable'

import { createSelector } from './selectHelper'
import { getVisualizationData, getActivityFilterPredicate } from './core'
import { } from './renderData'

import {
  getAggregateKey,
  getValueKey,
  selectedActivityGroup,
  timelineRange,
  timelinePlayback,
  groupingBy as timelineGrouping,
} from './data'
import { visualizationContentPosition as visContentSize } from './viewport/'
import { visualizationSettings, selectedVisualization } from './visualizationSettings'
import Constants from '../Constants'

const getScaleKey = (state, props) => props.scaleKey || getValueKey(state, props)

const mapToValue = (data, key) => data.map(v => v.get(key))

