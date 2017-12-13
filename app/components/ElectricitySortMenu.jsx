const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SortElectricityData = require('../actionCreators/SortElectricityData.js')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {

  render() {
    return <MenuBarOption 
      key='electricitySortStateMenu'
      yaxis = { WorkspaceComputations.electricitySortMenuY() }
      options = {Constants.get('electricitySortStates')}
      onOptionClick = {this.props.setElectricitySortState.bind(this)}
      selectedOption = {this.props.electricitySortState}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricitySortStates' 
      color = {Constants.getIn(['electricitySortStatesStyle', 'color'])}
      lineWidth = {Constants.getIn(['electricitySortStatesStyle', 'lineWidth'])}
      lang = {this.props.lang}
    />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    electricitySortState: state.electricitySortState,
    lang: state.lang
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setElectricitySortState(sortState) {
      dispatch(SortElectricityData(sortState))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricitySortMenu)