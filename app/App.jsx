require('babel-polyfill')

const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')
const ReactHotLoader = require('react-hot-loader')

const Constants = require('./Constants.js')
const Root = require('./components/Root.jsx')
const Resized = require('./actionCreators/ResizeScreenCreator.js')
const LoadDataCreator = require('./actions/data').LoadData

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

DomReady( () => {

  resizeScreenHandler()
  window.addEventListener('resize', resizeScreenHandler)

  render(Root)
})

function resizeScreenHandler()  
{
  // Ensures the width and height of the workspace keep the ratio 900:600
  // TODO: Increase the height of the workspace by emptyCategoryOffsetRatio if
  // the empty categories are visible (i.e. empty categories state is visible).
  const w = document.getElementById('reactRoot').clientWidth
  const h = w * Constants.getIn(['workspace', 'heightToWidthRatio'])
  store.dispatch(Resized(w,h))
}

// Use jQuery since it is already in the WET4 template, and there isn't any
// point in adding additional fetch libs if we can just reuse jQuery
$.get('./data/data.json', data => { // eslint-disable-line no-undef
  store.dispatch(LoadDataCreator(data))
})

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root.jsx', () => {
    render(require('./components/Root.jsx'))
  })
}
