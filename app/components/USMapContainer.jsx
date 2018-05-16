import React from 'react'
import { connect } from 'react-redux'
import ElectricityMapLayout from './ElectricityMapLayout.jsx'
import Immutable from 'immutable'

const USMapContainer = (props) => (
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(${props.left} ${props.top})`}>
    <ElectricityMapLayout
      left={props.left}
      top={props.top}
      country="us"
    />
  </g>
)

const mapStateToProps = state => ({
  viewport: state.viewport,
})


export default connect(mapStateToProps)(USMapContainer)
