const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./Legend.scss')

class Legend extends React.Component {

  render() {
    return <g>
      <rect 
        x = { 0 }
        y = {WorkspaceComputations.legendY(this.props.viewport)}
        width = { Constants.getIn(['legend','width']) }
        height = { Constants.getIn(['legend','height']) }
        fill = '#ebf2bc' 
      />
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(Legend)