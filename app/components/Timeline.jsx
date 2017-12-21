const React = require('react')

const BarChart = require('./BarChart')
const Axis = require('./Axis')

function randBetween(min, max) {
  return Math.floor(Math.random() * max) + min
}

function groupByYear(a, b) {
  return a.year === b.year
}

class Timeline extends React.PureComponent {
  static get defaultProps() {
    return {
      scaleLinked: true,
      x: 0,
      y: 0,
      width: 400,
      height: 215,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.generateData(),
    }
  }

  componentDidMount() {
    // Enable if you want to see animations
    /*
    this.dataInterval = setInterval(() => {
      this.setState({ data: this.generateData() })
    }, 5000)
    */
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval)
  }

  generateData() {
    const data = []
    for (let year = 1990; year < 2000; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        data.push({
          year,
          quarter,
          import: randBetween(0, 15),
          export: randBetween(0, 50),
        })
      }
    }
    return data
  }

  render() {
    const scale = {
      import: {
        min: Number.MAX_SAFE_INTEGER,
        max: -Number.MAX_SAFE_INTEGER,
      },
      export: {
        min: Number.MAX_SAFE_INTEGER,
        max: -Number.MAX_SAFE_INTEGER,
      },
      year: {},
    }

    const formattedData = this.state.data.reduce((acc, point) => {
      if (typeof acc[point.year] === 'undefined') {
        acc[point.year] = {}
      }
      acc[point.year][point.quarter] = point
      scale.import.min = Math.min(scale.import.min, point.import)
      scale.import.max = Math.max(scale.import.max, point.import)
      scale.export.min = Math.min(scale.export.min, point.export)
      scale.export.max = Math.max(scale.export.max, point.export)
      return acc
    }, {})

    scale.year.min = Math.min(...Object.keys(formattedData))
    scale.year.max = Math.max(...Object.keys(formattedData))


    const sharedProps = {
      data: formattedData,
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
          valueKey="import"
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
            valueKey="export"
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

module.exports = Timeline
