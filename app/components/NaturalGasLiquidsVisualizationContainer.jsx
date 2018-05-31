import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'


import BarChart from './BarChart'
import StackedChart from './StackedChart'
import Axis from './Axis'
import * as NaturalGasLiquidsViewport from '../selectors/viewport/naturalGasLiquids'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import USPadd from './Padds/USPadd'
import NaturalGasCanadaMapContainer from './NaturalGasCanadaMapContainer'
import { legendMapPosition } from '../selectors/viewport/menus'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
import NaturalGasLiquidsMapPieceActivityExplanation from './NaturalGasLiquidsMapPieceActivityExplanation'
import DetailSidebar from './DetailSidebar'
import DetailBreakdown from './DetailBreakdown'
import DetailTotal from './DetailTotal'
import ConfidentialCount from './ConfidentialCount'
import MissingDataCount from './MissingDataCount'

class NaturalGasLiquidsVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <NaturalGasCanadaMapContainer
        {...this.props.canadaMap}
      />
      {!this.props.showImports ? null : (
        <g>
          <StackedChart
            {...this.props.importChart}
            valueKey="productSubtype"
            activityValueKey="imports"
            groupBy="period"
            scaleKey="total"
          />
          <DetailSidebar {...this.props.canadaMap}>
            <DetailBreakdown
              {...this.props.importChart}
              height="auto"
              groupBy="activity"
              valueKey="productSubtype"
              showGroup="imports"
              showHeader={false}
              valueAverage
              colors={Constants.getIn(['styleGuide', 'categoryColours', 'naturalGasLiquids', 'productSubtype','imports'])}
              colorBox
              trContent={Tr.getIn(['detailBreakDown', 'naturalGasLiquids', 'imports'])}
              nameMappings={Tr.get('subType')}
            />
          </DetailSidebar>
          <DetailSidebar {...this.props.importChart}>
            <div className="verticalAlign">
              <div className="centered">
                <MissingDataCount
                  valueKey="destinationKey"
                  filterActivity="imports"
                  groupBy="activity"
                  country="ca"
                />
                <ConfidentialCount
                  valueKey="destinationKey"
                  filterActivity="imports"
                  groupBy="activity"
                  country="ca"
                />
                <DetailTotal
                  type="imports"
                  filterActivity="imports"
                  showGroup="imports"
                  valueAverage
                  groupBy="activity"
                  valueKey="productSubtype"
                />
              </div>
            </div>
          </DetailSidebar>
        </g>
      )}
      <Axis
        {...this.props.axisPosition}
        barWidth={4}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
      {!this.props.showExports ? null : (
        <g>
          <StackedChart
            {...this.props.exportChart}
            valueKey="productSubtype"
            activityValueKey="exports"
            groupBy="period"
            scaleKey="total"
            valueAverage
            flipped
          />
          <DetailSidebar {...this.props.exportChart}>
            <div className="verticalAlign">
              <div className="centered">
                <DetailTotal
                  type="exports"
                  filterActivity="exports"
                  showGroup="exports"
                  groupBy="activity"
                  valueAverage
                  valueKey="productSubtype"
                />
                <ConfidentialCount
                  valueKey="destinationKey"
                  filterActivity="exports"
                  groupBy="activity"
                  country="us"
                />
                <MissingDataCount
                  valueKey="destinationKey"
                  filterActivity="exports"
                  groupBy="activity"
                  country="us"
                />
              </div>
            </div>
          </DetailSidebar>
          <DetailSidebar {...this.props.exportBreakdown}>
            <DetailBreakdown
              {...this.props.exportBreakdown}
              height="auto"
              groupBy="activity"
              valueKey="productSubtype"
              showGroup="exports"
              showHeader={false}
              valueAverage
              colors={Constants.getIn(['styleGuide', 'categoryColours', 'naturalGasLiquids', 'productSubtype', 'exports'])}
              colorBox
              trContent={Tr.getIn(['detailBreakDown', 'naturalGasLiquids', 'exports'])}
              nameMappings={Tr.get('subType')}
            />
          </DetailSidebar>
        </g>
      )}
      <USPadd 
      aggregateKey="productSubtype" 
      {...this.props.usPaddChart} 
      valueAverage />
      <NaturalGasLiquidsMapPieceActivityExplanation
        {...this.props.mapPieceActivityExplanation}
      />
    </g>)
  }
}

export default connect((state, props) => ({
  canadaMap: NaturalGasLiquidsViewport.canadaImportMap(state, props),
  importChart: NaturalGasLiquidsViewport.chartImportPosition(state, props),
  axisPosition: NaturalGasLiquidsViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasLiquidsViewport.chartExportPosition(state, props),
  usPaddChart: NaturalGasLiquidsViewport.usPaddPosition(state, props),
  exportBreakdown: NaturalGasLiquidsViewport.exportBreakdown(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(NaturalGasLiquidsVisualizationContainer)
