import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-immutable'

class AnimatedMapPiece extends React.PureComponent {
  static get propTypes() {
    return {
      x1: PropTypes.number.isRequired,
      x2: PropTypes.number.isRequired,
      y1: PropTypes.number.isRequired,
      y2: PropTypes.number.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.x1 = this.props.x1
    this.y1 = this.props.y1
    this.x2 = this.props.x2
    this.y2 = this.props.y2

    this.animateRef = ''
    this.trackRef = (ref) => { this.animateRef = ref }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x1 !== this.props.x1 || nextProps.y1 !== this.props.y1) {
      this.x1 = this.props.x2,
      this.y1 = this.props.y2,
      this.x2 = nextProps.x2,
      this.y2 = nextProps.y2,
      this.animateRef.beginElement()
    }
  }

  render() {
    return (<animateTransform
      ref={this.trackRef}
      attributeName="transform"
      attributeType="XML"
      type="translate"
      from={`${this.x1} ${this.y1}`}
      to={`${this.x2} ${this.y2}`}
      dur="1s"
      fill="freeze"
    />)
  }
}

export default AnimatedMapPiece
