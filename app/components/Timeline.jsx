const React = require('react')

const BarChart = require('./BarChart')

function randBetween(min, max) {
  return Math.floor(Math.random() * max) + min
}

class Timeline extends React.PureComponent {
  static get defaultProps() {
    return {
      scaleLinked: true,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.generateData(),
    }
  }

  componentDidMount() {
    this.dataInterval = setInterval(() => {
      this.setState({ data: this.generateData() })
    }, 5000)
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
    const minMax = {
      minImport: Number.MAX_SAFE_INTEGER,
      maxImport: -Number.MAX_SAFE_INTEGER,
      minExport: Number.MAX_SAFE_INTEGER,
      maxExport: -Number.MAX_SAFE_INTEGER,
    }

    const formattedData = this.state.data.reduce((acc, point) => {
      if (typeof acc[point.year] === 'undefined') {
        acc[point.year] = {}
      }
      acc[point.year][point.quarter] = point
      minMax.minImport = Math.min(minMax.minImport, point.import)
      minMax.maxImport = Math.max(minMax.maxImport, point.import)
      minMax.minExport = Math.min(minMax.minExport, point.export)
      minMax.maxExport = Math.max(minMax.maxExport, point.export)
      return acc
    }, {})

    minMax.minYear = Math.min(...Object.keys(formattedData))
    minMax.maxYear = Math.max(...Object.keys(formattedData))

    let xOffset = 0

    const elements = []

    let year
    for (year = minMax.minYear; year <= minMax.maxYear; year++) {
      elements.push(
        <text
          key={`label-${year}`}
          x={xOffset + 10}
          y="225"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {year}
        </text>
      )

      // Gap between years
      xOffset += 25 + 20
    }

    return (
      <g>
        <BarChart
          data={formattedData}
          scale={{
            x: [minMax.minYear, minMax.maxYear],
            y: this.props.scaleLinked
              ? [Math.min(minMax.minImport, minMax.minExport), Math.max(minMax.maxImport, minMax.maxExport)]
              : [minMax.minImport, minMax.maxImport],
          }}
          valueKey="import"
          height={200}
        />
        <g transform="translate(0, 250)">
          <BarChart
            data={formattedData}
            scale={{
              x: [minMax.minYear, minMax.maxYear],
              y: this.props.scaleLinked
                ? [Math.min(minMax.minImport, minMax.minExport), Math.max(minMax.maxImport, minMax.maxExport)]
                : [minMax.minExport, minMax.maxExport],
            }}
            valueKey="export"
            height={200}
            flipped
          />
        </g>
        <g>{elements}</g>
      </g>
    )
  }
}

module.exports = Timeline
