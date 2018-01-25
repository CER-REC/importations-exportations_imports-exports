import React from 'react'
import { connect } from 'react-redux'

import Legend from './Legend'
import ShowExplanations from './ShowExplanations'
import ShowConfidentiality from './ShowConfidentiality'
import ElectricityAmountPriceMenu from './ElectricityAmountPriceMenu'
import ElectricitySortMenu from './ElectricitySortMenu'
import MainNavigationMenu from './MainNavigationMenu'
import ImportExportMenu from './ImportExportMenu'
import NglSubproductMenu from './NglSubproductMenu'

import './MenuBar.scss'

class MenuBar extends React.Component {
  electricity() {
    // TODO: add logic to determine if visualization is in electricity state

    // if(!this.props.electricity) { return null }

    return (<g>
      <Legend />

      <ShowConfidentiality />

      <ShowExplanations />

      <NglSubproductMenu />
      <ElectricityAmountPriceMenu />
      <ElectricitySortMenu />
      <ImportExportMenu />

            </g>)
  }

  crudeOil() {

  }

  naturalGas() {

  }

  refinedPetroleumProducts() {

  }

  naturalGasLiquids() {

  }

  render() {
    return (<g className="MenuBar">
      <MainNavigationMenu />
      {this.electricity()}
      {this.crudeOil()}
      {this.refinedPetroleumProducts()}
      {this.naturalGasLiquids()}
            </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})

module.exports = connect(mapStateToProps)(MenuBar)
