import * as ReselectTools from 'reselect-tools'

import * as core from './selectors/core'
import * as data from './selectors/data'
import * as mapLayout from './selectors/mapLayout'
import * as menus from './selectors/menus'
import * as Padd from './selectors/Padd'
import * as renderData from './selectors/renderData'
import * as timeline from './selectors/timeline'
import * as translate from './selectors/translate'
import * as visualizationSettings from './selectors/visualizationSettings'

const registerSelectors = obj => Object.entries(obj)
  .filter(([, v]) => v.isSelector !== false)
  .forEach(([k, v]) => ReselectTools.registerSelectors({ [k]: v }))

export default (store) => {
  // Set up reselect tools
  ReselectTools.getStateWith(() => store.getState())

  registerSelectors(core)
  registerSelectors(data)
  registerSelectors(mapLayout)
  registerSelectors(menus)
  registerSelectors(Padd)
  registerSelectors(renderData)
  registerSelectors(timeline)
  registerSelectors(translate)
  registerSelectors(visualizationSettings)
}
