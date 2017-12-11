const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const Legend = require('./Legend.jsx')
const ShowExplanations = require('./ShowExplanations.jsx')
const ElectricityAmountPriceMenu = require('./ElectricityAmountPriceMenu.jsx')
const ElectricitySortMenu = require('./ElectricitySortMenu.jsx')
const MainNavigationMenu = require('./MainNavigationMenu.jsx')

require('./MenuBar.scss')

class MenuBar extends React.Component {

  electricity() {
    // TODO: add logic to determine if visualization is in electricity state

    // if(!this.props.electricity) { return null }

    return <g>
      <Legend />
      
      <ShowExplanations />
      <ElectricityAmountPriceMenu />
      <ElectricitySortMenu />

    </g>
  }

  crudeOil() {
    return
  }

  naturalGas() {
    return
  }

  refinedPetroleumProducts() {
    return
  }

  naturalGasLiquids() {
    return
  }

  render() {
    return <g className='MenuBar'>
      <rect 
        x = { 0 }
        y = { WorkspaceComputations.topHeightMargin() }
        width = { Constants.getIn(['menuBar','width']) }
        height = { WorkspaceComputations.menuBarHeight(this.props.viewport)}
        fill = '#F3D7D8' 
      />


      <MainNavigationMenu />

      {this.electricity()}
      {this.crudeOil()}
      {this.refinedPetroleumProducts()}
      {this.naturalGasLiquids()}

    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(MenuBar)