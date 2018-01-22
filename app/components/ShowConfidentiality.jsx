const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')


require ('../styles/Fonts.scss')


class ShowConfidentiality extends React.Component {

  triangleLine() {
    
    return <svg 
      x = {0}
      y = {503}
      width = {150}>
      <g>
        <polyline fill= 'black' points="0 8 0 0 9.1 8.1 0 8.1"/>
        <line stroke = 'black'   x1="0.5" y1="7.6" x2="150" y2="7.6"/>
      </g>
    </svg>
  }

  showText() {
    return <text x = {13} 
      y = { 506 } 
      className = 'showHideConfidentiality'
      fill= '#999999'> 
      { Tr.getIn(['confidentialityShown', this.props.language])}
    </text>
  }

  render() {
    return <g transform='translate(0 30)'>
      {this.showText()}
      {this.triangleLine()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
  }
}



module.exports = ReactRedux.connect(mapStateToProps)(ShowConfidentiality)