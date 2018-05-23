import React from 'react'
import { connect } from 'react-redux'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import Tr from '../TranslationTable'
import { visualizationSettings } from '../selectors/visualizationSettings'
import Immutable from 'immutable'

class NaturalGasPieceActivityExplanation extends React.Component {
  render() {
    let activity = 'importsExports'
    const emptyMap = new Immutable.Map()
    if (['importsForReexport', 'exportsForReimport'].includes(this.props.activityGroup.get('activity'))) {
      activity = this.props.activityGroup.get('activity')
    }
    return (<g transform={`translate(${this.props.left + 1},${this.props.top + 30})`}>
      <MapPiece
        value={MapPieceExplanationConstant.getIn(['naturalGas', 'datapoint'])}
        name={MapPieceExplanationConstant.getIn(['naturalGas', 'datapoint', 'name'])}
        confidential={emptyMap}
        tilePosition={emptyMap}
        dimensions={MapPieceExplanationConstant.getIn(['naturalGas', 'dimensions'])}
        legends={MapPieceExplanationConstant.getIn(['naturalGas', 'legends'])}
        styles={MapPieceExplanationConstant.getIn(['naturalGas', 'styles'])}
        arrowProps={MapPieceExplanationConstant.getIn(['naturalGas', 'arrowProps'])}
        mapPieceProps={MapPieceExplanationConstant.getIn(['naturalGas', 'mapPieceProps'])}
        text={Tr.getIn(['legendMapTiles', 'naturalGas', activity])}
        x1={0}
        y1={0}
        mapPieceKey="name"
        mapPieceStyleClass="mapPieceText"
        drawLabelLineImportY={-32}
        drawLabelLabelImportY={-28}
      />
    </g>)
  }
}

const mapStateToprops = (state, props) => ({
  activityGroup: visualizationSettings(state, props),
})

export default connect(mapStateToprops)(NaturalGasPieceActivityExplanation)
