import React from 'react'
import { connect } from 'react-redux'

import { timelineFilter } from '../actions/visualizationSettings'
import { timelineYearScaleCalculation, timelineRange } from '../selectors/timeline'
import { handleInteraction } from '../utilities'

import ExplanationDot from './ExplanationDot'

class TimelinePlay extends React.PureComponent {
  static get defaultProps() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = { playInverval: null }
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
        linePath="M457,45 C328,266 384,258 22,251"
        xPosition={-6}
        yPosition={0}
        lineX={0}
        lineY={4}
        textX={14}
        textY={80}
        containerX={this.props.left - 140}
        containerY={this.props.top - 10}
        text="Click play to see how electricity changes over time"
    /></g>)
  }

  render() {
    return (
      <g
        transform={`translate(${this.props.left} ${this.props.top})`}
        role="link"
        aria-label={this.state.playInterval ? 'Stop timeline playback' : 'Start timeline playback'}
        {...handleInteraction(this.onClick)}
      >
        <polyline
          points="0,-10 10,0 0,10 0,-10"
          stroke="#a99372"
          fill="white"
        />
        {this.playButtonExplanation()}
      </g>
    )
  }
}

export default connect(
  (state, props) => ({
    timelineRange: timelineRange(state, props),
    timelineScale: timelineYearScaleCalculation(state, props),
  }),
  { timelineFilter },
)(TimelinePlay)
