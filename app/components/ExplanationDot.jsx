const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./ExplanationDot.scss')

class ExplanationDot extends React.Component {

  explanationDot() {
    return <div className='pulse'>
    </div>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    } else {
    return <div>{this.explanationDot()}
    </div>
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