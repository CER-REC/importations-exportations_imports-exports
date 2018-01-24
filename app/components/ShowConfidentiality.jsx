const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ConfidentialityToggle = require('../actions/confidentiality').ShowConfidentiality

class ShowConfidentiality extends React.Component {
  static get propTypes() {
    return {
      onClick: PropTypes.func.isRequired,
      confidentiality: PropTypes.bool.isRequired,
      language: PropTypes.string.isRequired,
    }
  }

  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    console.log('asdf')
  }

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
    let textString = `${Tr.getIn(['confidentialityShown', this.props.language])}`
    if(this.props.confidentiality) {
      textString = `${Tr.getIn(['confidentialityHide' , this.props.language])}`
    }
    return <text x = {13} 
      y = { 506 } 
      className = 'showHideConfidentiality'
      fill= '#999999'> 
      { textString }
    </text>
  }

  render() {
    return <g transform='translate(0 30)' onClick = {this.onClick}>
      {this.showText()}
      {this.triangleLine()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    confidentiality: state.confidentiality,
  }
}

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(ConfidentialityToggle())
  },
})


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ShowConfidentiality)