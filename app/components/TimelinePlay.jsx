import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setTimelinePlayback, resetTimelinePlayback } from '../actions/timelinePlayback'
import { timelineYearScaleCalculation } from '../selectors/timeline'
import { timelineRange, timelinePlayback, groupingBy as timelineGrouping } from '../selectors/data'
import trSelector from '../selectors/translate'
import tr from '../TranslationTable'
import { handleInteraction } from '../utilities'

import ExplanationDot from './ExplanationDot'

class TimelinePlay extends React.PureComponent {
  static propTypes = {
    height: PropTypes.number.isRequired,
    tr: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = { playInterval: null }
  }

  componentWillUnmount() {
    this.resetPlay()
  }

  resetPlay() {
    const { timelineScale: yearScale } = this.props
    if (this.state.playInterval) {
      clearInterval(this.state.playInterval)
      this.setState({ playInterval: null })
      this.props.resetTimelinePlayback()
    }
  }

  onClick() {
    if (this.state.playInterval) { return this.resetPlay() }

    const { timelineScale: yearScale } = this.props
    this.setState({
      playInterval: setInterval(() => {
        const { year: playbackYear, quarter: playbackQuarter } = this.props.timelinePlayback.toJS()
        const { year: endYear, quarter: endQuarter } = this.props.timelineRange.get('end').toJS()
        if (playbackYear >= endYear && playbackQuarter >= endQuarter) {
          this.resetPlay()
          return
        }
        let year = playbackYear
        let quarter = playbackQuarter
        if (this.props.timelineGrouping === 'quarter') {
          year += 1
          if (year > endYear) {
            year = this.props.timelineRange.getIn(['start', 'year'])
            quarter += 1
          }
        } else {
          quarter += 1
          if (quarter > 4) {
            year += 1
            quarter = 1
          }
        }
        if (year === yearScale.max && quarter === 4) { return this.resetPlay() }
        this.props.setTimelinePlayback(year, quarter)
      }, 2000),
    })
    this.props.setTimelinePlayback(
      this.props.timelineRange.getIn(['start', 'year']),
      this.props.timelineRange.getIn(['start', 'quarter']),
    )
  }

  playButtonExplanation() {
    if (this.props.selectedEnergy === 'refinedPetroleumProducts') { return }
    return (<g>
      <ExplanationDot
        scale="scale(0.7) scale(-1 1)"
        lineStroke="1.3"
        textBoxWidth={110}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H344.2"
        xPosition={-6}
        yPosition={0}
        lineX={344.16}
        lineY={173}
        textX={0}
        textY={38}
        containerX={this.props.left - 143}
        containerY={this.props.top + 1}
        name="timePlayDot"
        text={`${this.props.tr(['explanations','playButton'])}`}
    /></g>)
  }

  renderIcon() {
    if (this.state.playInterval) {
      // top: 1.185
      // bottom: 16.185
      return (
        <polyline
          points="1.185 2.185 1.185 15.185 14.185 15.185 14.185 2.185 1.185 2.185"
          stroke="#a99372"
          fill="white"
        />
      )
    }
    return (
      <polyline
        points="0.5 0.87 0.5 17.37 14.8 9.17 0.5 0.87"
        stroke="#a99372"
        fill="white"
      />
    )
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
        <g transform={`scale(${scale})`} className="playButton">
          {this.renderIcon()}
        </g>
        {this.playButtonExplanation()}
      </g>
    )
  }
}

export default connect(
  (state, props) => ({
    timelineRange: timelineRange(state, props),
    timelinePlayback: timelinePlayback(state, props),
    timelineGrouping: timelineGrouping(state, props),
    selectedEnergy: state.importExportVisualization,
    timelineScale: timelineYearScaleCalculation(state, props),
    tr: trSelector(state, props),
  }),
  { setTimelinePlayback, resetTimelinePlayback },
)(TimelinePlay)
