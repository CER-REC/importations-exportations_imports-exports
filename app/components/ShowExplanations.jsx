const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const ArrowTabLine = require('./ArrowTabLine.jsx')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./ShowExplanations.scss')


class ShowExplanations extends React.Component {

  render() {
    const yaxis = WorkspaceComputations.electricityShowExplanationsY()
    const xaxisPadding = 0
    return <g>
      <text x = '5' 
            y = { yaxis } 
            className='ShowExplanationFont'> 
              {Tr.getIn(['explanationShown', this.props.lang])} 
      </text>
      <ArrowTabLine 
        yaxis = {yaxis} 
        xaxisPadding = '0' 
        color = {Constants.getIn(['electricityShowExplanations', 'arrowColor'])} 
        lineWidth = {Constants.getIn(['electricityShowExplanations', 'lineWidth'])}
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    lang: state.lang
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ShowExplanations)