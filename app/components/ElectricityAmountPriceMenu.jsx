const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SetElectricityDataTypeCreator = require('../actionCreators/SetElectricityDataTypeCreator.js')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {

  controlArrowImage() {
    return <image
      height = {15}
      width = {15}
      x = { 0 }
      y = { 192 }
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  amountMenuText() {
    return <g>
      <text x = {13} y = {203}
        className = 'bodyText'>
        showing <tspan className = 'selectableDropdown'> AMOUNT </tspan>
      </text>
    </g>
  }

  amountMenuOptions() {
    const { selectedEnergy } = this.props
    return <g><MenuBarOption 
      key='electricityAmountPriceMenu'
      yaxis = { WorkspaceComputations.electricityAmountPriceMenuY() }
      options={Constants.getIn(['energyMeasurementTypes', selectedEnergy])}
      onOptionClick = {this.props.setElectricityDataType.bind(this)}
      selectedOption = {this.props.electricityDataType}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricityDataTypes' 
      color = {Constants.getIn(['electricityDataTypesStyle', 'color'])}
      lineWidth = {Constants.getIn(['electricityDataTypesStyle', 'lineWidth'])}
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
      <text x = {109} y = {203} 
        className = 'selectableDropdown'>
        {amountString}
        <tspan> + </tspan>
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

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    electricityDataType: state.electricityDataTypes,
    selectedEnergy: state.importExportVisualization,
    language: state.language
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setElectricityDataType(dataType) {
      dispatch(SetElectricityDataTypeCreator(dataType))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
