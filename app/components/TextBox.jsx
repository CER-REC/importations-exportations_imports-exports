import React from 'react'
import PropTypes from 'prop-types'

class TextBox extends React.PureComponent {
  static propTypes = {
    textStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    boxStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    flipped: PropTypes.bool,
    padding: PropTypes.number,
    unsizedContent: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.node,
    ]).isRequired,
  }

  static defaultProps = {
    textStyles: {},
    boxStyles: {},
    flipped: false,
    padding: 2,
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
    // The size isn't always accurate right after mount, so check every 100ms
    let i = 0
    const mountCheck = () => {
      if (i === 10) { return }
      this.calculateSize()
      setTimeout(mountCheck, 100)
      i += 1
    }
    mountCheck()
  }

  componentDidUpdate() {
    this.calculateSize()
  }

  componentWillUnmount() {
    this.textRef = null
  }

  calculateSize() {
    if (!this.textRef) { return }
    const {
      width, height, x, y,
    } = this.textRef.getBBox()
    if (this.state.width !== width || this.state.height !== height ||
        this.state.x !== x || this.state.y !== y) {
      this.setState({
        width, height, x, y,
      })
    }
  }

  trackTextRef(ref) {
    this.textRef = ref
    this.calculateSize()
  }

  render() {
    const transform = this.props.flipped
      ? `scale(1,-1) translate(0 ${-((this.state.y * 2) + this.state.height)})`
      : ''
    const unsizedContent =
      (this.props.unsizedContent && this.props.unsizedContent(this.state)) || null
    return (
      <g transform={transform}>
        {unsizedContent}
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


export default (TextBox)

