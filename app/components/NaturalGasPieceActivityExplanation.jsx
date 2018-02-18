import React from 'react'
import {connect} from 'react-redux'

import MapPiece from './MapPiece'
import MapPieceExplanationConstant from '../MapPieceExplanationConstant'
import Tr from '../TranslationTable'
import {visualizationSettings} from '../selectors/visualizationSettings'
class NaturalGasPieceActivityExplanation extends React.Component {
  render() {
    console.log()
    let activity = 'importsExports'
    if(['importsForReexport', 'exportsForReimport'].includes(this.props.activityGroup.get('activity'))){
      activity = this.props.activityGroup.get('activity')
    }
    return (<g transform={`translate(${this.props.left},${this.props.top})`}>
      <MapPiece
        data={MapPieceExplanationConstant.getIn(['naturalGas', 'datapoint'])}
        dimensions={MapPieceExplanationConstant.getIn(['naturalGas', 'dimensions'])}
        legends={MapPieceExplanationConstant.getIn(['naturalGas', 'legends'])}
        styles={MapPieceExplanationConstant.getIn(['naturalGas', 'styles'])}
        arrowProps={MapPieceExplanationConstant.getIn(['naturalGas', 'arrowProps'])}
        mapPieceProps={MapPieceExplanationConstant.getIn(['naturalGas', 'mapPieceProps'])}
        text={Tr.getIn(['legendMapTiles', 'naturalGas', activity])}
        x1={0}
        y1={0}
      />
    </g>)
  }
}

const mapStateToprops = (state, props) => {
  return {
    activityGroup: visualizationSettings(state, props)
  }
}

export default connect(mapStateToprops)(NaturalGasPieceActivityExplanation)
