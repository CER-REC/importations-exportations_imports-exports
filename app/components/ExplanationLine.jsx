const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')


class ElectricityExplanationPopovers extends React.Component {

  mainNavLine() {
    return <g transform ='translate(43 80)'><g transform='scale(0.3)'>
    <path d="M110,43 C248,257 312,213 633,213" stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g></g>
  }

  playButtonLine() {
    return <g transform ='translate(-2 375)'><g transform='scale(0.3)'>
    <path d="M457,45 C328,266 384,258 22,251"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g></g>
  }

  timeSeekLine() {
    return <g transform ='translate(143 365)'><g transform='scale(0.3)'>
    <path d="M79,57 C163,276 228,251 486,247"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g></g>
  }

  importExportMenuLine() {
    return <g transform ='translate(138 55)'><g transform='scale(0.3)'>
    <path d="M62,30 C89,191 329,166 483,165"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g></g>
  }

  newYorkLine() {
    return <g transform ='translate(613 655)'><g transform='scale(0.3)'>
    <path d="M89,67 C107,235 235,211 432,214"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
    </g></g>
  }

  render() {
    if(!this.props.showExplanations) {
      return null
    }
    return <g>
      {this.mainNavLine()}
      {this.playButtonLine()}
      {this.timeSeekLine()}
      {this.importExportMenuLine()}
      {this.newYorkLine()}
    </g>
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  showExplanations: state.showExplanations,
  explanationPopover: state.explanationPopover,
})

module.exports = ReactRedux.connect(mapStateToProps)(ElectricityExplanationPopovers)