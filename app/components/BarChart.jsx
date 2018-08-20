import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import AxisGuide from './AxisGuide'
import DetailSidebar from './DetailSidebar'
import TextBox from './TextBox'
import { timelineData, timeLineScaleValue, timeLineScaleValueByProductSubtype } from '../selectors/timeline'
import { groupingBy as timelineGrouping } from '../selectors/data'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { toggleOutlier } from '../actions/chartOutliers'

import trSelector from '../selectors/translate'

import ExplanationDot from './ExplanationDot'

class BarChart extends Chart {
  static propTypes = {
    ...Chart.propTypes,
    valueKey: PropTypes.string.isRequired,
    detailSidebar: PropTypes.bool,
  }

  static defaultProps = {
    detailSidebar: true,
  }

  getScale = (props) => {
    if (props.valueKey === 'productSubtype') {
      return props.scaleByProductSubType.getIn([props.activityValueKey, props.productSubtype])
    }
    return props.scale.get(props.activityValueKey)
  }

  constructor(props) {
    super(props)
    this.state = {
      axisGuide: this.maxValueWithOutlier(),
    }
  }

  componentWillReceiveProps(nextProps) {
    // Reset the axis guide when the scale changes.
    // Watch scale since that changes the bar height, but use trueScale in order
    // to put the guide on top of the tallest bar
    const maxValue = Math.min(this.findMaxValues(nextProps), this.getScale(nextProps).getIn(['y', 'max']))
    if (this.findMaxValues(this.props) !== maxValue) {
      this.updateAxisGuide(maxValue)
    }
  }

  updateAxisGuide = (position) => {
    this.setState({ axisGuide: position })
  }

