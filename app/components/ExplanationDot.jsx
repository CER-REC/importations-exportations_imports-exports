const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./ExplanationDot.scss')

class ExplanationDot extends React.Component {

  explanationDot() {
    return <div className='pulse'><div className='circle' />
    </div>
  }

  render() {

    return <div>{this.explanationDot()}
</div>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ExplanationDot)