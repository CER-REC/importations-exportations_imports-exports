const React = require('react')
const connect = require('react-redux').connect

const TextBox = require('./TextBox')
const SVGDrag = require('./SVGDrag/')

class AxisGuide extends React.PureComponent {
  static get defaultProps() {
    return {
      flipped: false,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      positionDisplay: props.position,
    }
    this.adjustOffset = this.adjustOffset.bind(this)
    this.dragStop = this.dragStop.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.position !== this.state.positionDisplay) {
      this.setState({ positionDisplay: props.position })
    }
  }

  adjustOffset(rawOffset) {
    const { heightPerUnit } = this.props
    const flippedInverter = this.props.flipped ? -1 : 1
    const currentY = this.props.position * heightPerUnit
    let newY = (currentY - (rawOffset.y * flippedInverter))

    const offset = { x: 0, y: rawOffset.y }

    if (newY > this.props.chartHeight) {
      newY = this.props.chartHeight
      offset.y = (this.props.chartHeight - currentY) * -1 * flippedInverter
    } else if (newY < 0) {
      newY = 0
      offset.y = currentY * flippedInverter
    }

    this.setState({
      positionDisplay: Math.round(newY / heightPerUnit),
    })

    return offset
  }

  dragStop() {
    this.props.updatePosition(this.state.positionDisplay)
  }

  render() {
    const text = `${this.state.positionDisplay} ${this.props.unit}`
    const offset = this.props.chartHeight
      - (this.props.position * this.props.heightPerUnit)
      + (this.props.barSize / 2)
    return (
      <SVGDrag
        invertedY={this.props.flipped}
        adjustOffset={this.adjustOffset}
        dragStop={this.dragStop}
      >
        <g transform={`translate(0 ${offset})`}>
          <polyline
            strokeWidth={1}
            stroke="black"
            points="-12,0 -7,-10 -2,0 -7,10 -12,0"
            fill="transparent"
          />
          <line
            x1={-2}
            x2={this.props.width + 2}
            y1={0}
            y2={0}
            strokeWidth={1}
            stroke="black"
            strokeDasharray="4, 2"
          />

          <TextBox
            textStyles={{
              x: (this.props.width / 2),
              y: -6,
              textAnchor: 'middle',
              alignmentBaseline: 'bottom',
            }}
            boxStyles={{
              fill: 'olive',
            }}
            padding={2}
            flipped={this.props.flipped}
          >
            {text}
          </TextBox>
        </g>
      </SVGDrag>
    )
  }
}

module.exports = connect(
  state => ({ unit: state.electricityDataTypes })
)(AxisGuide)
