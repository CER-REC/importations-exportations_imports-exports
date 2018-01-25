import React from 'react'
import { connect } from 'react-redux'

import Constants from '../Constants'
import Tr from '../TranslationTable'
import WorkspaceComputations from '../computations/WorkspaceComputations'

class NglSubproductMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.dropDownClick.bind(this)
  }

  controlRect() {
    let rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','nglMenuYMargin']) }`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu ||
      this.props.expandElectricityAmountMenu) {
      rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','nglMenuYMargin']) + 30 }`
    }
    return <rect 
      x={ 0 } 
      y= { rectYPosition } 
      width={ 5} 
      height={ 16 }
      fill = '#666666'
    />
  }

  subproductText() {
    let textPosition = `${Constants.getIn(['menuBar','nglSubproductTextY'])}`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu ||
      this.props.expandElectricityAmountMenu) {
      textPosition = `${Constants.getIn(['menuBar','nglSubproductTextY']) + 30}`
    }
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = {textPosition}
        className = 'bodyText'>
        { Tr.getIn(['nglSubproductMenu','of',this.props.language]) }
        <tspan className = 'selectableDropdown'> { Tr.getIn(['nglSubproductMenu','butane',this.props.language]) } </tspan>
        <tspan> { Tr.getIn(['nglSubproductMenu','and',this.props.language]) }</tspan>
        <tspan className = 'selectableDropdown'> { Tr.getIn(['nglSubproductMenu','propane',this.props.language]) }</tspan>
        <tspan className = 'selectableDropdown' onClick = {this.onClick}> + </tspan>
      </text>
    </g>
  }

  dropDownClick(e) {
    e.preventDefault()
    console.log('Clicked', this) 
  }

  render() {
    if(this.props.importExportVisualization !== 'naturalGasLiquids') {
      return null
    } else 
      return <g>
        {this.subproductText()}
        {this.controlRect()}
      </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization,
    language: state.language,
    expandImportExportMenu: state.expandImportExportMenu,
    expandElectricitySortMenu: state.expandElectricitySortMenu,
    expandElectricityAmountMenu: state.expandElectricityAmountMenu
  }
}

module.exports = connect(mapStateToProps)(NglSubproductMenu)
