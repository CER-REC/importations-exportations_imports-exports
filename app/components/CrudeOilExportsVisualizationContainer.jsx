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
import DetailTotal from './DetailTotal'
import ConfidentialCount from './ConfidentialCount'
import MissingDataCount from './MissingDataCount'
import ExplanationDot from './ExplanationDot'
import * as CrudeOilViewport from '../selectors/viewport/crudeOilExports'
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
    <CAPadd {...props.canadaPaddChart} />
    <StackedChart
      {...props.transportChart}
      valueKey="transport"
      activityValueKey="exports"
      groupBy="period"
      scaleKey="total"
    />
    <DetailSidebar
      {...props.transportChart}
    >
      <div className="crudeTriangle" />
      <div style={{ left: -20 }}>
      <DetailBreakdownHeader
        trContent={Tr.getIn(['detailBreakDown', 'crudeOilExports', 'transport', 'header'])}
        color="black"
        type="crudeOilTypeMode"
      />
      </div>
      <div style={{ height: 'calc(100% - 20px)', overflow: 'auto' }}>
        <DetailBreakdown
          height="100%"
          groupBy="activity"
          showGroup="exports"
          valueKey="transport"
          valueAverage
          showHeader={false}
          colors={categoryColours.getIn(['crudeOilExports', 'transport'])}
          colorBox
          trContent={Tr.getIn(['detailBreakDown', 'crudeOilExports', 'transport'])}
          nameMappings={Tr.get('label')}
        />
      </div>
      <ConfidentialCount
        valueKey="transport"
        filterActivity="exports"
        groupBy="activity"
      />
    </DetailSidebar>
    <StackedChart
      {...props.subtypeChart}
      valueKey="productSubtype"
      activityValueKey="exports"
      groupBy="period"
      scaleKey="total"
    />
    <DetailSidebar
      {...props.subtypeChart}
    >
      <div className="crudeTriangle" />
      <DetailBreakdownHeader
        trContent={Tr.getIn(['detailBreakDown', 'crudeOilExports', 'productSubtype', 'header'])}
        color="black"
        type="crudeOilTypeMode"
      />
      <div style={{ height: 'calc(100% - 20px)', overflow: 'auto' }}>
        <DetailBreakdown
          height="100%"
          groupBy="activity"
          showGroup="exports"
          valueKey="productSubtype"
          valueAverage
          showHeader={false}
          colors={categoryColours.getIn(['crudeOilExports', 'productSubtype'])}
          colorBox
          trContent={Tr.getIn(['detailBreakDown', 'crudeOilExports', 'productSubtype'])}
          nameMappings={Tr.get('label')}
        />
      </div>
      <ConfidentialCount
        valueKey="productSubtype"
        filterActivity="exports"
        groupBy="activity"
      />
    </DetailSidebar>
    <Axis
      {...props.axisPosition}
      barWidth={4}
      canChangeScale={false}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
    />
    <BarChart
      {...props.exportChart}
      valueKey="activity"
      activityValueKey="exports"
      groupBy="period"
      flipped
      colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
    />
    <DetailSidebar {...props.exportChart}>
      <div className="verticalAlign">
        <div className="centered" style={{ position: 'relative' }}>
          <DetailTotal
            type="exports"
            filterActivity="exports"
            showGroup="exports"
            groupBy="activity"
            valueKey="destination"
            valueAverage
          />
          <ConfidentialCount
            valueKey="destinationKey"
            filterActivity="exports"
            groupBy="activity"
          />
          <MissingDataCount
            valueKey="destinationKey"
            filterActivity="exports"
            groupBy="activity"
          />
          <svg width="12" height="12" style={{ position: 'absolute', top: 1, left: -9 }}>
            <ExplanationDot
              scale="scale(0.7) scale(-1 1)"
              lineStroke="1.3"
              textBoxWidth={110}
              linePath="
                M142.16,
                173.94l24.26,
                36.69a40.12,
                40.12,0,0,0,
                33.47,
                18H344.2"
              xPosition={5}
              yPosition={5}
              lineX={344.16}
              lineY={173}
              textX={0}
              textY={42}
              containerX={(props.exportChart.left + props.exportChart.width) - 143}
              containerY={props.exportChart.top + 36}
              name="crudeExportsTotal"
              text={Tr.getIn(['explanations', 'crudeExportsTotal', props.language])}
            />
          </svg>
        </div>
      </div>
    </DetailSidebar>
    <USPadd {...props.usPaddChart} />
    <DetailSidebar
      {...props.exportBreakdown}
    >
      <DetailBreakdown
        height="100%"
        groupBy="activity"
        showGroup="exports"
        valueKey="destination"
        valueAverage
        color={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
        trContent={Tr.getIn(['detailBreakDown', 'crudeOilExports', 'exports'])}
        nameMappings={Tr.getIn(['Padd', 'us'])}
      />
    </DetailSidebar>

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
  language: PropTypes.string.isRequired,
}

export default connect((state, props) => ({
  transportChart: CrudeOilViewport.chartTransportPosition(state, props),
  subtypeChart: CrudeOilViewport.chartSubtypePosition(state, props),
  axisPosition: CrudeOilViewport.chartAxisPosition(state, props),
  exportChart: CrudeOilViewport.chartExportPosition(state, props),
  canadaPaddChart: CrudeOilViewport.canadaPaddPosition(state, props),
  usPaddChart: CrudeOilViewport.usPaddPosition(state, props),
  exportBreakdown: CrudeOilViewport.exportBreakdown(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  language: state.language,
}))(CrudeOilVisualizationContainer)
