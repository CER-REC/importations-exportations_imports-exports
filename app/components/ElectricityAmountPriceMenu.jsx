import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import Tr from '../TranslationTable'
import WorkspaceComputations from '../computations/WorkspaceComputations'

import ExpandElectricityAmountMenuCreator from '../actionCreators/ExpandElectricityAmountMenuCreator'

import { setAmount } from '../actions/visualizationSettings'
import { visualizationSettings } from '../selectors/visualizationSettings'

import './ElectricityAmountPriceMenu.scss'

class ElectricityAmountPriceMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  controlRect() {
    let rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','amountMenuYMargin']) }`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu) {
      rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','amountMenuYMargin']) + Constants.getIn(['menuBar','menuExpandedPadding']) }`
    }
    return <rect 
      x={ 0 } 
      y= { rectYPosition } 
      width={ Constants.getIn(['menuBar','barWidth'])} 
      height={ Constants.getIn(['menuBar','barHeight'])}
      fill = '#666666'
    />
  }

  amountMenuText() {
    let textPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) }`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu) {
      textPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) + Constants.getIn(['menuBar','menuExpandedPadding'])}`
    }
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = { textPosition }
        className = 'bodyText'>
        { Tr.getIn(['showing',this.props.language]) }
        <tspan className = 'selectableDropdown' onClick={this.onClick}> { Tr.getIn(['amount',this.props.language]).toUpperCase() } </tspan>
      </text>
    </g>
  }

  onClick(e) {
    e.preventDefault()
  }

  expandedAmountMenu() {
    if(!this.props.expandElectricityAmountMenu || this.props.selectedEnergy === 'crudeOil'
      || this.props.selectedEnergy === 'naturalGasLiquids' || this.props.selectedEnergy === 'refinedPetroleumProducts') {
      return null
    }

    if(this.props.amount === 'CAN$') {
      return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - Constants.getIn(['menuBar','amountMenuTextOffsetY']) } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="0em"
        onClick = {() => this.props.setAmount('MW.h')}> {Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}</tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="1.2em"
        onClick = {() => this.props.setAmount('CAN$/MW.h')}> 
        {Tr.getIn(['electricityDataTypes','CAN$/MW.h', this.props.language])}
      </tspan>   
    </text>
    </g>
    }

    if(this.props.selectedEnergy === 'naturalGas' && this.props.expandElectricityAmountMenu &&
        this.props.amount === 'thousand m3/d') {
      return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - Constants.getIn(['menuBar','amountMenuTextOffsetY']) } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="0em"
        onClick = {() => this.props.setAmount('CN$/GJ')}> {Tr.getIn(['electricityDataTypes','CN$/GJ', this.props.language])}</tspan>
    </text>
    </g>   
    }

    if(this.props.selectedEnergy === 'naturalGas' && this.props.amount === 'CN$/GJ'
        && this.props.expandElectricityAmountMenu) {
      return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - Constants.getIn(['menuBar','amountMenuTextOffsetY']) } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="0em"
        onClick = {() => this.props.setAmount('thousand m3/d')}> {Tr.getIn(['electricityDataTypes','thousand m3/d', this.props.language])}</tspan>
    </text>
    </g> 
    }

    if(this.props.amount === 'CAN$/MW.h')
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - Constants.getIn(['menuBar','amountMenuTextOffsetY']) } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="0em"
        onClick = {() => this.props.setAmount('MW.h')}> {Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}</tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="1.2em"
        onClick = {() => this.props.setAmount('CAN$')}> 
        {Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}
      </tspan>   
    </text>
    </g>

    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - Constants.getIn(['menuBar','amountMenuTextOffsetY']) } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="0em"
        onClick = {() => this.props.setAmount('CAN$')}> {Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}</tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + Constants.getIn(['menuBar','expandedMenuTextMargin']) }  
        dy="1.2em"
        onClick = {() => this.props.setAmount('CAN$/MW.h')}> 
        {Tr.getIn(['electricityDataTypes','CAN$/MW.h', this.props.language])}
      </tspan>   
    </text>
    </g>
  }
  
  amountOption() {
    let expandedSign = '+'
    if(this.props.expandElectricityAmountMenu) {
      expandedSign = '-'
    }

    let textAmountPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) }`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu) {
      textAmountPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) + Constants.getIn(['menuBar','menuExpandedPadding'])}`
    }
    let amountString = `${Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}`
    if(this.props.amount === 'CAN$') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}`
    }
    if(this.props.amount === 'CAN$/MW.h') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$/MW.h', this.props.language])}`
    }

    if(this.props.selectedEnergy === 'naturalGas') {
      amountString = `${Tr.getIn(['electricityDataTypes','thousand m3/d', this.props.language])}`
    }

    if(this.props.selectedEnergy === 'naturalGas' && this.props.amount !== 'thousand m3/d') {
      amountString = `${Tr.getIn(['electricityDataTypes','CN$/GJ', this.props.language])}`
    }

    if(this.props.selectedEnergy === 'crudeOil' || this.props.selectedEnergy === 'refinedPetroleumProducts') {
      return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { textAmountPosition }
        className = 'selectableDropdown' 
        onClick = {() => this.props.setAmount('thousand m3/d')}>
        {Tr.getIn(['electricityDataTypes', 'thousand m3/d', this.props.language])}
      </text>
      </g>
    }

    if(this.props.selectedEnergy === 'naturalGasLiquids') {
      return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { textAmountPosition }
        className = 'selectableDropdown' 
        onClick = {() => this.props.setAmount('m3/d')}>
        ({Tr.getIn(['electricityDataTypes', 'm3/d', this.props.language])})
      </text>
      </g>
    }

    if(this.props.selectedEnergy === 'naturalGas') {
      return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { textAmountPosition }
        className = 'selectableDropdown'>
        <tspan onClick = {this.onClick}>({amountString}) {expandedSign} </tspan>
      </text>
    </g>
    }

    return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { textAmountPosition }
        className = 'selectableDropdown'>
        <tspan onClick = {this.onClick}>({amountString}) {expandedSign} </tspan>
      </text>
    </g>
  }

  render() {
    return <g>
      {this.amountMenuText()}
      {this.controlRect()}
      {this.amountOption()}
      {this.expandedAmountMenu()}
    </g>
  }
}

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    selectedEnergy: state.importExportVisualization,
    language: state.language,
    amount: visualizationSettings(state, props).get('amount'),
    expandImportExportMenu: state.expandImportExportMenu,
    expandElectricitySortMenu: state.expandElectricitySortMenu,
    expandElectricityAmountMenu: state.expandElectricityAmountMenu
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    onClick: () => {
      dispatch(ExpandElectricityAmountMenuCreator())
    },
    setAmount: (amount) => {
      dispatch(setAmount(amount))
    }
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
