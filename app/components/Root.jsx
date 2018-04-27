import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { hot } from 'react-hot-loader'

import Workspace from './Workspace'

import Tr from '../TranslationTable'
import TrSelector from '../selectors/translate'
import '../styles/Common.scss'

const Root = ({ dataLoadingComplete, viewport }) => {
  //if (dataLoadingComplete) { return <div><Workspace /></div> }

  const loaderStyle = {
    height: viewport.get('y'),
    width: viewport.get('x'),
  }

  return <div style={loaderStyle}>
    <div className="loader" />
      <p className="loadingVisualization">loading visualization</p>
        <span className="loadingImports">Imports
          <span className="loadingAnd"> and </span>
          <span className="loadingExports">Exports</span>
        </span>
        <p className="loadingVisualizationTwo">of Energy Products to and from Canada</p>
    </div>
}

Root.propTypes = {
  dataLoadingComplete: PropTypes.bool.isRequired,
  viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
  language: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  dataLoadingComplete: state.dataLoadingComplete,
  Tr: TrSelector(state, props),
  language: state.language,
})

export default hot(module)(connect(mapStateToProps)(Root))
