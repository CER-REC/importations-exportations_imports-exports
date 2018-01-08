const React = require('react')
const connect = require('react-redux').connect

const timelineFilter = require('../actions/ui').timelineFilter
const timelineSelectors = require('../selectors/timeline')

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
    const { year: yearScale } = this.props.timelineScale
    clearInterval(this.playInterval)
    this.playInterval = null
    this.props.timelineFilter('start', { year: yearScale.min, quarter: 1 })
    this.props.timelineFilter('end', { year: yearScale.max, quarter: 4 })
  }

  onClick(e) {
    e.stopPropagation()
    e.preventDefault()

    if (this.playInterval) { return this.resetPlay() }

    const { year: yearScale } = this.props.timelineScale
    this.playInterval = setInterval(() => {
      let year = this.props.timelineRange.getIn(['start', 'year'])
      let quarter = this.props.timelineRange.getIn(['start', 'quarter']) + 1
      if (quarter > 4) {
        year += 1
        quarter = 1
      }
      if (year === yearScale.max && quarter === 4) { return this.resetPlay() }
      this.props.timelineFilter('start', { year, quarter })
      this.props.timelineFilter('end', { year, quarter })
    }, 1000)
    this.props.timelineFilter('start', { year: yearScale.min, quarter: 1 })
    this.props.timelineFilter('end', { year: yearScale.min, quarter: 1 })
  }

  render() {
    return (
      <g transform={`translate(${this.props.x} ${this.props.y})`}>
        <polyline
          points="0,-10 10,0 0,10 0,-10"
          stroke="black"
          fill="white"
          onClick={this.onClick}
        />
      </g>
    )
  }
}

module.exports = connect(
  state => ({
    timelineRange: timelineSelectors.timelineRange(state),
    timelineScale: timelineSelectors.timelineScaleSelector(state),
  }),
  { timelineFilter }
)(TimelinePlay)
