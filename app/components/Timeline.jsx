const React = require('react')
const connect = require('react-redux').connect

const BarChart = require('./BarChart')
const Axis = require('./Axis')
const TimelineSeek = require('./TimelineSeek')
const TimelinePlay = require('./TimelinePlay')
const Constants = require('../Constants')

const TimelineSelectors = require('../selectors/timeline')
const { visualizationSettings } = require('../selectors/visualizationSettings')

class Timeline extends React.PureComponent {
  static get defaultProps() {
    return {
      x: 0,
      y: 0,
      width: 400,
      height: 215,
      canSeek: true,
      TopChart: BarChart,
      BottomChart: BarChart,
      topHeight: 100,
      bottomHeight: 100,
      axisHeight: Constants.getIn(['timeline', 'axisHeight']),
    }
  }

  render() {
    const {
      data,
      topHeight,
      bottomHeight,
      axisHeight,
      TopChart,
      BottomChart,
    } = this.props

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

    return (
      <g transform={`translate(${this.props.x} ${this.props.y})`}>
        <TopChart
          scale={{
            x: scale.year,
            y: this.props.scaleLinked ? combinedScale : scale.import,
          }}
          trueScale={{
            x: scale.year,
            y: scale.import,
          }}
          valueKey="imports"
          height={topHeight}
          color="rgb(255,119,76)"
          {...sharedProps}
        />
        <g transform={`translate(0 ${topHeight + axisHeight})`}>
          <BottomChart
            scale={{
              x: scale.year,
              y: this.props.scaleLinked ? combinedScale : scale.export,
            }}
            trueScale={{
              x: scale.year,
              y: scale.export,
            }}
            valueKey="exports"
            height={bottomHeight}
            color="rgb(28,100,178)"
            {...sharedProps}
            flipped
          />
        </g>
        <Axis
          x={0}
          y={topHeight + axisHeight / 2}
          height={axisHeight}
          {...sharedProps}
          labels={data.get('labels')}
          scale={{ x: scale.year }}
        />
        {!this.props.canSeek ? null : (
          <g>
            <TimelineSeek
              {...sharedProps}
              height={this.props.height}
              chartHeight={topHeight}
            />
            <TimelineSeek
              {...sharedProps}
              height={this.props.height}
              chartHeight={topHeight}
              side="end"
            />
            <TimelinePlay
              x={-axisHeight / 2}
              y={topHeight + axisHeight / 2}
            />
          </g>
        )}
      </g>
    )
  }
}

module.exports = connect(state => ({
  data: TimelineSelectors.timelinePositionSelector(state),
  timelineRange: TimelineSelectors.timelineRange(state),
  scaleLinked: visualizationSettings(state).getIn(['timeline', 'scaleLinked']),
}))(Timeline)
