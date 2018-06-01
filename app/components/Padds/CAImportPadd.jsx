import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImportPaddLayout from '../ImportPaddLayout'

// fetch x axis of the padd using the left detail side bar location
const CAImportPadd = props => (
  <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(53 0)`}>
    <ImportPaddLayout
      left={props.left}
      top={props.top}
      width={props.width}
      height={props.height}
      paddGroup="caImport"
      paddingX={15}
      paddingY={0}
      country="ca"
      valueAverage
    />
  </g>
)

const mapStateToProps = state => ({
  viewport: state.viewport,

})


export default connect(mapStateToProps)(CAImportPadd)
