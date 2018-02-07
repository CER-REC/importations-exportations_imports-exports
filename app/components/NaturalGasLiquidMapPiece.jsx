import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import ImportExportArrow from './ImportExportArrow'
import MapPiece from './MapPiece'
import MapPieceLabel from './MapPieceLabel'

class NaturalGasLiquidMapPiece extends MapPiece{
  static propTypes = {
   ...MapPiece.propTypes,
   productSubType:PropTypes.string,
  }
  drawArrow(legends, data, type, styles, arrowProps) {
    if (data.getIn(['subType',this.props.productSubType,type], 0) === 0) {
      return null
    }
    let color = this.getArrowColor(type, data.getIn(['subType',this.props.productSubType,type]))
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
}

export default NaturalGasLiquidMapPiece