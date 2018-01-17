const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ExpandElectricityAmountMenuCreator = require('../actionCreators/ExpandElectricityAmountMenuCreator.js')

const { setAmount } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricityAmountPriceMenu.scss')

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
          Constants.getIn(['menuBar','amountMenuYMargin']) + 30 }`
    }
    return <rect 
      x={ 0 } 
      y= { rectYPosition } 
      width={ 5} 
      height={ 16 }
      fill = '#666666'
    />
  }

  amountMenuText() {
    let textPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) }`
    if(this.props.expandImportExportMenu || this.props.expandElectricitySortMenu) {
      textPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) + 30}`
    }
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = { textPosition }
        className = 'bodyText'>
        { Tr.getIn(['showing',this.props.language]) }
        <tspan className = 'selectableDropdown'> { Tr.getIn(['amount',this.props.language]).toUpperCase() } </tspan>
      </text>
    </g>
  }

  onClick(e) {
    e.preventDefault()
  }

  expandedAmountMenu() {
    if(!this.props.expandElectricityAmountMenu) {
      return null
    }
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - 15 } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 10 }  
        dy="0em"
        onClick = {() => this.props.setAmount('CAN$')}> {Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}</tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 10 }  
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
      textAmountPosition = `${ Constants.getIn(['menuBar','amountMenuTextY']) + 30}`
    }

    let amountString = `${Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}`
    if(this.props.electricitySortState === 'imports') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}`
    }
    if(this.props.electricitySortState === 'exports') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$/MW.h', this.props.language])}`
    }

    return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { textAmountPosition }
        className = 'selectableDropdown'>
        <tspan onClick = {() => this.props.setAmount('MW.h')}>{Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}</tspan>
        <tspan onClick = {this.onClick}> {expandedSign} </tspan>
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


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
