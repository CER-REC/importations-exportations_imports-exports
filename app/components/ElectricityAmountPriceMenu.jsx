const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SetElectricityDataTypeCreator = require('../actionCreators/SetElectricityDataTypeCreator.js')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {

  render() {
    return <MenuBarOption 
      key='electricityAmountPriceMenu'
      yaxis = { WorkspaceComputations.electricityAmountPriceMenuY() }
      options = {Constants.get('electricityDataTypes')}
      onOptionClick = {this.props.setElectricityDataType.bind(this)}
      selectedOption = {this.props.electricityDataTypes}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricityDataTypes' 
      color = {Constants.getIn(['electricityDataTypesStyle', 'color'])}
      lineWidth = {Constants.getIn(['electricityDataTypesStyle', 'lineWidth'])}
      lang = {this.props.lang}
    />

  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    electricityDataTypes: state.electricityDataTypes,
    lang: state.lang
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