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

const store = Store()

function render(Component) {
  const app = (
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>
  )

  ReactDOM.render(app, document.getElementById('reactRoot'))
}

function resizeScreenHandler() {
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  const w = document.getElementById('reactRoot').clientWidth
  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  store.dispatch(Resized(w, h))
}

DomReady(() => {
  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)

  render(Root)
})

Request({
  uri: RouteComputations.dataEndpoint(),
  json: true,
}).then((data) => { // eslint-disable-line no-undef
  store.dispatch(LoadBinsCreator(data.body.bins))
  store.dispatch(LoadDataCreator(data.body.data))
})

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root.jsx', () => {
    render(require('./components/Root.jsx').default) // eslint-disable-line global-require
  })
}
