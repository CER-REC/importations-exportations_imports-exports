import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ExplanationPopovers from './ExplanationPopovers'
import ProportionChart from './ProportionChart'
import BarChart from './BarChart'
import Axis from './Axis'
import CrudeOilViewport from '../selectors/viewport/crudeOil'
import Constants from '../Constants'
import { positionShape } from '../propTypeShapes'
import USPadd from './Padds/USPadd'

const CrudeOilVisualizationContainer = props => (
  <g>
    <ProportionChart
      {...props.transportChart}
      aggregateKey="transport"
      scaleKey="total"
      color={{
        Pipeline: 'red',
        Marine: 'green',
        Railroad: 'blue',
        Truck: 'yellow',
      }}
    />
    <ProportionChart
      {...props.subtypeChart}
      aggregateKey="productSubtype"
      scaleKey="total"
      color={{
        Heavy: 'red',
        Light: 'green',
      }}
    />
    <Axis
      {...props.axisPosition}
      barWidth={4}
      canChangeScale={false}
    />
    <BarChart
      {...props.exportChart}
      valueKey="exports"
      aggregateKey="activity"
      flipped
      colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
    />
    <ExplanationPopovers
      xaxis={props.xaxis}
      yaxis={props.yaxis + props.height}
    />
    <USPadd 
      {...props.canadaPaddChart}
    />
  </g>
)

CrudeOilVisualizationContainer.propTypes = {
  xaxis: PropTypes.number.isRequired,
  yaxis: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  transportChart: PropTypes.shape(positionShape).isRequired,
  subtypeChart: PropTypes.shape(positionShape).isRequired,
  axisPosition: PropTypes.shape(positionShape).isRequired,
  exportChart: PropTypes.shape(positionShape).isRequired,
}

module.exports = connect((state, props) => ({
  transportChart: CrudeOilViewport.chartTransportPosition(state, props),
  subtypeChart: CrudeOilViewport.chartSubtypePosition(state, props),
  axisPosition: CrudeOilViewport.chartAxisPosition(state, props),
  exportChart: CrudeOilViewport.chartExportPosition(state, props),
  canadaPaddChart: CrudeOilViewport.canadaPaddPosition(state, props),
}))(CrudeOilVisualizationContainer)
