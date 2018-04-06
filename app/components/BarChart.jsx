import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chart from './Chart'
import AnimatedLine from './SVGAnimation/AnimatedLine'
import AxisGuide from './AxisGuide'
import DetailSidebar from './DetailSidebar'
import DetailTotal from './DetailTotal'
import ConfidentialCount from './ConfidentialCount'
import MissingDataCount from './MissingDataCount'
import TextBox from './TextBox'
import { timelineData } from '../selectors/timeline'
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

  constructor(props) {
    super(props)
    this.state = {
      axisGuide: props.trueScale.get('max'),
    }
  }

  componentWillReceiveProps(props) {
    // Reset the axis guide when the scale changes.
    // Watch scale since that changes the bar height, but use trueScale in order
    // to put the guide on top of the tallest bar
    if (props.scale.getIn(['y', 'max']) !== this.props.scale.getIn(['y', 'max'])) {
      this.updateAxisGuide(props.trueScale.get('max'))
    }
  }

  updateAxisGuide = (position) => {
    this.setState({ axisGuide: position })
  }

  orangeBarExplanation() {
    const [negativeValOffset] = this.calculateNegativePosition()
    let textString = `${this.props.tr(['explanations', 'barChartImport'])}`
    let xPosition = 90
    if (this.props.selectedEnergy === 'naturalGas') {
      textString = `${this.props.tr(['explanations', 'orangeBarNaturalGas'])}`
      xPosition = 590
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations', 'orangeBarNaturalGasLiquids'])}`
      xPosition = 590
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
    /></g>)
  }

  blueBarExplanation() {
    if (!this.props.flipped || this.props.selectedEnergy !== 'electricity') { return null }
    const [negativeValOffset] = this.calculateNegativePosition()
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
        containerY={this.props.left + 68}
        name={`${this.props.selectedEnergy} exportBarChartExplanation`}
        text={`${this.props.tr(['explanations', 'barChartExport'])}`}
    /></g>)
  }

  crudeBlueBarExplanation() {
    const [negativeValOffset] = this.calculateNegativePosition()
    let yPosition = 0
    let textString = `${this.props.tr(['explanations', 'blueBarCrude'])}`
    let containerY = this.props.top + 100
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations', 'blueBarNaturalGasLiquids'])}`
      yPosition = 35
      containerY = this.props.top + 32
    }
    if (!this.props.flipped || (this.props.selectedEnergy !== 'crudeOil' && this.props.selectedEnergy !== 'naturalGasLiquids')) { return null }
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
        xPosition={632}
        yPosition={yPosition + negativeValOffset}
        lineX={142.16}
        lineY={173}
        textX={46}
        textY={58}
        containerX={this.props.left + 3 }
        containerY={containerY}
        name={`${this.props.selectedEnergy} exportBarChartExplanation`}
        text={textString}
    /></g>)
  }

  renderLine(point, negativeValOffset, barHeight, colour, opacity, overflowBarHeight = 0) {
    return (
      <AnimatedLine
        x1={point.get('offsetX')}
        x2={point.get('offsetX')}
        y2={this.props.height + negativeValOffset}
        y1={(this.props.height + negativeValOffset) - barHeight - overflowBarHeight}
        key={`${point.get('year')}-${point.get('quarter')}-${this.props.valueKey}`}
        strokeWidth={this.props.layout.get('barWidth')}
        stroke={colour}
        opacity={opacity}
        animate={{ y1: '1s' }}
      />
    )
  }

  calculateHeightPerUnit() {
    return this.props.height / (this.props.scale.getIn(['y', 'max']) - this.props.scale.getIn(['y', 'min']))
  }

  calculateNegativePosition() {
    const heightPerUnit = this.calculateHeightPerUnit()
    const largestNegative = this.props.bars.map(p => p.getIn(['values', this.props.valueKey], 0)).min()
    const negativeValOffset = (largestNegative < 0)
      ? Math.max((largestNegative * heightPerUnit), -30)
      : 0
    const negativeMaxHeight = (negativeValOffset === -30)
      ? 0
      : (largestNegative * heightPerUnit)
    return [negativeValOffset, negativeMaxHeight]
  }

  render() {
    const {
      bars: data,
      scale,
      height,
      flipped,
      valueKey,
      colour,
      layout,
      tabIndex,
      expandedOutliers,
    } = this.props

    const barSize = layout.get('barWidth')

    const heightPerUnit = this.calculateHeightPerUnit()
    const [negativeValOffset, negativeMaxHeight] = this.calculateNegativePosition()

    const elements = data.map((point) => {
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      const value = point.getIn(['values', valueKey], 0)

      // Minimum 1px bar height
      let barHeight = (value < 0)
        ? Math.min(value * heightPerUnit, -1)
        : Math.max(value * heightPerUnit, 1)
      if (value === 0) { barHeight = 0 }

      let overflow = null
      let overflowBarHeight = 0
      let overflowClick = null
      if (
        value > scale.getIn(['y', 'max']) ||
        // Exceeds the minimum scale, but doesn't exceed the allotted height
        (value < scale.getIn(['y', 'min']) && negativeMaxHeight === 0 && negativeValOffset === -30)
      ) {
        barHeight = (value < 0)
          ? Math.max(negativeMaxHeight, value * heightPerUnit)
          : scale.getIn(['y', 'max']) * heightPerUnit
        let overflowText = null
        const barDirection = (value < 0 ? -1 : 1)
        overflowBarHeight = 17 * barDirection
        if (
          expandedOutliers.has(valueKey) &&
          expandedOutliers.getIn([valueKey, value < 0 ? 'negative' : 'positive']) === point.get('period')
        ) {
          overflowBarHeight = 30 * barDirection
          let textOffset = ((height + negativeValOffset) - barHeight - overflowBarHeight)
          if (!flipped && value > 0) textOffset += 11
          else if (flipped && value < 0) textOffset -= 11
          overflowText = (
            <g transform={`translate(${point.get('offsetX') + (barSize / 2) + 1} ${textOffset})`}>
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
        overflowClick = () => this.props.toggleOutlier(valueKey, (value >= 0), point.get('period'))
        overflow = (
          <g>
            <g transform={`translate(${point.get('offsetX') - (barSize / 2)} ${(height + negativeValOffset + (value < 0 ? 10 : 0)) - barHeight})`}>
              <g transform={flipped ? 'scale(1 -1) translate(0 10)' : ''}>
                <polygon points="0,0 0,-5 5,-10 5,-5 0,0" fill="white" />
              </g>
            </g>
            {overflowText}
          </g>
        )
      }
      return (
        <g key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`} onClick={overflowClick}>
          {this.renderLine(point, negativeValOffset, barHeight, colour, opacity, overflowBarHeight)}
          {overflow}
        </g>
      )
    }).toArray()

    const sidebarContent = [
      <MissingDataCount
        key="missing"
        valueKey={this.props.valueKey}
        aggregateKey={this.props.aggregateKey}
      />,
      <ConfidentialCount
        key="confidential"
        valueKey={this.props.valueKey}
        aggregateKey={this.props.aggregateKey}
      />,
      <DetailTotal
        key="total"
        type={flipped ? 'exports' : 'imports'}
        valueKey={this.props.valueKey}
        aggregateKey={this.props.aggregateKey}
      />,
    ]

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
            scale={scale.get('y').toJS()}
            position={this.state.axisGuide}
            chartHeight={height}
            heightPerUnit={heightPerUnit}
            updatePosition={this.updateAxisGuide}
            width={this.props.width}
            barSize={barSize}
            tabIndex={tabIndex||0}
          />
        </g>
        {!this.props.detailSidebar ? null : (
          <DetailSidebar top={this.props.top} height={height}>
            <div className="verticalAlign">
              <div className="centered">
                {flipped ? sidebarContent.reverse() : sidebarContent}
              </div>
            </div>
          </DetailSidebar>
        )}
      </g>
    )
  }
}

export default connect(
  (state, props) => Object.assign({
    timelineGroup: timelineGrouping(state, props),
    selectedEnergy: state.importExportVisualization,
    unit: visualizationSettings(state, props).get('amount'),
    tr: trSelector(state, props),
    expandedOutliers: state.chartOutliers,
  }, timelineData(state, props)),
  { toggleOutlier },
)(BarChart)
