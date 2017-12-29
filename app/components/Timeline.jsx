const React = require('react')
const connect = require('react-redux').connect

const BarChart = require('./BarChart')
const Axis = require('./Axis')
const TimelineSeek = require('./TimelineSeek')

const TimelineSelectors = require('../selectors/timeline')

class Timeline extends React.PureComponent {
  static get defaultProps() {
    return {
      x: 0,
      y: 0,
      width: 400,
      height: 215,
    }
  }

  render() {
    const { data } = this.props

    // Don't render until we have data
    if (data.get('bars').count() === 0) { return null }

    const scale = data.get('scale').toJS()

    const sharedProps = {
      width: data.getIn(['layout', 'width']),
      barWidth: data.getIn(['layout', 'barWidth']),
      data: data.get('bars'),
      timelineRange: this.props.timelineRange,
    }

    const combinedScale = {
      min: Math.min(scale.import.min, scale.export.min),
      max: Math.max(scale.import.max, scale.export.max),
    }

    const chartHeight = (this.props.height - 30) / 2

    return (
      <g transform={`translate(${this.props.x} ${this.props.y})`}>
        <BarChart
          scale={{
            x: scale.year,
            y: this.props.scaleLinked ? combinedScale : scale.import,
          }}
          trueScale={{
            x: scale.year,
            y: scale.import,
          }}
          valueKey="imports"
          height={chartHeight}
          color="rgb(255,119,76)"
          {...sharedProps}
        />
        <g transform={`translate(0 ${chartHeight + 30})`}>
          <BarChart
            scale={{
              x: scale.year,
              y: this.props.scaleLinked ? combinedScale : scale.export,
            }}
            trueScale={{
              x: scale.year,
              y: scale.export,
            }}
            valueKey="exports"
            height={chartHeight}
            color="rgb(28,100,178)"
            {...sharedProps}
            flipped
          />
        </g>
        <Axis
          x={0}
          y={chartHeight + 15}
          {...sharedProps}
          labels={data.get('labels')}
          scale={{ x: scale.year }}
        />
        <TimelineSeek
          {...sharedProps}
          height={this.props.height}
          chartHeight={chartHeight}
        />
        <TimelineSeek
          {...sharedProps}
          height={this.props.height}
          chartHeight={chartHeight}
          side="end"
        />
      </g>
    )
  }
}

module.exports = connect(state => ({
  data: TimelineSelectors.timelinePositionSelector(state),
  timelineRange: TimelineSelectors.timelineRange(state),
  scaleLinked: state.ui.get('barGraphScaleLinked'),
}))(Timeline)
