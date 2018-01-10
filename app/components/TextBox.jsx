const React = require('react')

class TextBox extends React.PureComponent {
  static get defaultProps() {
    return {
      textStyles: {},
      boxStyles: {},
      flipped: false,
      padding: 2,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
    this.textRef = null
    this.trackTextRef = this.trackTextRef.bind(this)
  }

  componentDidMount() {
    this.calculateSize()
  }

  componentDidUpdate() {
    this.calculateSize()
  }

  componentWillUnmount() {
    this.textRef = null
  }

  calculateSize() {
    if (!this.textRef) { return }
    const { width, height, x, y } = this.textRef.getBBox()
    if (this.state.width !== width || this.state.height !== height ||
        this.state.x !== x || this.state.y !== y) {
      this.setState({ width, height, x, y })
    }
  }

  trackTextRef(ref) {
    this.textRef = ref
  }

  render() {
    const transform = this.props.flipped
      ? `scale(1,-1) translate(0 ${-(this.state.y * 2 + this.state.height)})`
      : ''
    return (
      <g transform={transform}>
        <rect
          {...this.props.boxStyles}
          width={this.state.width + (this.props.padding * 2)}
          height={this.state.height + (this.props.padding * 2)}
          x={this.state.x - this.props.padding}
          y={this.state.y - this.props.padding}
        />
        <text
          {...this.props.textStyles}
          ref={this.trackTextRef}
        >
          {this.props.children}
        </text>
      </g>
    )
  }
}

module.exports = TextBox
