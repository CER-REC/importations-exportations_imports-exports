const React = require('react')
const GSAP = require('gsap')

class SVGAnimation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { current: (props.tween || {}) }
  }

  componentWillReceiveProps(props) {
    const currentTween = Object.assign({}, this.state.current)
    const tweenOptions = Object.assign(
      {
        onUpdate: () => this.setState({
          current: Object.assign({}, currentTween, { _gsTweenID: undefined }),
        }),
        useFrames: true,
      },
      (props.tween || {})
    )
    GSAP.TweenLite.to(currentTween, 12, tweenOptions)
  }

  render() {
    const props = Object.assign({}, this.state.current, this.props)
    delete props._gsTweenID
    delete props.children
    return React.cloneElement(this.props.children, props)
  }
}

const Animate = Component => props =>
  <SVGAnimation {...props}><Component /></SVGAnimation>

module.exports = {
  SVGAnimation,
  Animate,
}

