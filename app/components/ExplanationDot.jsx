const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

const ExplanationSummonedCreator = require('../actionCreators/ExplanationSummonedCreator.js')

require('./ExplanationDot.scss')

class ExplanationDot extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.explanationDotClick.bind(this)
  }

  explanationDotClick(e) {
    e.stopPropagation()
    console.log('explanation dot clicked', this)
  }

  explanationDot() {
    return (<circle
      id="back"
      cx={this.props.xPosition}
      cy={this.props.yPosition}
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      fill="#ff708a"
    />)
  }

  dotAnimation() {
    return (<circle
      id="animationCircle"
      r={Constants.getIn(['explanationDot', 'radiusStart'])}
      cx={this.props.xPosition}
      cy={this.props.yPosition}
      fill="#ff708a"
    >
      <defs>
        <animate
          xlinkHref="#back"
          attributeName="r"
          from={Constants.getIn(['explanationDot', 'radiusStart'])}
          to={Constants.getIn(['explanationDot', 'radiusEnd'])}
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
          fill="freeze"
          id="circ-anim"
        />
        <animate
          xlinkHref="#back"
          attributeName="opacity"
          from="0.3"
          to="0"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
          fill="freeze"
          id="circ-anim"
        />
      </defs>

        </circle>)
  }

  render() {
    if (!this.props.showExplanations) {
      return null
    }
    return (<g onClick={this.onClick}>
      {this.explanationDot()}
      {this.dotAnimation()}

    </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
  explanation: state.explanation,
})


module.exports = ReactRedux.connect(mapStateToProps)(ExplanationDot)
