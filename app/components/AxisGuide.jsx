import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextBox from './TextBox'
import SVGDrag from './SVGDrag/'
import Constants from '../Constants'
import { visualizationSettings } from '../selectors/visualizationSettings'
import trSelector from '../selectors/translate'

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

  adjustOffset(rawOffset) {
    const { heightPerUnit } = this.props
    const flippedInverter = this.props.flipped ? -1 : 1
    const currentY = this.props.position * heightPerUnit
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
      positionDisplay: Math.round(newY / heightPerUnit),
    })

    return offset
  }

  dragStop() {
    this.props.updatePosition(this.state.positionDisplay)
  }

  render() {
    const text = `${this.state.positionDisplay.toLocaleString()} ${this.props.tr(['amounts', this.props.unit])}`
    const offset = (this.props.chartHeight + (this.props.barSize / 2))
      - (this.props.position * this.props.heightPerUnit)
    return (
      <SVGDrag
        invertedY={this.props.flipped}
        adjustOffset={this.adjustOffset}
        dragStop={this.dragStop}
        onArrowKey={this.onArrowKey}
        aria-label={text}
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
            boxStyles={{
              fill: Constants.getIn(['styleGuide', 'colours', 'SandExtraDark']),
            }}
            padding={2}
            flipped={this.props.flipped}
          >
            {text}
          </TextBox>
        </g>
      </SVGDrag>
    )
  }
}

export default connect((state, props) => ({
  unit: visualizationSettings(state, props).get('amount'),
  tr: trSelector(state, props),
}))(AxisGuide)
