const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')

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

  basicDot() {
    return <circle id='back'
      cx={this.props.xPosition}
      cy={this.props.yPosition} 
      r={Constants.getIn(['explanationDot','radiusStart'])} 
      fill='#ff708a'/>
  }

  dotAnimation() {
    return <g><defs>
      <circle id='back'
        cx={this.props.xPosition}
        cy={this.props.yPosition} 
        r={Constants.getIn(['explanationDot','radiusStart'])} 
        fill='#ff708a'>
        <animate 
          xlinkHref='#back'
          attributeName='r'
          from={Constants.getIn(['explanationDot','radiusStart'])}
          to={Constants.getIn(['explanationDot','radiusEnd'])}
          dur='1.5s'
          begin='0'
          repeatCount='indefinite'
          fill='freeze'
          id="circ-anim"
        />
        <animate 
          xlinkHref='#back'
          attributeName='opacity'
          from='0.3'
          to='0'
          dur='1.5s'
          begin='0'
          repeatCount='indefinite' 
          fill='freeze'
          id="circ-anim"
        />
      </circle>
    </defs>
    {this.basicDot()}
    </g>
  }

  explanationDot() {
    return <g> {this.dotAnimation()}
      <use xlinkHref="#back"/> 
    </g>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    } else {
      return <svg onClick = {this.onClick}>
        {this.explanationDot()}</svg>
    }
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    showExplanations: state.showExplanations,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ExplanationDot)