import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { timelineFilter } from '../actions/visualizationSettings'
import { timelineYearScaleCalculation, timelineRange } from '../selectors/timeline'
import trSelector from '../selectors/translate'
import { handleInteraction } from '../utilities'

import ExplanationDot from './ExplanationDot'

class TimelinePlay extends React.PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = { playInverval: null }
  }

  componentWillUnmount() {
    this.resetPlay()
  }

  resetPlay() {
    const { timelineScale: yearScale } = this.props
    clearInterval(this.state.playInterval)
    this.setState({ playInterval: null })
    this.props.timelineFilter({
      start: { year: yearScale.min, quarter: 1 },
      end: { year: yearScale.max, quarter: 4 },
    })
  }

  onClick() {
    if (this.state.playInterval) { return this.resetPlay() }

    const { timelineScale: yearScale } = this.props
    this.setState({
      playInterval: setInterval(() => {
        let year = this.props.timelineRange.getIn(['start', 'year'])
        let quarter = this.props.timelineRange.getIn(['start', 'quarter']) + 1
        if (quarter > 4) {
          year += 1
          quarter = 1
        }
        if (year === yearScale.max && quarter === 4) { return this.resetPlay() }
        this.props.timelineFilter({
          start: { year, quarter },
          end: { year, quarter },
        })
      }, 1000),
    })
    this.props.timelineFilter({
      start: { year: yearScale.min, quarter: 1 },
      end: { year: yearScale.min, quarter: 1 },
    })
  }

  playButtonExplanation() {
    return (<g>
      <ExplanationDot
        scale="scale(1.2) scale(-1 1)"
        lineStroke="0.8"
        textBoxWidth={80}
        textBoxHeight={60}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H304.2"
        xPosition={-6}
        yPosition={0}
        lineX={242.16}
        lineY={173}
        textX={0}
        textY={70}
        containerX={this.props.left - 120}
        containerY={this.props.top}
        text="Click play to see how electricity changes over time"
    /></g>)
  }

  render() {
    const label = this.props.tr(['timelinePlay', this.state.playInterval ? 'stop' : 'start'])
    const scale = (this.props.height / 17.37) // 17.37 is the height of the SVG
    const xOffset = 9.17 * scale // 9.17 is the width of the SVG
    return (
      <g
        transform={`translate(${this.props.left} ${this.props.top})`}
        role="link"
        aria-label={label}
        {...handleInteraction(this.onClick)}
      >
        <g transform={`scale(${scale})`}>
          <polyline
            points="0.5 0.87 0.5 17.37 14.8 9.17 0.5 0.87"
            stroke="#a99372"
            fill="white"
          />
        </g>
        {this.playButtonExplanation()}
      </g>
    )
  }
}

export default connect(
  (state, props) => ({
    timelineRange: timelineRange(state, props),
    timelineScale: timelineYearScaleCalculation(state, props),
    tr: trSelector(state, props),
  }),
  { timelineFilter },
)(TimelinePlay)
