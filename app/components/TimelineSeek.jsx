const React = require('react')
const connect = require('react-redux').connect

const SVGDrag = require('./SVGDrag/')
const timelineFilter = require('../actions/ui').timelineFilter
const timelineSelectors = require('../selectors/timeline')

class TimelineSeek extends React.PureComponent {
  static get defaultProps() {
    return {
      side: 'start',
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      offset: this.getOffsetFromPosition(props.seekPosition[props.side]),
    }
    this.adjustOffset = this.adjustOffset.bind(this)
    this.dragStop = this.dragStop.bind(this)
  }

  getOffsetFromPosition(position) {
    return (this.props.side === 'start')
      ? position
      : this.props.width - position
  }

  componentWillReceiveProps(props) {
    const { seekPosition, side } = props
    if (seekPosition[side] !== this.props.seekPosition[side]) {
      const offset = this.getOffsetFromPosition(seekPosition[side])
      this.setState({ offset })
    }
  }

  adjustOffset(rawOffset) {
    const offset = { x: rawOffset.x, y: 0 }
    const flippedInverter = (this.props.side === 'start') ? 1 : -1
    const newX = this.state.offset + (rawOffset.x * flippedInverter)
    if (newX < 0) {
      offset.x = -this.state.offset * flippedInverter
    } else if (newX > this.props.width) {
      offset.x = this.props.width * flippedInverter
    }
    return offset
  }

  dragStop(rawOffset) {
    const { data, side } = this.props
    const offset = (side === 'start')
      ? this.state.offset + rawOffset.x
      : this.state.offset - rawOffset.x
    const filterPoint = (side === 'start')
      ? data.find(p => p.get('offsetX') > offset - 1)
      : data.findLast(p => p.get('offsetX') < (this.props.width - offset + 1))
    this.props.timelineFilter(side, {
      year: filterPoint.get('year'),
      quarter: filterPoint.get('quarter'),
    })
  }

  render() {
    const sideTransform = (this.props.side === 'start')
      ? ''
      : `scale(-1,1) translate(${-this.props.width} 0)`
    return (
      <g transform={sideTransform}>
        <SVGDrag
          adjustOffset={this.adjustOffset}
          dragStop={this.dragStop}
          invertedX={this.props.side !== 'start'}
        >
          <g
            transform={`translate(${this.state.offset - 12} ${this.props.chartHeight + 2})`}
          >
            <polygon
              points="7,0 10,0 10,26 0,26"
              stroke="black"
              fill="white"
            />
          </g>
        </SVGDrag>
      </g>
    )
  }
}

module.exports = connect(
  state => ({
    seekPosition: timelineSelectors.timelineSeekPositionSelector(state),
  }),
  { timelineFilter }
)(TimelineSeek)
