const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const PopoverPortal = require('./PopoverPortal.jsx')


class ElectricityExplanationPopovers extends React.Component {

  mainNavLine() {
    return <g transform ='translate(95 105)'><g transform='scale(0.3)'>
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
    return <g transform ='translate(123 35)'><g transform='scale(0.3)'>
    <path d="M89,67 C87,286 352,236 444,245"  stroke='#ff708a' strokeWidth ='2' fill='transparent'/>
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
})

module.exports = ReactRedux.connect(mapStateToProps)(ElectricityExplanationPopovers)