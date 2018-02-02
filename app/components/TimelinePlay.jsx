import React from 'react'
import { connect } from 'react-redux'

import { timelineFilter } from '../actions/visualizationSettings'
import timelineSelectors from '../selectors/timeline'

const ExplanationDot = require('./ExplanationDot.jsx')

class TimelinePlay extends React.PureComponent {
  static get defaultProps() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.playInverval = null
  }

  resetPlay() {
    const { timelineScale: yearScale } = this.props
    clearInterval(this.playInterval)
    this.playInterval = null
    this.props.timelineFilter({
      start: { year: yearScale.min, quarter: 1 },
      end: { year: yearScale.max, quarter: 4 },
    })
  }



  onClick(e) {
    e.stopPropagation()
    e.preventDefault()

    if (this.playInterval) { return this.resetPlay() }

    const { timelineScale: yearScale } = this.props
    this.playInterval = setInterval(() => {
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
    }, 1000)
    this.props.timelineFilter({
      start: { year: yearScale.min, quarter: 1 },
      end: { year: yearScale.min, quarter: 1 },
    })
  }

  render() {
    return (
      <g transform={`translate(${this.props.left} ${this.props.top})`}>
        <polyline
          points="0,-10 10,0 0,10 0,-10"
          stroke="#a99372"
          fill="white"
          onClick={this.onClick}
        />
        
      </g>
    )
  }
}

module.exports = connect(
  (state, props) => ({
    timelineRange: timelineSelectors.timelineRange(state, props),
    timelineScale: timelineSelectors.timelineYearScaleCalculation(state, props),
  }),
  { timelineFilter },
)(TimelinePlay)
