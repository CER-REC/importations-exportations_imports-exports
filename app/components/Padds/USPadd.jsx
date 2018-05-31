import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PaddLayout from '../PaddLayout'
import Constants from '../../Constants'
import MapLayoutGridConstant from '../../MapLayoutGridConstant'

import { arrangeBy } from '../../selectors/data'
// TODO: need to move hard coded value to the constant file
const USPadd = (props) => {
  if (props.arrangeBy === 'location') {
    const paddList = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'])
      .filter((_, k) => {
        if (props.viz === 'naturalGasLiquids' && k === 'Non-USA') { return false }
        if (props.viz === 'crudeOilExports' && k === 'Mexico') { return false }
        return true
      })
    const padds = paddList.map(key => (<PaddLayout
      key={`Padd_us_${key}`}
      left={props.left}
      top={props.top}
      paddGroup={key}
      paddingX={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'left'], 0)}
      paddingY={MapLayoutGridConstant.getIn(['PaddLayout', 'us', 'padding', key, 'top'], 0)}
      country="us"
      aggregateKey={props.aggregateKey}
      valueKey={props.valueKey}
    />))
    return (
      <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')}) translate(-30 0)`}>
        {padds.toArray()}
      </g>
    )
  }
  return (
    <g transform={`scale(${props.viewport.get('changeWidthRatio')} ${props.viewport.get('changeHeightRatio')})  translate(${props.left - 30} ${props.top + 50})`}>
      <PaddLayout
        left={props.left}
        top={props.top}
        paddingX={0}
        paddingY={0}
        country="us"
        valueAverage={props.valueAverage}
        aggregateKey={props.aggregateKey}
        valueKey={props.valueKey}
      />
    </g>
  )
}

const mapStateToProps = (state, props) => ({
  arrangeBy: arrangeBy(state, props),
  viewport: state.viewport,
  viz: state.importExportVisualization,
})

module.exports = connect(mapStateToProps)(USPadd)
