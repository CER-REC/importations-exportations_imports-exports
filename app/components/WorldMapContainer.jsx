import React from 'react'
import { connect } from 'react-redux'
import WorldMapLayout from './WorldMapLayout.jsx'
import Immutable from 'immutable'

const WorldMapContainer = props => (
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(${props.left} ${props.top})`}>
    <WorldMapLayout
      left={props.left}
      top={props.top}
      country="world"
      valueAverage
    />
  </g>
)

const mapStateToProps = state => ({
  viewport: state.viewport,
})

export default connect(mapStateToProps)(WorldMapContainer)
