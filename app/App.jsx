require('babel-polyfill')

const ReactDOM = require('react-dom')
const DomReady = require('domready')
const ReactRedux = require('react-redux')
const React = require('react')

const Store = require('./Store.js')

const store = Store()

DomReady( () => {

  const app = <ReactRedux.Provider store={store}>
    <div>Hello World</div>
  </ReactRedux.Provider>

  ReactDOM.render(app, document.getElementById('reactRoot'))
})