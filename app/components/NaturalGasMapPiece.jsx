import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import ImportExportArrow from './ImportExportArrow'
import MapPiece from './MapPiece'

class NaturalGasMapPiece extends MapPiece{
  drawArrow(legends, data, type, styles, arrowProps) {
    if (data.get(type) !== 0) {
      let color = this.getArrowColor(type, data.getIn(['activities',type]))
      if(typeof this.props.arrowProps !== 'undefined' && typeof this.props.arrowProps.get('fill') !== 'undefined'){
        color = this.props.arrowProps.get('fill') 
      }
      return (<ImportExportArrow
        arrowSpacing={styles.get('arrowSpacing')}
        type={type}
        color= {color}
        arrowProps={arrowProps}
        text = {this.props.text}
      />)
    }
    return ''
  }
}

export default NaturalGasMapPiece
