const React = require('react')

const BarChart = require('./BarChart')

function randBetween(min, max) {
  return Math.floor(Math.random() * max) + min
}

class Timeline extends React.PureComponent {
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
          export: randBetween(0, 15),
        })
      }
    }
    return data
  }

  render() {
    const minMax = {
      minVal: Number.MAX_SAFE_INTEGER,
      maxVal: -Number.MAX_SAFE_INTEGER,
    }

    const formattedData = this.state.data.reduce((acc, point) => {
      if (typeof acc[point.year] === 'undefined') {
        acc[point.year] = {}
      }
      acc[point.year][point.quarter] = point
      minMax.minVal = Math.min(minMax.minVal, point.import)
      minMax.maxVal = Math.max(minMax.maxVal, point.import)
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
        <BarChart data={formattedData} minMax={minMax} height={200} />
        <g transform="translate(0, 250)">
          <BarChart data={formattedData} minMax={minMax} height={200} flipped />
        </g>
        <g>{elements}</g>
      </g>
    )
  }
}

module.exports = Timeline
