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
import { timelineData } from '../selectors/timeline'
import { groupingBy as timelineGrouping } from '../selectors/data'

import trSelector from '../selectors/translate'
import tr from '../TranslationTable'

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
    let textString = `${this.props.tr(['explanations','barChartImport'])}`
    let xPosition = 90
    if (this.props.selectedEnergy === 'naturalGas') {
      textString = `${this.props.tr(['explanations','orangeBarNaturalGas'])}`
      xPosition = 590
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations','orangeBarNaturalGasLiquids'])}`
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
        yPosition={87}
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
        yPosition={70}
        lineX={244.16}
        lineY={173}
        textX={76}
        textY={146}
        containerX={this.props.left - 278}
        containerY={this.props.left + 68}
        name={`${this.props.selectedEnergy} exportBarChartExplanation`}
        text={`${this.props.tr(['explanations','barChartExport'])}`}
    /></g>)
  }

  crudeBlueBarExplanation() {
    let yPosition = 0
    let textString = `${this.props.tr(['explanations','blueBarCrude'])}`
    let containerY = this.props.top + 100
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.tr(['explanations','blueBarNaturalGasLiquids'])}`
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
        yPosition={yPosition}
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
    } = this.props

    const barSize = layout.get('barWidth')

    const heightPerUnit = height / (scale.getIn(['y', 'max']) - scale.getIn(['y', 'min']))
    const negativeValOffset = scale.getIn(['y', 'min']) * heightPerUnit
    const elements = data.map((point) => {
      const opacity = this.isTimelinePointFiltered(point) ? 0.5 : 1
      // Minimum 1px bar height
      let barHeight = (point.getIn(['values', valueKey], 0) * heightPerUnit)
      if (point.getIn(['values', valueKey], 0) > 0) { barHeight = Math.max(barHeight, 1); }
      return (
        <AnimatedLine
          x1={point.get('offsetX')}
          x2={point.get('offsetX')}
          y2={height + negativeValOffset}
          y1={(height + negativeValOffset) - barHeight}
          key={`${point.get('year')}-${point.get('quarter')}-${valueKey}`}
          strokeWidth={barSize}
          stroke={colour}
          opacity={opacity}
          animate={{ y1: '1s' }}
        />
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

export default connect((state, props) => Object.assign({
  timelineGroup: timelineGrouping(state, props),
  selectedEnergy: state.importExportVisualization,
  tr: trSelector(state, props),
}, timelineData(state, props)))(BarChart)
