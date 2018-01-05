const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./ExplanationDot.scss')

class ExplanationDot extends React.Component {

  explanationDot() {
    return <g><animate 
       xlinkHref='#back'
       attributeName='r'
       from={Constants.getIn(['explanationDot','radiusStart'])}
       to={Constants.getIn(['explanationDot','radiusEnd'])}
       dur='1.6s'
       begin='0'
       repeatCount='indefinite'
       fill='freeze'
      />
     <animate 
       xlinkHref='#back'
       attributeName='opacity'
       from='1'
       to='0'
       dur='1.6s'
       begin='0'
       repeatCount='indefinite' 
       fill='freeze' 
      />
     <circle id='back' 
       cx={this.props.xPosition}
       cy={this.props.yPosition} 
       r={Constants.getIn(['explanationDot','radiusEnd'])} 
       strokeWidth= {Constants.getIn(['explanationDot','strokeWidth'])}
       fill='#ff708a'/>
     <circle 
       cx={this.props.xPosition}
       cy={this.props.yPosition} 
       r={Constants.getIn(['explanationDot','radiusStart'])} 
       fill='#ff708a'/>
     </g>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    } else {
    return <svg>{this.explanationDot()}</svg>
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