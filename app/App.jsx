import 'babel-polyfill'

import ReactDOM from 'react-dom'
import DomReady from 'domready'
import { Provider } from 'react-redux'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import Request from 'client-request/promise'
import * as ReselectTools from 'reselect-tools'

import Constants from './Constants'
import RouteComputations from './computations/RouteComputations'
import Root from './components/Root'
import Resized from './actionCreators/ResizeScreenCreator'
import { LoadData as LoadDataCreator } from './actions/data'
import { LoadBins as LoadBinsCreator } from './actions/bins'
import Store from './Store'
import { DismissComponent as DismissComponentCreator } from './actions/socialBar'
import { ScreenshotMode } from './actions/screenshot'
import * as DataSelectors from './selectors/data'
import * as CoreSelectors from './selectors/core'

const store = Store()

if (RouteComputations.screenshotMode()) { store.dispatch(ScreenshotMode()) }

function resizeScreenHandler() {
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  let w = document.getElementById('reactRoot').clientWidth

  // Only set the screenshot width, since the height is proportional.
  // We will use the height when we send the request to the screenshot server
  if (store.getState().screenshot) { w = Constants.get('screenshotWidth') }

  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])

  // Calculate height ratio
  const changeWidthRatio = w / 900
  const changeHeightRatio = h / 600

  store.dispatch(Resized(w, h, changeWidthRatio, changeHeightRatio))
}

// Handles collapsing the social bar.
function windowClickHandler() {
  store.dispatch(DismissComponentCreator())
}

DomReady(() => {
  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)
  window.addEventListener('click', windowClickHandler)
  const app = (
    <AppContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppContainer>
  )

  ReactDOM.render(app, document.getElementById('reactRoot'))
})

Request({
  uri: RouteComputations.dataEndpoint(),
  json: true,
}).then((data) => { // eslint-disable-line no-undef
  store.dispatch(LoadBinsCreator(data.body.bins))
  store.dispatch(LoadDataCreator(data.body.data))
})

// Set up reselect tools
ReselectTools.getStateWith(() => store.getState())
ReselectTools.registerSelectors(DataSelectors)
ReselectTools.registerSelectors(CoreSelectors)
