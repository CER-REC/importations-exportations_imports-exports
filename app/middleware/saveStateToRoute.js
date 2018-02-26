import LZUTF8 from 'lzutf8'
import createHistory from 'history/createBrowserHistory'
import QueryString from 'query-string'

import RouteComputations from '../computations/RouteComputations'

import TR from '../TranslationTable'

let unlistenHistory
let lastSave = {}
let updatingHistory = false
let updatingState = false

export const updateStateFromURL = (search, store) => {
  try {
    const { config: configRaw } = QueryString.parse(search)
    if (!configRaw) { return }
    const config = JSON.parse(LZUTF8.decompress(decodeURIComponent(configRaw), { inputEncoding: 'Base64' }))

    // Always determine language from the path in the URL bar, rather than
    // the language attribute from the config.
    config.language = RouteComputations.determineLanguage(document.location)

    updatingState = true
    store.dispatch({
      type: 'urlRouteChanged',
      payload: config,
    })
    updatingState = false
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failure reloading state from URL:', e)
  }
}

export default (store) => {
  // During the middleware instantiation, set up our History listener
  const history = createHistory()
  // Stop listening to the previous history object
  if (unlistenHistory) { unlistenHistory() }

  unlistenHistory = history.listen((location) => {
    // Ignore history updates that occur while the middleware is running
    if (updatingHistory === true) { return }

    updateStateFromURL(location.search, store)
  })

  return next => (action) => {
    next(action)

    // Don't update the URL if we're currently updating the state
    if (updatingState) { return }

    const state = store.getState()
    const { importExportVisualization: visualization } = state
    const toSave = {
      visualizationSettings: {
        [visualization]: state.visualizationSettings[visualization],
      },
      electricityExplanation: state.electricityExplanation,
      importExportVisualization: visualization,
      language: state.language,
      showExplanations: state.showExplanations,
      openExplanations: state.openExplanations,
      confidentialityMenu: state.confidentialityMenu,
      openConfidentiality: state.openConfidentiality,
      screenshot: state.screenshot,
    }

    const changed = Object.keys(toSave).some(key => toSave[key] !== lastSave[key])
    // If the options havent changed, don't update the URL
    if (changed === false) { return }
    lastSave = toSave

    const compressed = encodeURIComponent(LZUTF8.compress(JSON.stringify(toSave), { outputEncoding: 'Base64' }))
    updatingHistory = true
    const baseURL = TR.getIn(['applicationPath', state.language])
    const visualizationPath = TR.getIn([
      'visualizationPaths',
      state.importExportVisualization,
      state.language,
    ])
    history.push(`${baseURL}${visualizationPath}?config=${compressed}`)
    updatingHistory = false
  }
}
