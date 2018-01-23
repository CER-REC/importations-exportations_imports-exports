const React = require('react')
const ReactRedux = require('react-redux')

// Sample code for svg popups https://codepen.io/demianpt/pen/zragBN
class ExplanationPopovers extends React.Component {
  render() {
    // Mock data need to be replaced by actual content
    return null
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})

module.exports = ReactRedux.connect(mapStateToProps)(ExplanationPopovers)
