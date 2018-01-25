require('babel-polyfill')

const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')
const ReactHotLoader = require('react-hot-loader')
const Request = require('client-request/promise')

const Constants = require('./Constants.js')
const RouteComputations = require('./computations/RouteComputations.js')
const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator.js')
const LoadDataCreator = require('./actions/data').LoadData
const LoadBinsCreator = require('./actions/bins').LoadBins
const SetFromRouterState = require('./actions/screenshot').SetFromRouterState

const Store = require('./Store.js')

const store = Store()

function render(Component) {
  const app = (
    <ReactHotLoader.AppContainer>
      <ReactRedux.Provider store={store}>
        <Component />
      </ReactRedux.Provider>
    </ReactHotLoader.AppContainer>
  )

  ReactDOM.render(app, document.getElementById('reactRoot'))
}

function resizeScreenHandler() {
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  let w = document.getElementById('reactRoot').clientWidth
  let h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  store.dispatch(Resized(w, h))

  if(store.getState().screenshotMode) {
    h = Constants.get('screenshotHeight')
    w = Constants.get('screenshotWidth')
  } 
  store.dispatch(Resized(w,h))
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

// added for screenshot

const routerState = RouteComputations.urlParamsToState(document.location)

store.dispatch(SetFromRouterState({
  language: routerState.language,
  visualizationContainer: routerState.visualizationContainer,
  confidentiality: routerState.confidentiality,
  explanations: routerState.explanations,
  detailSidebar: routerState.detailSidebar,
  header: routerState.header,
  menuBar: routerState.menuBar,
  screenshotMode: RouteComputations.screenshotMode(location),
}))

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root.jsx', () => {
    render(require('./components/Root.jsx')) // eslint-disable-line global-require
  })
}
