import React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

/*
import BarChart from './BarChart'
import StackedChart from './StackedChart'
import Axis from './Axis'
import DetailSidebar from './DetailSidebar'
import ConfidentialCount from './ConfidentialCount'
import DetailBreakdown from './DetailBreakdown'
import DetailBreakdownRow from './DetailBreakdownRow'
import DetailTotal from './DetailTotal'
import * as RefinedPetroleumProductsViewport from '../selectors/viewport/refinedPetroleumProducts'
import { arrangeBy, amount, filterByTimelineAndHexData } from '../selectors/data'
import { refinedPetroleumProductsDetailBreakdownValues } from '../selectors/details'
import { timelineData } from '../selectors/timeline'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import TrSelector from '../selectors/translate'
*/

const subtypes = [
  'Partially Processed Oil',
  'Jet Fuel',
  'Heavy Fuel Oil',
  'Motor Gasoline',
  'Middle Distillate',
]

class RefinedPetroleumProductsVisualizationContainer extends React.Component {
  calculateBreakdown() {
    return {
      values: this.props.detailBreakdownValues.toJS(),
      total: this.props.detailBreakdownValues.get('exports').max(),
    }
  }

  renderStackedChart() {
    const { stackedChart: positions, selectedEnergy } = this.props
    const categoryColours = Constants.getIn(['styleGuide', 'categoryColours'])
    const breakdown = this.calculateBreakdown()
    return (
      <g>
        <Axis
          {...positions.axis}
          barWidth={4}
          canChangeScale={false}
          canPlay={false}
          tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
        />
        <StackedChart
          {...positions.chart}
          aggregateKey="productSubtype"
          scaleKey="total"
          flipped
        />
        <DetailSidebar
          {...positions.chart}
        >
          <DetailBreakdown
            aggregateKey="productSubtype"
            type="exports"
            valueKey="total"
            showDefault
            showHeader={false}
            colors={categoryColours.getIn([selectedEnergy, 'productSubtype'])}
            colorBox
            trContent={fromJS({ body: {} }) /* Dummy content to make it render */}
            nameMappings={Tr.get('label')}
          />
          <ConfidentialCount
            key="confidential"
            valueKey="total"
            aggregateKey="productSubtype"
          />
        </DetailSidebar>
      </g>
    )
  }

  renderSeparateCharts() {
    const { individualCharts: positions, selectedEnergy } = this.props
    const categoryColours = Constants.getIn(['styleGuide', 'categoryColours'])
    const breakdown = this.calculateBreakdown()
    const charts = subtypes.map((key, i) => {
      const colour = categoryColours.getIn([selectedEnergy, 'productSubtype', key], Constants.getIn(['styleGuide', 'colours', 'ExportDefault']))
      return (
        <g key={key}>
          <Axis
            {...positions[key].axis}
            barWidth={4}
            canSeek={key === 'Partially Processed Oil'}
            canPlay={key === 'Partially Processed Oil'}
            chartOptions={key === 'Partially Processed Oil'}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          <BarChart
            {...positions[key].chart}
            valueKey={key}
            aggregateKey="productSubtype"
            flipped
            colour={colour}
            detailSidebar={false}
            tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
          />
          <DetailSidebar
            {...positions[key].chart}
          >
            <table width="100%" className="detailBreakDownContainer">
              <tbody>
                <DetailBreakdownRow
                  label={<strong>{key}</strong>}
                  value={breakdown.values.exports[key]}
                  unit={this.props.unit}
                  total={breakdown.total}
                  progressBarStyle={{ backgroundColor: colour }}
                />
              </tbody>
            </table>
            <ConfidentialCount
              key="confidential"
              valueKey={key}
              aggregateKey="productSubtype"
            />
          </DetailSidebar>
        </g>
      )
    })
    return <g>{charts}</g>
  }

  render() {
    return (
      <g>
        {/*
        <DetailSidebar {...this.props.sidebarTotal}>
          <DetailTotal
            key="total"
            type="exports"
            valueKey="total"
            aggregateKey="productSubtype"
          />
        </DetailSidebar>
        {this.props.arrangeBy === 'stack'
          ? this.renderStackedChart()
          : this.renderSeparateCharts()}
        */}
      </g>
    )
  }
}

export default connect((state, props) => ({
  /*
  selectedEnergy: state.importExportVisualization,
  stackedChart: RefinedPetroleumProductsViewport.stackedChartPosition(state, props),
  individualCharts: RefinedPetroleumProductsViewport.individualChartsPosition(state, props),
  sidebarTotal: RefinedPetroleumProductsViewport.sidebarTotalPosition(state, props),
  arrangeBy: arrangeBy(state, props),
  TRSelector: TrSelector(state, props),
  language: state.language,
  unit: amount(state, props),
  data: timelineData(state, { ...props, aggregateKey: 'productSubtype' }),
  filteredData: filterByTimelineAndHexData(state, props),
  detailBreakdownValues: refinedPetroleumProductsDetailBreakdownValues(state, props),
  */
}))(RefinedPetroleumProductsVisualizationContainer)
