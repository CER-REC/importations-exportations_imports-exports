const React = require('react')
const memoize = require('memoize-immutable')

class AnimatedLine extends React.PureComponent {
  constructor(props) {
    super(props)
    this.previousVals = {}
    this.animateRefs = {}

    this.trackRef = memoize(key => ref => this.animateRefs[key] = ref)
  }

  componentWillReceiveProps(props) {
    Object.keys(props.animate).forEach((key) => {
      if (props[key] !== this.props[key] && this.animateRefs[key]) {
        const animRef = this.animateRefs[key]
        this.previousVals[key] = animRef.parentNode[key].animVal.value
        animRef.beginElement()
      }
    })
    if (props.y1 !== this.props.y1 && this.animateRef) {
      /*
      this.previousVal = this.animateRef.parentNode.y1.animVal.value
      this.animateRef.beginElement()
      */
    }
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

AnimatedLine.defaultProps = {
  animate: {},
}

module.exports = AnimatedLine
