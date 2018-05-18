import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import ImportExportArrow from './ImportExportArrow'
import Tr from '../TranslationTable'
import Immutable from 'immutable'

class NaturalGasLiquidsMapPieceActivityExplanation extends React.Component {
  render() {
    const emptyMap = new Immutable.Map()
    return (<g transform={`translate(${this.props.left + 1},${this.props.top})`}>
      <MapPiece
        dimensions={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'dimensions'])}
        legends={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'legends'])}
        legend
        styles={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'styles'])}
        arrowProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'arrowProps'])}
        mapPieceProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'mapPieceProps'])}
        text={Tr.getIn(['legendMapTiles', 'electricity', 'ca'])}
        confidential={emptyMap}
        tilePosition={emptyMap}
        value={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'datapoint'])}
        name={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'datapoint','name'])}
        mapPieceStyleClass = 'mapPieceText'
      />
      <g transform="translate(0,70)">
        <ImportExportArrow
          arrowSpacing={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'us', 'styles', 'arrowSpacing'])}
          type="exports"
          color="#fff"
          arrowProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'us', 'arrowProps'])}
          text={Tr.getIn(['legendMapTiles', 'naturalGasLiquids', 'us'])}
        />
      </g>
    </g>)
  }
}


export default NaturalGasLiquidsMapPieceActivityExplanation
