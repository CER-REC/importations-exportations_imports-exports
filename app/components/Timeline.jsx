const React = require('react')
const connect = require('react-redux').connect
const memoize = require('memoize-immutable')

const BarChart = require('./BarChart')
const Axis = require('./Axis')

const DataSelectors = require('../selectors/data')

function groupByYear(a, b) {
  return a.get('year') === b.get('year')
}

class Timeline extends React.PureComponent {
  static get defaultProps() {
    return {
      x: 0,
      y: 0,
      width: 400,
      height: 215,
    }
  }

  constructor(props) {
    super(props)
    this.calculateScale = memoize(this.calculateScale)
  }

  calculateScale(data) {
    const scale = {
      import: {
        min: 0,
        max: -Number.MAX_SAFE_INTEGER,
      },
      export: {
        min: 0,
        max: -Number.MAX_SAFE_INTEGER,
      },
      year: {},
    }

    const years = data.map(point => {
      scale.import.min = Math.min(scale.import.min, point.get('imports'))
      scale.import.max = Math.max(scale.import.max, point.get('imports'))
      scale.export.min = Math.min(scale.export.min, point.get('exports'))
      scale.export.max = Math.max(scale.export.max, point.get('exports'))
      return point.get('year')
    }).toSet().toArray() // toSet to keep unique values

    scale.year.min = Math.min(...years)
    scale.year.max = Math.max(...years)

    return scale
  }

  render() {
    // Don't render until we have data
    if (this.props.data.count() === 0) { return null }

    const scale = this.calculateScale(this.props.data)

    const sharedProps = {
      data: this.props.data,
      groupPadding: 5,
      groupComparator: groupByYear,
      barPadding: 0.5,
      width: this.props.width,
    }

    const combinedScale = {
      min: Math.min(scale.import.min, scale.export.min),
      max: Math.max(scale.import.max, scale.export.max),
    }

    const chartHeight = (this.props.height - 15) / 2

    const totalYears = (scale.year.max - scale.year.min)
    const widthAfterPads = this.props.width
      - ((totalYears) * sharedProps.groupPadding)
      - ((totalYears * 4) * sharedProps.barPadding)
    sharedProps.barSize = widthAfterPads / ((totalYears + 1) * 4)

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
        <g transform="translate(0 130)">
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
          scale={{ x: scale.year }}
        />
      </g>
    )
  }
}

module.exports = connect(state => ({
  data: DataSelectors.sortTimelineSelector(state),
  scaleLinked: state.ui.get('barGraphScaleLinked'),
}))(Timeline)
