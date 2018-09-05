import React from 'react'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import AxisGuide from './AxisGuide'
import Constants from '../Constants'
import { timelineData, timeLineScaleValue, timeLineScaleValueByProductSubtype, timeLineScaleValueByTransport } from '../selectors/timeline'
import { groupingBy as timelineGrouping } from '../selectors/data'

import trSelector from '../selectors/translate'
import tr from '../TranslationTable'

import ExplanationDot from './ExplanationDot'

class StackedChart extends Chart {
  static defaultProps = {
    ...Chart.defaultProps,
    colors: Constants.getIn(['styleGuide', 'categoryColours']),
  }

  getScale = (props) => {
    if (props.productSubtype && props.valueKey === 'productSubtype') {
      return props.scaleByProductSubType.getIn([props.activityValueKey, props.productSubtype])
    }
    if (props.transport && props.valueKey === 'transport') {
      return props.scaleByProductTransport.getIn([props.activityValueKey, props.transport])
    }
    return props.scale.get(props.activityValueKey)
  }

  constructor(props) {
    super(props)
    this.state = {
      axisGuide: this.maxValueWithOutlier(),
    }
  }

  refinedPetroleumProductsBar() {
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 670 : 472
    if (this.props.selectedEnergy !== 'refinedPetroleumProducts') { return null }
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={100}
        textBoxHeight={150}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H288.2"
        xPosition={scaleContainerX}
        yPosition={120}
        lineX={142.16}
        lineY={173}
        textX={46}
        textY={58}
        containerX={this.props.left + 3}
        containerY={this.props.top + 260}
        name="stackedBarChartExplanation"
        text={`${this.props.tr(['explanations', 'barsRefinedPetroleumProducts'])}`}
      />
            </g>)
  }

  render() {
    const {
      bars: data,
      height,
      layout,
      color,
      colors: categoryColours,
      selectedEnergy,
    } = this.props

    const valueTotals = data.get('values')
      .reduce((acc, next) => {
        next.forEach((value, key) => {
          acc[key] = (acc[key] || 0) + value
        })
        return acc
      }, {})
    const valueOrder = Object.entries(valueTotals)
      .sort(([, a], [, b]) => (a - b)) // Sort ascending
      .map(([key]) => key)

    const scale = this.getScale(this.props)
    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))

    const elements = data.get('values').map((point, period) => {
      const opacity = this.isTimelinePointFiltered(period) ? 0.5 : 1
      let offsetY = 0
      let stackIndex = 0
      const lines = point
        .sortBy((v, k) => k, (a, b) => (valueOrder.indexOf(a) - valueOrder.indexOf(b)))
        .map((value, type) => {
          let colorPath = [selectedEnergy, type]
          if (this.props.valueKey) {
            colorPath = this.props.activityValueKey && selectedEnergy === 'naturalGasLiquids'
              ? [selectedEnergy, this.props.valueKey, this.props.activityValueKey, type]
              : [selectedEnergy, this.props.valueKey, type]
          }
          const lineColor = categoryColours.getIn(colorPath, Constants.getIn(['styleGuide', 'colours', 'ExportDefault']))
          const offsetX = this.props.barPositions.get(period)
          const line = (
            <AnimatedLine
              x1={offsetX}
              x2={offsetX}
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
      return <g key={`${period}-${this.props.activityValueKey}`}>{lines}</g>
    }).toArray()
    return (
      <g transform={this.getTransform()}>
        {elements}
        {this.refinedPetroleumProductsBar()}
        <AxisGuide
          flipped={this.props.flipped}
          scale={scale.get('y')}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
          width={this.props.width}
          barSize={layout.get('barWidth')}
          tabIndex={Constants.getIn(['tabIndex', 'start', 'visualization', 'timeline'])}
        />
      </g>
    )
  }
}

export default connect((state, props) => Object.assign({
  viewport: state.viewport,
  selectedEnergy: state.importExportVisualization,
  timelineGroup: timelineGrouping(state, props),
  tr: trSelector(state, props),
  scale: timeLineScaleValue(state, props),
  scaleByProductSubType: timeLineScaleValueByProductSubtype(state, props),
  scaleByProductTransport: timeLineScaleValueByTransport(state, props),
}, timelineData(state, props)))(StackedChart)
