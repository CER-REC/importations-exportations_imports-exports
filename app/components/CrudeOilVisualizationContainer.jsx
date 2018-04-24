import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import StackedChart from './StackedChart'
import BarChart from './BarChart'
import Axis from './Axis'
import DetailSidebar from './DetailSidebar'
import DetailBreakdown from './DetailBreakdown'
import DetailBreakdownHeader from './DetailBreakdownHeader'
import * as CrudeOilViewport from '../selectors/viewport/crudeOil'
import Constants from '../Constants'
import { positionShape } from '../propTypeShapes'
import USPadd from './Padds/USPadd'
import CAPadd from './Padds/CAPadd'
import { legendMapPosition } from '../selectors/viewport/menus'
import CrudeOilPieceActivityExplanation from './CrudeOilPieceActivityExplanation'
import Tr from '../TranslationTable'

const categoryColours = Constants.getIn(['styleGuide', 'categoryColours'])
const CrudeOilVisualizationContainer = props => (
  <g>
    <CAPadd
      {...props.canadaPaddChart}
    />
    <StackedChart
      {...props.transportChart}
      aggregateKey="transport"
      scaleKey="total"
    />
    <DetailSidebar
      {...props.transportChart}
    >
      <div className="crudeTriangle" />
      <DetailBreakdownHeader
        trContent={Tr.getIn(['detailBreakDown', 'crudeOil', 'transport', 'header'])}
        color="black"
        type="crudeOilTypeMode"
      />
      <div style={{ height: 'calc(100% - 20px)', overflow: 'auto' }}>
        <DetailBreakdown
          aggregateKey="transport"
          type="exports"
          valueKey="total"
          showDefault
          showHeader={false}
          colors={categoryColours.getIn(['crudeOil', 'transport'])}
          colorBox
          trContent={Tr.getIn(['detailBreakDown', 'crudeOil', 'transport'])}
          nameMappings={Tr.get('label')}
        />
      </div>
    </DetailSidebar>
    <StackedChart
      {...props.subtypeChart}
      aggregateKey="productSubtype"
      scaleKey="total"
    />
    <DetailSidebar
      {...props.subtypeChart}
    >
      <div className="crudeTriangle" />
      <DetailBreakdownHeader
        trContent={Tr.getIn(['detailBreakDown', 'crudeOil', 'productSubtype', 'header'])}
        color="black"
        type="crudeOilTypeMode"
      />
      <div style={{ height: 'calc(100% - 20px)', overflow: 'auto' }}>
        <DetailBreakdown
          aggregateKey="productSubtype"
          type="exports"
          valueKey="total"
          showDefault
          showHeader={false}
          colors={categoryColours.getIn(['crudeOil', 'productSubtype'])}
          colorBox
          trContent={Tr.getIn(['detailBreakDown', 'crudeOil', 'productSubtype'])}
          nameMappings={Tr.get('label')}
        />
      </div>
    </DetailSidebar>
    <Axis
      {...props.axisPosition}
      barWidth={4}
      canChangeScale={false}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
    />
    <BarChart
      {...props.exportChart}
      valueKey="exports"
      aggregateKey="activity"
      flipped
      colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
    />
    <USPadd
      { ...props.usPaddChart}     
    />
    <CrudeOilPieceActivityExplanation
        {...props.mapPieceActivityExplanation}
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

export default connect((state, props) => ({
  transportChart: CrudeOilViewport.chartTransportPosition(state, props),
  subtypeChart: CrudeOilViewport.chartSubtypePosition(state, props),
  axisPosition: CrudeOilViewport.chartAxisPosition(state, props),
  exportChart: CrudeOilViewport.chartExportPosition(state, props),
  canadaPaddChart: CrudeOilViewport.canadaPaddPosition(state, props),
  usPaddChart: CrudeOilViewport.usPaddPosition(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
}))(CrudeOilVisualizationContainer)
