import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import ImportExportArrow from './ImportExportArrow'
import Tr from '../TranslationTable'

class CrudeOilImportPieceActivityExplanation extends React.Component {
  render() {
    return (<g transform={`translate(${this.props.left},${this.props.top})`}>
      <g transform="translate(10,50)">
        <ImportExportArrow
          arrowSpacing={MapPieceExplanationConstant.getIn(['crudeOilImports', 'styles', 'arrowSpacing'])}
          type="imports"
          color="#fff"
          arrowProps={MapPieceExplanationConstant.getIn(['crudeOilImports', 'arrowProps'])}
          text={Tr.getIn(['legendMapTiles', 'crudeOilImports'])}
        />
      </g>
    </g>)
  }
}


export default CrudeOilImportPieceActivityExplanation
