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

export default (store) => {
  // Set up reselect tools
  ReselectTools.getStateWith(() => store.getState())

  ReselectTools.registerSelectors(core)
  ReselectTools.registerSelectors(data)
  ReselectTools.registerSelectors(mapLayout)
  ReselectTools.registerSelectors(menus)
  ReselectTools.registerSelectors(Padd)
  ReselectTools.registerSelectors(renderData)
  ReselectTools.registerSelectors(timeline)
  ReselectTools.registerSelectors(translate)
  ReselectTools.registerSelectors(visualizationSettings)
}
