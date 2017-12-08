const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {

  render() {
    return <rect
      x = { 0 }
      y = { WorkspaceComputations.topHeightMargin() + 200 }
      width = { Constants.getIn(['menuBar','width']) }
      height = { Constants.getIn(['electricitySortMenu','height'])  }
      fill = '#ced6e2' 
    />
  }



}






const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}



module.exports = ReactRedux.connect(mapStateToProps)(ElectricitySortMenu)