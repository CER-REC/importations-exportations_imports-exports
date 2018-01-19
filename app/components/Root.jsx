const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')
const Immutable = require('immutable')

const Workspace = require('./Workspace')

require('../styles/Common.scss')

const Root = ({ dataLoadingComplete, viewport }) => {
  if (dataLoadingComplete) { return <div><Workspace /></div> }

  const loaderStyle = {
    height: viewport.get('y'),
    width: viewport.get('x'),
  }
  return <div style={loaderStyle}><div className="loader" /></div>
}

Root.propTypes = {
  dataLoadingComplete: PropTypes.bool.isRequired,
  viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  dataLoadingComplete: state.dataLoadingComplete,
})

module.exports = ReactRedux.connect(mapStateToProps)(Root)
