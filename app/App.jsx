import 'babel-polyfill'

import ReactDOM from 'react-dom'
import DomReady from 'domready'
import { Provider } from 'react-redux'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import Request from 'client-request/promise'

import Constants from './Constants'
import RouteComputations from './computations/RouteComputations'
import Root from './components/Root'
import Resized from './actionCreators/ResizeScreenCreator'
import { LoadData as LoadDataCreator } from './actions/data'
import { LoadBins as LoadBinsCreator } from './actions/bins'
import Store from './Store'
import { DismissComponent as DismissComponentCreator } from './actions/socialBar'

const store = Store()

function resizeScreenHandler() {
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  let w = document.getElementById('reactRoot').clientWidth
  let h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  //Calcualte height ratio
  let changeWidthRatio = w/900
  let changeHeightRatio = h/600
  store.dispatch(Resized(w, h, changeWidthRatio, changeHeightRatio))

  if(store.getState().screenshotMode) {
    h = Constants.get('screenshotHeight')
    w = Constants.get('screenshotWidth')
    changeWidthRatio = w/900
    changeHeightRatio = h/600
  }
  store.dispatch(Resized(w,h, changeWidthRatio, changeHeightRatio))
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
