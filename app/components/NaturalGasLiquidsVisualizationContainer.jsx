import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'

/*
import BarChart from './BarChart'
import Axis from './Axis'
*/
import * as NaturalGasLiquidsViewport from '../selectors/viewport/naturalGasLiquids'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import USPadd from './Padds/USPadd'
import NaturalGasCanadaMapContainer from './NaturalGasCanadaMapContainer'
// import { legendMapPosition } from '../selectors/viewport/menus'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
// import NaturalGasLiquidsMapPieceActivityExplanation from './NaturalGasLiquidsMapPieceActivityExplanation'
import DetailSidebar from './DetailSidebar'
import DetailBreakdown from './DetailBreakdown'

class NaturalGasLiquidsVisualizationContainer extends React.Component {
  render() {
    return (<g>
      <NaturalGasCanadaMapContainer
        {...this.props.canadaMap}
      />
      {!this.props.showImports ? null : (
        <g>
          {/*
          <BarChart
            {...this.props.importChart}
            valueKey="imports"
            aggregateKey="activity"
            colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          */}
          <DetailSidebar {...this.props.importChart}>
            <DetailBreakdown
              {...this.props.importChart}
              groupBy="activity"
              showGroup="imports"
              valueKey="productSubtype"
              valueAverage
              showHeader={false}
              color={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
              trContent={Tr.getIn(['detailBreakDown', 'naturalGasLiquids', 'imports'])}
              nameMappings={Tr.get('subType')}
            />
          </DetailSidebar>
        </g>
      )}
      {/*
      <Axis
        {...this.props.axisPosition}
        barWidth={4}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
      */}
      {!this.props.showExports ? null : (
        <g>
          {/*
          <BarChart
            {...this.props.exportChart}
            valueKey="exports"
            aggregateKey="activity"
            flipped
            colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          */}
          <DetailSidebar {...this.props.exportChart}>
            <DetailBreakdown
              {...this.props.exportChart}
              groupBy="activity"
              showGroup="exports"
              valueKey="productSubtype"
              valueAverage
              showHeader={false}
              color={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
              trContent={Tr.getIn(['detailBreakDown', 'naturalGasLiquids', 'exports'])}
              nameMappings={Tr.get('subType')}
            />
          </DetailSidebar>
        </g>
      )}
      <USPadd aggregateKey="productSubtype" {...this.props.usPaddChart} />
      {/*
      <NaturalGasLiquidsMapPieceActivityExplanation
        {...this.props.mapPieceActivityExplanation}
      />
      */}
    </g>)
  }
}

export default connect((state, props) => ({
  canadaMap: NaturalGasLiquidsViewport.canadaImportMap(state, props),
  importChart: NaturalGasLiquidsViewport.chartImportPosition(state, props),
  // axisPosition: NaturalGasLiquidsViewport.chartAxisPosition(state, props),
  exportChart: NaturalGasLiquidsViewport.chartExportPosition(state, props),
  usPaddChart: NaturalGasLiquidsViewport.usPaddPosition(state, props),
  // mapPieceActivityExplanation: legendMapPosition(state, props),
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(NaturalGasLiquidsVisualizationContainer)
