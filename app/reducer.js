import { combineReducers } from 'redux'
import { Iterable } from 'immutable'

import { reducer as ViewportReducer } from './actions/viewport'
import { reducer as SetVisualizationReducer } from './actions/setVisualization'
import { reducer as LanguageReducer } from './actions/language'
import { reducer as ExplanationsEnabledReducer } from './actions/explanationsEnabled'
import { reducer as ModalReducer } from './actions/modal'
import { reducer as DataReducer } from './actions/data'
import { reducer as BinsReducer } from './actions/bins'
import { reducer as ScalesReducer } from './actions/scales'
import { reducer as visualizationSettings } from './actions/visualizationSettings'
import { reducer as DataLoadCompleteReducer } from './actions/DataLoadComplete'
import { reducer as ExplanationPopoverReducer } from './actions/explanations'
import { reducer as SocialBarReducer } from './actions/socialBar'
import { reducer as activeMenu } from './actions/activeMenu'
import { reducer as ConfidentialityMenuReducer } from './actions/confidentialityMenu'
import { reducer as ConfidentialityPopoverReducer } from './actions/confidentiality'
import { reducer as timelinePlayback } from './actions/timelinePlayback'
import { reducer as chartOutliers } from './actions/chartOutliers'

const mergeDeep = (old, merge) => {
  if (old === Object(old) && Array.isArray(old) === false) {
    if (Iterable.isIterable(old)) { return old.mergeDeep(merge) }
    const newVal = { ...old }
    Object.keys(merge).forEach((key) => {
      newVal[key] = mergeDeep(old[key], merge[key])
    })
    return newVal
  }
  // This cannot be merged. Return the new value
  return merge
}

const nestedReducers = combineReducers({
  viewport: ViewportReducer,
  importExportVisualization: SetVisualizationReducer,
  language: LanguageReducer,
  showExplanations: ExplanationsEnabledReducer,
  data: DataReducer,
  bins: BinsReducer,
  scales: ScalesReducer,
  dataLoadingComplete: DataLoadCompleteReducer,
  visualizationSettings,
  expandSocialBar: SocialBarReducer,
  modal: ModalReducer,
  openExplanations: ExplanationPopoverReducer,
  confidentialityMenu: ConfidentialityMenuReducer,
  openConfidentiality: ConfidentialityPopoverReducer,
  activeMenu,
  timelinePlayback,
  chartOutliers,
})

export default (initialState = {}, action) => {
  let state = initialState
  if (action.type === 'urlRouteChanged') {
    state = mergeDeep(state, action.payload)
  }
  return nestedReducers(state, action)
}
