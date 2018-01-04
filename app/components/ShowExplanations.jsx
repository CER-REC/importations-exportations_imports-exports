const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const ExplanationDot = require('./ExplanationDot.jsx')

const ShowExplanationsCreator = require('../actionCreators/ShowExplanationsCreator.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')



require ('../styles/Fonts.scss')


class ShowExplanations extends React.Component {

  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
  }

  triangleLineColor() {
    const yaxis = WorkspaceComputations.showExplanationsY()
    let triangleLineColor = '#666666'
    if(this.props.showExplanations) {
      triangleLineColor = '#ff708a'
    }
    return <svg 
      x = {0}
      y = {yaxis - 3}
      width = {150}>
      <g>
        <polyline fill= {triangleLineColor} points="0 8 0 0 9.1 8.1 0 8.1"/>
        <line stroke = {triangleLineColor}   x1="0.5" y1="7.6" x2="150" y2="7.6"/>
      </g>
    </svg>
  }

  showText() {
    const yaxis = WorkspaceComputations.showExplanationsY()

    let textColour = '#999999'
    let explanationsText = `${Tr.getIn(['explanationShown', this.props.language])}`
    if(this.props.showExplanations) {
      textColour = '#ff708a'
      explanationsText = `${Tr.getIn(['explanationHide', this.props.language])}`
    }

    return <text x = {13} 
      y = { yaxis } 
      className='showHideExplanations'
      fill= {textColour}> 
      {explanationsText}
    </text>
  }

  render() {
    return <g onClick = {this.onClick}>
      {this.showText()}
      {this.triangleLineColor()}
      <ExplanationDot />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    showExplanations: state.showExplanations,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ShowExplanationsCreator())
    }
  }

}


module.exports = ReactRedux.connect(mapStateToProps,mapDispatchToProps)(ShowExplanations)