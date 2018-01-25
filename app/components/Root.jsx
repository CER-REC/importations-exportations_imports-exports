import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Workspace from './Workspace'

import '../styles/Common.scss'

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

module.exports = connect(mapStateToProps)(Root)
