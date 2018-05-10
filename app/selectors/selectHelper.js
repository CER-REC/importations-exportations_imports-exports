import { createSelectorWithDependencies } from 'reselect-tools'
import trueCreateCachedSelector from 're-reselect'

export const createSelector = createSelectorWithDependencies

// TODO: Figure out if we can feed re-reselect into the reselect devtools
/*
export const createCachedSelector = (...funcs) => {
  const resultFunc = funcs.pop()
  const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs
  const selector = trueCreateCachedSelector(...dependencies, resultFunc)
  selector.dependencies = dependencies
  //_allSelectors.add(selector)
  return selector
}
*/
export const createCachedSelector = trueCreateCachedSelector
