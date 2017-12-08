const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./ShowExplanations.scss')


class ShowExplanations extends React.Component {

  render() {
    return <rect
      x = { 0 }
      y = { WorkspaceComputations.electricityShowExplanationsY() }
      width = { Constants.getIn(['menuBar','width']) }
      height = { Constants.getIn(['electricityShowExplanations','height']) }
      fill = '#b7ddf1' 
    />

  }


}




const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(ShowExplanations)