  orangeBarExplanation() {
    const negativeValOffset = this.calculateNegativePosition()
    let textString = `${this.props.tr(['explanations', 'barChartImport'])}`
    let xPosition = 90
    if (this.props.selectedEnergy === 'naturalGas') {
      textString = `${this.props.tr(['explanations', 'orangeBarNaturalGas'])}`
      xPosition = this.props.viewport.get('changeWidthRatio') > 1.2 ? 590 : 330
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations', 'orangeBarNaturalGasLiquids'])}`
      xPosition = this.props.viewport.get('changeWidthRatio') > 1.2 ? 590 : 360
    }
    if (this.props.selectedEnergy === 'crudeOilImports') {
      textString = `${this.props.tr(['explanations', 'barChartCrudeOilImports'])}`
    }
    if (this.props.flipped) { return null }
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
        xPosition={xPosition}
        yPosition={87 + negativeValOffset}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={this.props.left}
        containerY={this.props.top}
        name={`${this.props.selectedEnergy} importBarChartExplanation`}
        text={textString}
      />
            </g>)
  }

  blueBarExplanation() {
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : -40
    if (!this.props.flipped || this.props.selectedEnergy !== 'electricity') { return null }
    const negativeValOffset = this.calculateNegativePosition()
    return (<g>
      <ExplanationDot
        scale="scale(2.7) scale(-1 1) translate(-2 -3)"
        lineStroke="0.4"
        textBoxWidth={100}
        textBoxHeight={150}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H215.2"
        xPosition={26}
        yPosition={70 + negativeValOffset}
        lineX={244.16}
        lineY={173 + negativeValOffset}
        textX={76}
        textY={146}
        containerX={this.props.left - 278}
        containerY={this.props.left + scaleContainerY + 68}
        name={`${this.props.selectedEnergy} exportBarChartExplanation`}
        text={`${this.props.tr(['explanations', 'barChartExport'])}`}
      />
            </g>)
  }

  crudeBlueBarExplanation() {
    const negativeValOffset = this.calculateNegativePosition()
    const scaleContainerX = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : -170
    let yPosition = 0
    let textString = `${this.props.tr(['explanations', 'blueBarCrude'])}`
    let containerY = this.props.top + 100
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations', 'blueBarNaturalGasLiquids'])}`
      yPosition = 35
      containerY = this.props.top + 32
    }
    if (!this.props.flipped || (this.props.selectedEnergy !== 'crudeOilExports' && this.props.selectedEnergy !== 'naturalGasLiquids')) { return null }
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
        xPosition={632 + scaleContainerX}
        yPosition={yPosition + negativeValOffset}
        lineX={142.16}
        lineY={173}
        textX={46}
        textY={58}
        containerX={this.props.left + 3}
        containerY={containerY}
        name={`${this.props.selectedEnergy} exportBarChartExplanation`}
        text={textString}
      />
            </g>)
  }

  renderLine(point, period, negativeValOffset, barHeight, colour, opacity, overflowBarHeight = 0) {
    const offsetX = this.props.barPositions.get(period)
    return (
      <AnimatedLine
        x1={offsetX}
        x2={offsetX}
        y2={this.props.height + negativeValOffset}
        y1={(this.props.height + negativeValOffset) - barHeight - overflowBarHeight}
        key={`${period}-${this.props.valueKey}`}
        strokeWidth={this.props.layout.get('barWidth')}
        stroke={colour}
        opacity={opacity}
        animate={{ y1: '1s' }}
      />
    )
  }

  calculateHeightPerUnit() {
    return this.props.height / (this.getScale(this.props).getIn(['y', 'max']) - this.getScale(this.props).getIn(['y', 'min']))
  }

  calculateNegativePosition() {
    const largestNegative = this.props.bars.map(p => p.getIn(['values', this.props.valueKey], 0)).min()
    return (largestNegative < 0) ? -30 : 0
  }

  render() {
    const {
      bars: data,
      height,
      flipped,
      activityValueKey,
      productSubtype,
      colour,
      layout,
      tabIndex,
      expandedOutliers,
    } = this.props
    const barSize = layout.get('barWidth')
    const scale = this.getScale(this.props)
    const heightPerUnit = this.calculateHeightPerUnit()
    const negativeValOffset = this.calculateNegativePosition()

    const elements = data.get('values').map((point, period) => {
      const opacity = this.isTimelinePointFiltered(period) ? 0.5 : 1
      let value
      if (productSubtype) {
        value = point.get(productSubtype, 0)
      } else {
        value = point.get(activityValueKey, 0)
      }
      // Minimum 1px bar height
      let barHeight = (value < 0)
        ? Math.min(value * heightPerUnit, -1)
        : Math.max(value * heightPerUnit, 1)
      if (value === 0) { barHeight = 0 }

      let overflow = null
      let overflowBarHeight = 0
      let overflowClick = null

      if (value > scale.getIn(['y', 'max']) || value < 0) {
        barHeight = (value < 0) ? 0 : scale.getIn(['y', 'max']) * heightPerUnit
        let overflowText = null
        const barDirection = (value < 0 ? -1 : 1)
        overflowBarHeight = 17 * barDirection
        const offsetX = this.props.barPositions.get(period)
        if (
          expandedOutliers.has(activityValueKey) &&
          expandedOutliers.getIn([
            activityValueKey,
            value < 0 ? 'negative' : 'positive',
          ]) === period
        ) {
          overflowBarHeight = 30 * barDirection
          let textOffset = ((height + negativeValOffset) - barHeight - overflowBarHeight)
          if (!flipped && value > 0) textOffset += 11
          else if (flipped && value < 0) textOffset -= 11
          overflowText = (
            <g transform={`translate(${offsetX + (barSize / 2) + 1} ${textOffset})`}>
              <g transform={flipped ? 'scale(1 -1)' : ''} className="chartOutlierText">
                <TextBox
                  padding={0}
                  boxStyles={{ fill: '#fff' }}
                >
                  {value.toLocaleString()}&nbsp;
                  {this.props.tr(['amounts', this.props.unit])}
                </TextBox>
              </g>
            </g>
          )
        }
        overflowClick = () => this.props.toggleOutlier(activityValueKey, (value >= 0), period)
        overflow = (
          <g>
            <g transform={`translate(${offsetX - (barSize / 2)} ${(height + negativeValOffset + (value < 0 ? 10 : 0)) - barHeight})`}>
              <g transform={flipped ? 'scale(1 -1) translate(0 10)' : ''}>
                <polygon points="0,0 0,-5 5,-10 5,-5 0,0" fill="white" />
              </g>
            </g>
            {overflowText}
          </g>
        )
      }
      return (
        <g key={`${period}-${activityValueKey}`} onClick={overflowClick}>
          {this.renderLine(point, period, negativeValOffset, barHeight, colour, opacity, overflowBarHeight)}
          {overflow}
        </g>
      )
    }).toArray()

    return (
      <g transform={this.getTransform()}>
        <g>
          {elements}
          {this.orangeBarExplanation()}
          {this.blueBarExplanation()}
          {this.crudeBlueBarExplanation()}
        </g>
        <g transform={`translate(0 ${negativeValOffset})`}>
          <AxisGuide
            flipped={flipped}
            scale={scale.get('y')}
            position={this.state.axisGuide}
            chartHeight={height}
            heightPerUnit={heightPerUnit}
            updatePosition={this.updateAxisGuide}
            width={this.props.width}
            barSize={barSize}
            tabIndex={tabIndex || 0}
            valueKey="activity"
            groupBy="period"
          />
        </g>
      </g>
    )
  }
}

export default connect(
  (state, props) => Object.assign({
    viewport: state.viewport,
    timelineGroup: timelineGrouping(state, props),
    selectedEnergy: state.importExportVisualization,
    unit: visualizationSettings(state, props).get('amount'),
    tr: trSelector(state, props),
    expandedOutliers: state.chartOutliers,
    scale: timeLineScaleValue(state, props),
    scaleByProductSubType: timeLineScaleValueByProductSubtype(state, props),
  }, timelineData(state, props)),
  { toggleOutlier },
)(BarChart)
