import React from 'react'
import PropTypes from 'prop-types'

class AnimatedMapPiece extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.startX = this.endX = this.props.x
    this.startY = this.endY = this.props.y

    this.animateRef = null
    this.trackRef = (ref) => { this.animateRef = ref }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x !== this.props.x || nextProps.y !== this.props.y) {
      this.startX = this.props.x
      this.startY = this.props.y
      this.endX = nextProps.x
      this.endY = nextProps.y
      this.animateRef.beginElement()
    }
  }

  render() {
    return (<animateTransform
      ref={this.trackRef}
      attributeName="transform"
      attributeType="XML"
      type="translate"
      from={`${this.startX} ${this.startY}`}
      to={`${this.endX} ${this.endY}`}
      dur="1s"
      fill="freeze"
    />)
  }
}

export default AnimatedMapPiece
