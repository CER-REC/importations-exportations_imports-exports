import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'memoize-immutable'

class AnimatedLine extends React.PureComponent {
  static get propTypes() {
    return {
      animate: PropTypes.objectOf(PropTypes.string).isRequired,
      x1: PropTypes.number.isRequired,
      x2: PropTypes.number.isRequired,
      y1: PropTypes.number.isRequired,
      y2: PropTypes.number.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.previousVals = {}
    this.animateRefs = {}

    this.trackRef = memoize(key => (ref) => { this.animateRefs[key] = ref })
  }

  componentWillReceiveProps(props) {
    Object.keys(props.animate).forEach((key) => {
      if (props[key] !== this.props[key] && this.animateRefs[key]) {
        const animRef = this.animateRefs[key]
        this.previousVals[key] = animRef.parentNode[key].animVal.value
        animRef.beginElement()
      }
    })
  }

  render() {
    const spreadProps = Object.assign({}, this.props)
    delete spreadProps.animate
    const animate = Object.entries(this.props.animate)
      .map(([key, val]) => (
        <animate
          ref={this.trackRef(key)}
          key={key}
          attributeType="XML"
          attributeName={key}
          from={this.previousVals[key] || spreadProps[key]}
          to={spreadProps[key]}
          dur={val || '1s'}
        />
      ))
    return <line {...this.props}>{animate}</line>
  }
}

module.exports = AnimatedLine
