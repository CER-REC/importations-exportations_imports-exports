const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {

  render() {
    return <rect
      x = { 0 }
      y = { WorkspaceComputations.topHeightMargin() + 360 }
      width = { Constants.getIn(['menuBar','width']) }
      height = { Constants.getIn(['electricityAmountPriceMenu','height'])  }
      fill = '#d2f2b8' 
    />

  }


}





const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}



module.exports = ReactRedux.connect(mapStateToProps)(ElectricityAmountPriceMenu)