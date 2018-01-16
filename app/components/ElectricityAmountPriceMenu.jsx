const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setAmount } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricityAmountPriceMenu.scss')

class ElectricityAmountPriceMenu extends React.Component {
  render() {
    const { selectedEnergy } = this.props
    return (<MenuBarOption
      key="electricityAmountPriceMenu"
      yaxis={WorkspaceComputations.electricityAmountPriceMenuY()}
      options={Constants.getIn(['energyMeasurementTypes', selectedEnergy])}
      onOptionClick={this.props.setAmount}
      selectedOption={this.props.amount}
      optionXaxisPadding={Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding={Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey="electricityDataTypes"
      color={Constants.getIn(['electricityDataTypesStyle', 'color'])}
      lineWidth={Constants.getIn(['electricityDataTypesStyle', 'lineWidth'])}
      language={this.props.language}
    />)
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  selectedEnergy: state.importExportVisualization,
  language: state.language,
  amount: visualizationSettings(state, props).get('amount'),
})

const mapDispatchToProps = ({ setAmount })

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
