const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SetElectricityDataTypeCreator = require('../actionCreators/SetElectricityDataTypeCreator.js')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {

  render() {
    const { selectedEnergy } = this.props
    return <MenuBarOption 
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
    />
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
