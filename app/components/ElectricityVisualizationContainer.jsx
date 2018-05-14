import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Constants from '../Constants'
import Tr from '../TranslationTable'

import CanadaMapContainer from './CanadaMapContainer'
import USMapContainer from './USMapContainer'
/*
import PowerPoolContainer from './PowerPoolContainer'
import PowerPoolGrouping from './PowerPoolGrouping'
import ElectricityMapPieceActivityExplanation from './ElectricityMapPieceActivityExplanation'
*/
import BarChart from './BarChart'
 //import Axis from './Axis'

import * as ElectricityViewport from '../selectors/viewport/electricity'
import { showImportsSelector, showExportsSelector } from '../selectors/visualizationSettings'
// import { legendMapPosition } from '../selectors/viewport/menus'
import { positionShape } from '../propTypeShapes'
import DetailBreakdown from './DetailBreakdown'
import DetailSidebar from './DetailSidebar'

const ElectricityVisualizationContainer = (props) => {  
  return <g>
    {/*
    <CanadaMapContainer
      {...props.canadaMap}
    />
    */
      <BarChart
        {...props.importChart}
        valueKey="activity"
        activityValueKey="imports"
        groupBy="period"
        colour={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
        //value={value}
        //confidential={confidential}
        //missing={missing}
        //totalPoints={totalPoints}
      />
    /*
    <Axis
      {...props.axisPosition}
      barWidth={4}
      tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
    />
    {!props.showExports ? null : (
      <BarChart
        {...props.exportChart}
        valueKey="exports"
        aggregateKey="activity"
        flipped
        colour={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
        tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
      />
    )}
    */}
    <USMapContainer {...props.usMap} />
    {/*
    <PowerPoolContainer
      {...props.powerPool}
    />
    <PowerPoolGrouping
      {...props.powerPool}
    />
    <ElectricityMapPieceActivityExplanation
      {...props.mapPieceActivityExplanation}
    />
    */}
    {!props.showImports ? null : (
      <DetailSidebar {...props.canadaMap}>
        <DetailBreakdown
          {...props.canadaMap}
          filterActivity="imports"
          groupBy="activity"
          valueKey="destinationKey"
          showGroup="imports"
          showHeader={false}
          color={Constants.getIn(['styleGuide', 'colours', 'ImportDefault'])}
          trContent={Tr.getIn(['detailBreakDown', 'electricity', 'imports'])}
          nameMappings={Tr.getIn(['country', 'ca'])}
        />
      </DetailSidebar>
    )}
    {!props.showExports ? null : (
      <DetailSidebar {...props.usMap}>
        <DetailBreakdown
          {...props.usMap}
          groupBy="activity"
          valueKey="destinationKey"
          showGroup="exports"
          showHeader={false}
          color={Constants.getIn(['styleGuide', 'colours', 'ExportDefault'])}
          trContent={Tr.getIn(['detailBreakDown', 'electricity', 'exports'])}
          nameMappings={Tr.getIn(['country', 'us'])}
        />
      </DetailSidebar>
    )}
  </g>
}

ElectricityVisualizationContainer.propTypes = {
  canadaMap: PropTypes.shape(positionShape).isRequired,
  usMap: PropTypes.shape(positionShape).isRequired,
  /*
  xaxis: PropTypes.number.isRequired,
  yaxis: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  powerPool: PropTypes.shape(positionShape).isRequired,
  importChart: PropTypes.shape(positionShape).isRequired,
  axisPosition: PropTypes.shape(positionShape).isRequired,
  exportChart: PropTypes.shape(positionShape).isRequired,
  mapPieceActivityExplanation: PropTypes.shape(positionShape).isRequired,
  */
  showImports: PropTypes.bool.isRequired,
  showExports: PropTypes.bool.isRequired,
}

export default connect((state, props) => ({
  canadaMap: ElectricityViewport.canadaMapPosition(state, props),
  usMap: ElectricityViewport.usMapPosition(state, props),
  importChart: ElectricityViewport.chartImportPosition(state, props),
  /*
  powerPool: ElectricityViewport.powerPoolPosition(state, props),
  mapPieceActivityExplanation: legendMapPosition(state, props),
  axisPosition: ElectricityViewport.chartAxisPosition(state, props),
  exportChart: ElectricityViewport.chartExportPosition(state, props),
  */
  showImports: showImportsSelector(state, props),
  showExports: showExportsSelector(state, props),
}))(ElectricityVisualizationContainer)
