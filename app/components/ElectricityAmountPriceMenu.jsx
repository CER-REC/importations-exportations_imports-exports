const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setAmount } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricityAmountPriceMenu.scss')

const ElectricityAmountPriceMenu = props => (
  <MenuBarOption
    key="electricityAmountPriceMenu"
    yaxis={WorkspaceComputations.electricityAmountPriceMenuY()}
    options={Constants.getIn(['energyMeasurementTypes', props.selectedEnergy])}
    onOptionClick={props.setAmount}
    selectedOption={props.amount}
    optionXaxisPadding={Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
    optionPadding={Constants.getIn(['menuBarOptions', 'optionPadding'])}
    trKey="electricityDataTypes"
    color={Constants.getIn(['electricityDataTypesStyle', 'color'])}
    lineWidth={Constants.getIn(['electricityDataTypesStyle', 'lineWidth'])}
    language={props.language}
  />
)

ElectricityAmountPriceMenu.propTypes = {
  selectedEnergy: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  selectedEnergy: state.importExportVisualization,
  language: state.language,
  amount: visualizationSettings(state, props).get('amount'),
})

const mapDispatchToProps = ({ setAmount })

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricityAmountPriceMenu)
