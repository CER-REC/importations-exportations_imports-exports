const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

const Constants = require('../Constants.js')


class ElectricityExplanationPopovers extends React.Component {

  render() {
    console.log(this.props)
    if(!this.props.showExplanations) {
      return null
    }
    return <g transform ='scale(0.3)'>
    <path d="M62,30 C89,191 329,166 483,165"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g>
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
})

module.exports = ReactRedux.connect(mapStateToProps)(ElectricityExplanationPopovers)