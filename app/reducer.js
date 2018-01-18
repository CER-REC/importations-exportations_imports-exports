import { combineReducers } from 'redux'
import { Iterable } from 'immutable'

import ViewportReducer from './reducers/ViewportReducer'
import ImportExportVisualizationReducer from './reducers/ImportExportVisualizationReducer'
import LanguageReducer from './reducers/LanguageReducer'
import ShowExplanationsReducer from './reducers/ShowExplanationsReducer'
import { reducer as DataReducer } from './actions/data'
import ElectricityExplanationReducer from './reducers/ElectricityExplanationReducer'
import { reducer as visualizationSettings } from './actions/visualizationSettings'

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
  data: DataReducer,
  visualizationSettings,
})

export default (initialState = {}, action) => {
  let state = initialState
  if (action.type === 'urlRouteChanged') {
    state = mergeDeep(state, action.payload)
  }
  return nestedReducers(state, action)
}
