import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import ImportExportArrow from './ImportExportArrow'
import Tr from '../TranslationTable'

class CrudeOilPieceActivityExplanation extends React.Component {
  render() {
    return (<g transform={`translate(${this.props.left},${this.props.top})`}>
      <g transform="translate(0,70)">
        <ImportExportArrow
          arrowSpacing={MapPieceExplanationConstant.getIn(['crudeOil', 'styles', 'arrowSpacing'])}
          type='exports'
          color='#fff'
          arrowProps={MapPieceExplanationConstant.getIn(['crudeOil', 'arrowProps'])}
          text= {Tr.getIn(['legendMapTiles','crudeOil'])}
        />
      </g>
    </g>)
  }
}


export default CrudeOilPieceActivityExplanation
