import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { hot } from 'react-hot-loader'

import Workspace from './Workspace'

import Tr from '../TranslationTable'
import TrSelector from '../selectors/translate'
import '../styles/Common.scss'

const Root = ({ dataLoadingComplete, viewport, language}) => {
  //if (dataLoadingComplete) { return <div><Workspace /></div> }

  const loaderStyle = {
    height: viewport.get('y'),
    width: viewport.get('x'),
  }

  return <div style={loaderStyle}>
    
      <div className="containerOne">    
      <p className="loadingVisualization">{Tr.getIn(['loader', 'titleText', language])}</p>

      <div className="titleContainer">
        <span className="loadingImports">{Tr.getIn(['loader', 'imports', language])}
          <span className="loadingAnd"> {Tr.getIn(['loader', 'and', language])} </span>
          <span className="loadingExports">{Tr.getIn(['loader', 'exports', language])}</span>
        </span>
      </div>

          <p className="loadingVisualizationTwo">{Tr.getIn(['loader', 'titleText_2', language])}</p>
      </div>

        <div className="circle-elements containerTwo">
            <div className="circle export"/>
            <div className="circle export"/>
            <div className="circle export"/>
            <div className="circle import"/>
            <div className="circle import"/>
            <div className="circle import"/>
            <div className="circle import"/>
            <div className="circle export"/>
        </div>
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
  language: state.language,
})

export default hot(module)(connect(mapStateToProps)(Root))
