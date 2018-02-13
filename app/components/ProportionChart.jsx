import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import Constants from '../Constants'
import DetailSidebar from './DetailSidebar'
import ConfidentialCount from './ConfidentialCount'
import DetailBreakdownRow from './DetailBreakdownRow'
import DetailTotal from './DetailTotal'
import { timelineGrouping, timelineData } from '../selectors/timeline'
import { amount } from '../selectors/data'

const transportationMode = [
  'Pipeline',
  'Marine',
  'Railroad',
  'Truck',
]

const crudeOilTypeMode = [
  'Heavy',
  'Light',
]

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
  calculateBreakdown(data, detailBreakdownList) {
    return data.reduce((acc, next) => {
      acc.total += next.get('total')
      detailBreakdownList.forEach(type => {
        acc.values[type] = (acc.values[type] || 0) + next.getIn(['values', type], 0)
      })
      return acc
    }, { total: 0, values: {} })
  }

  renderDetailSideBar(data, detailBreakdownKey, categoryColours){
    let detailBreakdownList = []
    if(detailBreakdownKey === 'transport'){
      detailBreakdownList = transportationMode
    } else if(detailBreakdownKey === 'type'){
      detailBreakdownList = crudeOilTypeMode
    }
    const breakdown = this.calculateBreakdown(data, detailBreakdownList)
    return <DetailSidebar
          {...this.props}
        >
        <table width="100%" className="detailBreakDownContainer" style={{ padding: '8px 0' }}>
          <tbody>
            {Object.keys(breakdown.values).map((key, i) => {
              const colour = categoryColours.get(
                i + (categoryColours.count() - detailBreakdownList.length),
                Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
              )
              return (
                <DetailBreakdownRow
                  key={key}
                  label={
                    <span>
                      <div
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          marginRight: '4px',
                          backgroundColor: colour,
                        }}
                      />
                      <strong>{key}</strong>
                    </span>
                  }
                  value={breakdown.values[key]}
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
          aggregateKey={detailBreakdownKey}
        />
    </DetailSidebar>
  }
  render() {
    const {
      bars: data,
      height,
      layout,
      color,
      colors: categoryColours,
    } = this.props
    const elements = data.map((point) => {
      const heightPerUnit = height / point.get('total')
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      let offsetY = 0
      let stackIndex = 0
      const colourOffset = (categoryColours.count() - point.get('values').count())
      const lines = point
        .get('values')
        .map((value, type) => {
          const lineColor = categoryColours.get(stackIndex + colourOffset, color)
          const line = (
            <AnimatedLine
              x1={point.get('offsetX')}
              x2={point.get('offsetX')}
              y2={height - offsetY}
              y1={height - (offsetY + value * heightPerUnit)}
              key={type}
              strokeWidth={layout.get('barWidth')}
              stroke={lineColor}
              opacity={opacity}
              animate={{ y1: '1s' }}
            />
          )
          offsetY += (value * heightPerUnit)
          stackIndex++
          return line
        })
        .toArray()
      return <g key={`${point.get('year')}-${point.get('quarter')}`}>{lines}</g>
    }).toArray()
    return (
      <g transform={this.getTransform()}>
        {elements}
        {this.renderDetailSideBar(data, this.props.detailBreakdownKey ,categoryColours)}
      </g>
    )
  }
}

export default connect((state, props) => Object.assign({
  timelineGroup: timelineGrouping(state, props),
  unit: amount(state, props),
}, timelineData(state, props)))(ProportionChart)
