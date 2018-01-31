import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import ImportExportArrow from './ImportExportArrow'

class NaturalGasLiquidsMapPieceActivityExplanation extends React.Component {
  render() {
    return (<g transform={`translate(${this.props.left},${this.props.top})`}>
      <MapPiece
        data={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'datapoint'])}
        dimensions={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'dimensions'])}
        legends={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'legends'])}
        styles={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'styles'])}
        arrowProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'arrowProps'])}
        mapPieceProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'mapPieceProps'])}
        legend
      />
      <g transform="translate(0,70)">
        <ImportExportArrow
          arrowSpacing={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'ca', 'styles', 'arrowSpacing'])}
          type='exports'
          color='#fff'
          arrowProps={MapPieceExplanationConstant.getIn(['naturalGasLiquids', 'us', 'arrowProps'])}
        />
      </g>
            </g>)
  }
}


module.exports = NaturalGasLiquidsMapPieceActivityExplanation
