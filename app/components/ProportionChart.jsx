import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import Constants from '../Constants'
import DetailSidebar from './DetailSidebar'
import ConfidentialCount from './ConfidentialCount'
import DetailBreakdownRow from './DetailBreakdownRow'
import DetailBreakdownHeader from './DetailBreakdownHeader'
import Tr from '../TranslationTable'
import { timelineData } from '../selectors/timeline'
import { amount, selection, groupingBy as timelineGrouping, filterByTimelineAndHexData } from '../selectors/data'

import ExplanationDot from './ExplanationDot'
import TrSelector from '../selectors/translate'

const dataFilter = [
  'Pipeline',
  'Marine',
  'Railroad',
  'Truck',
  'Heavy',
  'Light',
]

const productSubType = []

class ProportionChart extends Chart {
  static get propTypes() {
    return Object.assign({}, super.propTypes, {
      color: PropTypes.objectOf(PropTypes.string).isRequired,
    })
  }

  static get defaultProps() {
    return Object.assign({}, super.defaultProps, {
      colors: Constants.getIn(['styleGuide', 'categoryColours']),
    })
  }
  calculateBreakdown() {
    return this.props.filteredData.reduce((acc, next) => {
      const type = next.get(this.props.aggregateKey)
      if (!dataFilter.includes(type)) { return acc }
      acc.total += next.get('value')
      acc.values[type] = (acc.values[type] || 0) + next.get('value', 0)
      return acc
    }, { total: 0, values: {} })
  }

  crudeExplanation(data, aggregateKey) {
    if (aggregateKey === 'transport') { return }
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={190}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H378.2"
        xPosition={615}
        yPosition={62}
        lineX={142.16}
        lineY={173.94}
        textX={45}
        textY={58}
        containerX={222}
        containerY={282}
        text={`${this.props.TRSelector(['explanations', 'barCrude'])}`}
        name="crudeHeavyLightExplanation"
      />
    </g>)
  }

  renderDetailSideBar(data, aggregateKey, categoryColours, selectionState, selectedEnergy){
    const aggregateKeyList = []
    let prefix = ''
    let suffix = ''
    let trContent = new Immutable.Map()
    const dimensions = { ...this.props }
    if (aggregateKey === 'transport') {
      dimensions.top -= 20
      prefix = `${Tr.getIn(['detailBreakDown', 'crudeOil', 'transport', 'type', this.props.language])} ${Tr.getIn(['detailBreakDown', 'crudeOil', 'transport', 'action', this.props.language])}`
      trContent = Tr.getIn(['detailBreakDown', 'crudeOil', 'transport', 'header'])
    } else if (aggregateKey === 'productSubtype') {
      suffix = `${Tr.getIn(['mainMenuBar', 'crudeOil', this.props.language])}`
      trContent = Tr.getIn(['detailBreakDown', 'crudeOil', 'productSubtype', 'header'])
    }
    let content = ''
    if (selectionState.get('country') === 'us') {
      content = Tr.getIn(['detailBreakDown', 'crudeOil', 'defaultText', this.props.language])
    } else {
      const breakdown = this.calculateBreakdown()
      content = <span><table width="100%" className="detailBreakDownContainer" style={{ padding: '8px 0', height: '90px', overflowY: 'auto' }}>
        <tbody>
          {Object.entries(breakdown.values).sort((x, y) => y[1] - x[1]).map((key, i) => {
            const colour = categoryColours.getIn([selectedEnergy,aggregateKey, key[0]], Constants.getIn(['styleGuide', 'colours', 'ExportDefault']))
            let label = <span> <strong style={{ display: 'inline-block' }} className="detailBolded">{Tr.getIn(['label', key[0], this.props.language])}</strong> </span>
            if (this.props.language === 'fr' && aggregateKey !== 'transport') {
              label = <span>{suffix} <strong style={{ display: 'inline-block' }} className="detailBolded">{Tr.getIn(['label', key[0], this.props.language])}</strong></span>
            }
            return (
              <DetailBreakdownRow
                key={key}
                colorBox={<div
                          style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '8px',
                            marginRight: '4px',
                            backgroundColor: colour,
                          }}
                />}
                labelPrefix={prefix}
                label={label}
                labelSuffix={suffix}
                value={key[1]}
                unit={this.props.unit}
                total={breakdown.total}
                progressBarStyle={{ backgroundColor: colour }}
              />
            )
          })}
        </tbody>
      </table>
      <ConfidentialCount
        key="confidential"
        valueKey="total"
        aggregateKey={aggregateKey}
      /></span>
    }
    return <DetailSidebar
          {...dimensions}
        >
       <DetailBreakdownHeader
          trContent={trContent}
          color="black"
          type="crudeOilTypeMode"
        />
          {content}
    </DetailSidebar>
  }
  render() {
    const {
      bars: data,
      height,
      layout,
      color,
      colors: categoryColours,
      selectionState,
      selectedEnergy,
      aggregateKey,
    } = this.props

    const valueTotals = data
      .reduce((acc, next) => {
        next.get('values').forEach((value, key) => {
          acc[key] = (acc[key] || 0) + value
        })
        return acc
      }, {})
    const valueOrder = Object.entries(valueTotals)
      .sort(([, a], [, b]) => (a - b)) // Sort ascending
      .map(([key]) => key)
    const elements = data.map((point) => {
      const heightPerUnit = height / point.get('total')
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      let offsetY = 0
      let stackIndex = 0
      const lines = point
        .get('values')
        .sortBy((v, k) => k, (a, b) => (valueOrder.indexOf(a) - valueOrder.indexOf(b)))
        .map((value, type) => {
          let lineColor = categoryColours.getIn([selectedEnergy, aggregateKey, type], Constants.getIn(['styleGuide', 'colours', 'ExportDefault']))
          if (selectionState.get('country') === 'us') {
            lineColor = 'grey'
          }
          const line = (
            <AnimatedLine
              x1={point.get('offsetX')}
              x2={point.get('offsetX')}
              y2={height - offsetY}
              y1={height - (offsetY + (value * heightPerUnit))}
              key={type}
              strokeWidth={layout.get('barWidth')}
              stroke={lineColor}
              opacity={opacity}
              animate={{ y1: '1s' }}
            />
          )
          offsetY += (value * heightPerUnit)
          stackIndex += 1
          return line
        })
        .toArray()
      return <g key={`${point.get('year')}-${point.get('quarter')}`}>{lines}</g>
    }).toArray()
    return (
      <g transform={this.getTransform()}>
        {elements}
        {this.renderDetailSideBar(data, this.props.aggregateKey ,categoryColours, selectionState, this.props.selectedEnergy)}
        {this.crudeExplanation(data, this.props.aggregateKey)}
      </g>
    )
  }
}

export default connect((state, props) => Object.assign({
  timelineGroup: timelineGrouping(state, props),
  TRSelector: TrSelector(state, props),
  unit: amount(state, props),
  language: state.language,
  selectionState: selection(state, props),
  filteredData: filterByTimelineAndHexData(state, props),
  selectedEnergy: state.importExportVisualization,
}, timelineData(state, props)))(ProportionChart)
