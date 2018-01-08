const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')


require ('../styles/Fonts.scss')


class ShowConfidentiality extends React.Component {

  triangleLineColor() {
    
    let triangleLineColor = '#666666'
    if(this.props.showExplanations) {
      triangleLineColor = '#ff708a'
    }
    return <svg 
      x = {0}
      y = {503}
      width = {150}>
      <g>
        <polyline fill= {triangleLineColor} points="0 8 0 0 9.1 8.1 0 8.1"/>
        <line stroke = {triangleLineColor}   x1="0.5" y1="7.6" x2="150" y2="7.6"/>
      </g>
    </svg>
  }

  showText() {


    let textColour = '#999999'

    return <text x = {13} 
      y = { 500 } 
      
      fill= {textColour}> 
      asfd
    </text>
  }

  render() {
    return <g >
      {this.showText()}
      {this.triangleLineColor()}
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