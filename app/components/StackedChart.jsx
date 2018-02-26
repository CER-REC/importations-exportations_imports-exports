import React from 'react'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import AxisGuide from './AxisGuide'
import Constants from '../Constants'
import { timelineData } from '../selectors/timeline'
import { groupingBy as timelineGrouping } from '../selectors/data'

import trSelector from '../selectors/translate'
import tr from '../TranslationTable'

import ExplanationDot from './ExplanationDot'

class StackedChart extends Chart {
  static defaultProps = {
    ...Chart.defaultProps,
    colors: Constants.getIn(['styleGuide', 'categoryColours']),
  }

  constructor(props) {
    super(props)
    this.state = {
      axisGuide: props.trueScale.get('max'),
    }
  }

  updateAxisGuide = position => this.setState({ axisGuide: position })

  refinedPetroleumProductsBar() {
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
        xPosition={670}
        yPosition={120}
        lineX={142.16}
        lineY={173}
        textX={46}
        textY={58}
        containerX={this.props.left + 3}
        containerY={this.props.top + 260}
        name="stackedBarChartExplanation"
        text={`${this.props.tr(['explanations','barsRefinedPetroleumProducts'])}`}
    /></g>)
  }

  confidentialityExplanation() {
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={140}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H322.2"
        xPosition={698}
        yPosition={370}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={this.props.left}
        containerY={this.props.top - 237}
        name="confidentialityRefinedPetroleumProductsExplanation"
        text={`${this.props.tr(['explanations','confidentialValuesRefinedPetroleumProducts'])}`}
    /></g>)
  }

  render() {
    const {
      bars: data,
      height,
      layout,
      scale,
      color,
      colors: categoryColours,
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

    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
    const elements = data.map((point) => {
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      let offsetY = 0
      let stackIndex = 0
      const colourOffset = (categoryColours.count() - point.get('values').count())
      const lines = point
        .get('values')
        .sortBy((v, k) => k, (a, b) => (valueOrder.indexOf(a) - valueOrder.indexOf(b)))
        .map((value, type) => {
          const lineColor = categoryColours.get(stackIndex + colourOffset, color)
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
        {this.refinedPetroleumProductsBar()}
        {this.confidentialityExplanation()}
        <AxisGuide
          flipped
          scale={scale.get('y').toJS()}
          position={this.state.axisGuide}
          chartHeight={height}
          heightPerUnit={heightPerUnit}
          updatePosition={this.updateAxisGuide}
          width={this.props.width}
          barSize={layout.get('barWidth')}
        />
      </g>
    )
  }
}

export default connect((state, props) => Object.assign({
  timelineGroup: timelineGrouping(state, props),
  tr: trSelector(state, props),
}, timelineData(state, props)))(StackedChart)
