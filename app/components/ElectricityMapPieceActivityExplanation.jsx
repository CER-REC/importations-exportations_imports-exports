import React from 'react'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import Tr from '../TranslationTable'
import Immutable from 'immutable'

class ElectricityMapPieceActivityExplanation extends React.Component {
  render() {
    const emptyMap = new Immutable.Map()
    return (<g transform={`translate(${this.props.left + 1},${this.props.top})`}>
      <MapPiece
        value={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'datapoint'])}
        confidential={emptyMap}
        tilePosition={emptyMap}
        dimensions={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'dimensions'])}
        legends={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'legends'])}
        legend
        styles={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'styles'])}
        arrowProps={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'arrowProps'])}
        mapPieceProps={MapPieceExplanationConstant.getIn(['electricity', 'ca', 'mapPieceProps'])}
        text={Tr.getIn(['legendMapTiles', 'electricity', 'ca'])}
        mapPieceKey='name'
        mapPieceStyleClass = 'mapPieceText'
      />
      <g transform="translate(0,70)">
        <MapPiece
          value={MapPieceExplanationConstant.getIn(['electricity', 'us', 'datapoint'])}
          confidential={emptyMap}
          tilePosition={emptyMap}
          dimensions={MapPieceExplanationConstant.getIn(['electricity', 'us', 'dimensions'])}
          legends={MapPieceExplanationConstant.getIn(['electricity', 'us', 'legends'])}
          legend
          styles={MapPieceExplanationConstant.getIn(['electricity', 'us', 'styles'])}
          arrowProps={MapPieceExplanationConstant.getIn(['electricity', 'us', 'arrowProps'])}
          mapPieceProps={MapPieceExplanationConstant.getIn(['electricity', 'us', 'mapPieceProps'])}
          text={Tr.getIn(['legendMapTiles', 'electricity', 'us'])}
          mapPieceKey='name'
          mapPieceStyleClass = 'mapPieceText'
        />
      </g>
            </g>)
  }
}


export default ElectricityMapPieceActivityExplanation
