const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

class ExplanationDot extends React.Component {

  render() {

    return <div className='circle'>
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