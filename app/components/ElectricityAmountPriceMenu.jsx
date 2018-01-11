const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setAmount } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.dropDownClick.bind(this)
  }

  controlArrowImage() {
    return <image
      height = { Constants.getIn(['menuBar','controlArrowSize']) }
      width = {Constants.getIn(['menuBar','controlArrowSize']) }
      x = { 0 }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','amountMenuYMargin']) }
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  amountMenuText() {
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = { Constants.getIn(['menuBar','amountMenuTextY']) }
        className = 'bodyText'>
        { Tr.getIn(['showing',this.props.language]) }
        <tspan className = 'selectableDropdown'> { Tr.getIn(['amount',this.props.language]).toUpperCase() } </tspan>
      </text>
    </g>
  }

  dropDownClick(e) {
    e.preventDefault()
    console.log('Clicked', this) 
  }

  amountMenuOptions() {
    const { selectedEnergy } = this.props
    return <g><MenuBarOption 
      key='electricityAmountPriceMenu'
      yaxis = { WorkspaceComputations.electricityAmountPriceMenuY() }
      options={Constants.getIn(['energyMeasurementTypes', selectedEnergy])}
      onOptionClick = {this.props.setAmount}
      selectedOption = {this.props.amount}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricityDataTypes' 
      language = {this.props.language}
    /></g>
  }

  amountOption() {
    let amountString = `${Tr.getIn(['electricityDataTypes','MW.h', this.props.language])}`
    if(this.props.electricitySortState === 'imports') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$', this.props.language])}`
    }
    if(this.props.electricitySortState === 'exports') {
      amountString = `${Tr.getIn(['electricityDataTypes','CAN$/MW.h', this.props.language])}`
    }

    return <g>
      <text x = { Constants.getIn(['menuBar','amountTextButtonLabelOffset']) } 
        y = { Constants.getIn(['menuBar','amountMenuTextY']) }
        className = 'selectableDropdown'>
        {amountString}
        <tspan onClick = {this.onClick}> + </tspan>
      </text>
    </g>
  }


  render() {
    return <g>
      {this.amountMenuText()}
      {this.controlArrowImage()}
      {this.amountOption()}
    }
    </g>
  }
}

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    selectedEnergy: state.importExportVisualization,
    language: state.language,
    amount: visualizationSettings(state, props).get('amount'),
  }
}

const mapDispatchToProps = ({ setAmount })

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
