import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextBox from './TextBox'
import * as ScaleIcon from './ScaleIcon'
import SVGDrag from './SVGDrag/'
import Constants from '../Constants'
import { visualizationSettings, scaledLinkedSelector } from '../selectors/visualizationSettings'
import { analyticsReporter } from '../utilities'

import trSelector from '../selectors/translate'

import { arrangeBy } from '../selectors/data'

import ExplanationDot from './ExplanationDot'
import tr from '../TranslationTable'

class AxisGuide extends React.PureComponent {
  static get propTypes() {
    return {
      flipped: PropTypes.bool,
      width: PropTypes.number.isRequired,
      chartHeight: PropTypes.number.isRequired,
      barSize: PropTypes.number.isRequired,
      heightPerUnit: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      updatePosition: PropTypes.func.isRequired,
      position: PropTypes.number.isRequired,
      tr: PropTypes.func.isRequired,
      scaleLinked: PropTypes.bool.isRequired,
    }
  }

  static get defaultProps() {
    return {
      flipped: false,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      positionDisplay: props.position,
    }
    this.adjustOffset = this.adjustOffset.bind(this)
    this.dragStop = this.dragStop.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.position !== this.state.positionDisplay) {
      this.setState({ positionDisplay: props.position })
    }
  }

  onArrowKey = (e) => {
    if (this.props.scale.get('max') === this.props.scale.get('min')) { return }
    const direction = (e.key === 'ArrowUp' || e.key === 'PageUp') ? -1 : 1
    const scale = (e.key === 'ArrowUp' || e.key === 'ArrowDown') ? 1 : 10

    const { heightPerUnit } = this.props
    const flippedInverter = this.props.flipped ? -1 : 1
    const currentY = this.props.position * heightPerUnit
    let newY = (currentY - (direction * scale * flippedInverter))

    if (newY > this.props.chartHeight) {
      newY = this.props.chartHeight
    } else if (newY < 0) {
      newY = 0
    }
    this.props.updatePosition(Math.round(newY / heightPerUnit))
  }

  dragStop() {
    /** Analytics reporting: start */
    // Creating event detail
    const eventDetail = this.state.positionDisplay
    // report even to analytics
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'axisGuide']),
      Constants.getIn(['analytics', 'action', 'dragged']),
      eventDetail,
    )
    /** Analytics reporting: Finish */

    this.props.updatePosition(this.state.positionDisplay)
  }

  timeLineRangeExplanation() {
    let containerY = this.props.chartHeight + (this.props.barSize / 2)
      - (this.props.position * this.props.heightPerUnit) - 2 + 210
    if (this.props.selectedEnergy === 'crudeOil') {
      containerY = this.props.chartHeight - (this.props.barSize / 2)
      + (this.props.position * this.props.heightPerUnit) - 2 + 305
    }
    if (this.props.selectedEnergy === 'naturalGas') {
      containerY = this.props.chartHeight + (this.props.barSize / 2)
      - (this.props.position * this.props.heightPerUnit) - 2 + 72
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      containerY = this.props.chartHeight + (this.props.barSize / 2)
      - (this.props.position * this.props.heightPerUnit) - 2 + 240
    }
    if (this.props.selectedEnergy === 'refinedPetroleumProducts') {
      containerY = this.props.chartHeight + (this.props.barSize / 2)
      + (this.props.position * this.props.heightPerUnit) - 413
    }
    if (this.props.selectedEnergy === 'refinedPetroleumProducts'
      && this.props.arrangeBy === 'split') { return null }
    if (this.props.flipped
      && (this.props.selectedEnergy !== 'crudeOil'
      && this.props.selectedEnergy !== 'refinedPetroleumProducts')) { return null }
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={150}
        textBoxHeight={100}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H332.2"
        xPosition={400}
        yPosition={0}
        lineX={142.16}
        lineY={173}
        textX={40}
        textY={58}
        containerX={220}
        containerY={containerY}
        name={`${this.props.selectedEnergy} timeLineRangeDot`}
        text={`${this.props.tr(['explanations', 'timelineRange'])}`}
      />
            </g>)
  }

  getBackgroundColour = () => (this.props.scaleLinked
    ? Constants.getIn(['styleGuide', 'colours', 'SandExtraDark'])
    : Constants.getIn(['styleGuide', 'colours', (this.props.flipped ? 'ExportDefault' : 'ImportDefault')]))

  getScaleImage = ({
    x, y, width, height,
  }) => {
    const groupTransform = `translate(${x + width + 1} ${y - 2})`
    const imageProps = {
      fill: 'white',
      height,
      transform: 'translate(2 2)',
    }
    return (
      <g
        fill={this.getBackgroundColour()}
        transform={groupTransform}
      >
        <rect x={0} y={0} width={height + 4} height={height + 4} />
        {this.props.scaleLinked
          ? <ScaleIcon.Linked {...imageProps} />
          : <ScaleIcon.Broken {...imageProps} />}
      </g>
    )
  }

  adjustOffset(rawOffset) {
    if (this.props.scale.get('max') === this.props.scale.get('min')) {
      return { x: 0, y: this.props.scale.get('min') }
    }
    const { heightPerUnit } = this.props
    const flippedInverter = this.props.flipped ? -1 : 1
    const currentY = (this.props.position - this.props.scale.get('min')) * heightPerUnit
    let newY = (currentY - (rawOffset.y * flippedInverter))

    const offset = { x: 0, y: rawOffset.y }

    if (newY > this.props.chartHeight) {
      newY = this.props.chartHeight
      offset.y = (this.props.chartHeight - currentY) * -1 * flippedInverter
    } else if (newY < 0) {
      newY = 0
      offset.y = currentY * flippedInverter
    }

    this.setState({
      positionDisplay: Math.round(newY / heightPerUnit) + this.props.scale.get('min'),
    })

    return offset
  }

  render() {
    const text = `${this.state.positionDisplay.toLocaleString()} ${this.props.tr(['amounts', this.props.unit])}`
    const offset = (this.props.position === this.props.scale.get('min'))
      ? this.props.chartHeight
      : (this.props.chartHeight + (this.props.barSize / 2))
        - ((this.props.position - this.props.scale.get('min')) * this.props.heightPerUnit) - 2
    return (
      <SVGDrag
        invertedY={this.props.flipped}
        adjustOffset={this.adjustOffset}
        dragStop={this.dragStop}
        onArrowKey={this.onArrowKey}
        aria-label={text}
        tabIndex={this.props.tabIndex || 0}
      >
        <g transform={`translate(0 ${offset})`}>
          <polyline
            strokeWidth={1}
            stroke={Constants.getIn(['styleGuide', 'colours', 'SandExtraDark'])}
            points="-12,0 -7,-10 -2,0 -7,10 -12,0"
            fill="transparent"
          />
          <line
            x1={-2}
            x2={this.props.width + 2}
            y1={0}
            y2={0}
            strokeWidth={1}
            stroke={Constants.getIn(['styleGuide', 'colours', 'SandExtraDark'])}
            strokeDasharray="4, 2"
          />

          <TextBox
            textStyles={{
              x: (this.props.width / 2),
              y: -3,
              textAnchor: 'middle',
              alignmentBaseline: 'bottom',
              fill: 'white',
              fontSize: 11,
            }}
            aria-hidden
            boxStyles={{ fill: this.getBackgroundColour() }}
            padding={2}
            flipped={this.props.flipped}
            unsizedContent={this.getScaleImage}
          >
            {text}
          </TextBox>
          {this.timeLineRangeExplanation()}
        </g>
      </SVGDrag>
    )
  }
}

export default connect((state, props) => ({
  selectedEnergy: state.importExportVisualization,
  arrangeBy: arrangeBy(state, props),
  unit: visualizationSettings(state, props).get('amount'),
  tr: trSelector(state, props),
  scaleLinked: scaledLinkedSelector(state, props),
}))(AxisGuide)
