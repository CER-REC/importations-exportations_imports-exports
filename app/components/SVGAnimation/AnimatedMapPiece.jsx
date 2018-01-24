const React = require('react')
const PropTypes = require('prop-types')
const memoize = require('memoize-immutable')

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
    this.state = {
      x1: this.props.x1,
      y1: this.props.y1,
      x2: this.props.x2,
      y2: this.props.y2  
    }
    
    this.animateRef =''
    this.trackRef = (ref) => { this.animateRef = ref }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, this.props)
    if(nextProps !== this.props )
    {
      this.setState({
        x1: this.props.x2,
        y1: this.props.y2,
        x2: nextProps.x2,
        y2: nextProps.y2,
      })
      this.animateRef.beginElement()
    }
  }

  render() {
    return <animateTransform 
          ref={this.trackRef}
          key={`animate ${this.props.id}`}
          attributeName="transform"
          attributeType="XML"
          type="translate"
          from={`${this.state.x1} ${this.state.y1}`}
          to={`${this.state.x2} ${this.state.y2}`}
          dur="2s"
          fill="freeze"/>
  }
}

module.exports = AnimatedMapPiece
