import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import ImportExportArrow from './ImportExportArrow'
import Tr from '../TranslationTable'

class CrudeOilPieceActivityExplanation extends React.Component {
  render() {
    return (<g transform={`translate(${this.props.left},${this.props.top})`}>
      <g transform="translate(10,50)">
        <ImportExportArrow
          arrowSpacing={MapPieceExplanationConstant.getIn(['crudeOilExports', 'styles', 'arrowSpacing'])}
          type="exports"
          color="#fff"
          arrowProps={MapPieceExplanationConstant.getIn(['crudeOilExports', 'arrowProps'])}
          text={Tr.getIn(['legendMapTiles', 'crudeOilExports'])}
        />
      </g>
    </g>)
  }
}


export default CrudeOilPieceActivityExplanation
