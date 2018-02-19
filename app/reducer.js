import { combineReducers } from 'redux'
import { Iterable } from 'immutable'

import ViewportReducer from './reducers/ViewportReducer'
import ImportExportVisualizationReducer from './reducers/ImportExportVisualizationReducer'
import LanguageReducer from './reducers/LanguageReducer'
import ShowExplanationsReducer from './reducers/ShowExplanationsReducer'
import ElectricityExplanationReducer from './reducers/ElectricityExplanationReducer'
import ExpandImportExportMenuReducer from './reducers/ExpandImportExportMenuReducer.js'
import ExpandElectricitySortMenuReducer from './reducers/ExpandElectricitySortMenuReducer.js'
import ExpandElectricityAmountMenuReducer from './reducers/ExpandElectricityAmountMenuReducer.js'
import { reducer as ModalReducer } from './actions/modal'
import { reducer as DataReducer } from './actions/data'
import { reducer as BinsReducer } from './actions/bins'
import { reducer as ScreenshotModeReducer } from './actions/screenshot'
import { reducer as visualizationSettings } from './actions/visualizationSettings'
import { reducer as DataLoadCompleteReducer } from './actions/DataLoadComplete'
import { reducer as ExplanationPopoverReducer } from './actions/explanations'
import { reducer as SocialBarReducer } from './actions/socialBar'
import { reducer as activeMenu } from './actions/activeMenu'
import { reducer as ConfidentialityMenuReducer } from './actions/confidentialityMenu'
import { reducer as ConfidentialityPopoverReducer } from './actions/confidentiality'

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
  importExportVisualization: ImportExportVisualizationReducer,
  language: LanguageReducer,
  electricityExplanation: ElectricityExplanationReducer,
  showExplanations: ShowExplanationsReducer,
  expandImportExportMenu: ExpandImportExportMenuReducer,
  expandElectricityAmountMenu: ExpandElectricityAmountMenuReducer,
  expandElectricitySortMenu: ExpandElectricitySortMenuReducer,
  data: DataReducer,
  bins: BinsReducer,
  dataLoadingComplete: DataLoadCompleteReducer,
  visualizationSettings,
  expandSocialBar: SocialBarReducer,
  modal: ModalReducer,
  confidentialityMenu: ConfidentialityMenuReducer,
  explanation: ExplanationPopoverReducer,
  openConfidentiality: ConfidentialityPopoverReducer,
  screenshotMode: ScreenshotModeReducer,
  activeMenu,
})

export default (initialState = {}, action) => {
  let state = initialState
  if (action.type === 'urlRouteChanged') {
    state = mergeDeep(state, action.payload)
  }
  return nestedReducers(state, action)
}
