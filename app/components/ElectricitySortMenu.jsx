const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SortElectricityData = require('../actionCreators/SortElectricityData.js')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {

  render() {
    const titleYaxis = WorkspaceComputations.electricitySortMenuY() - 30
    return <g>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'import','xPadding'])}
        y = {titleYaxis} 
        fill={Constants.getIn(['electricitySortStatesStyle', 'title', 'import','color'])} 
        className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'import',this.props.lang])} 
      </text>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'ampersand','xPadding']) }
      y = {titleYaxis} className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'ampersand',this.props.lang])} 
      </text>
      <text x = {Constants.getIn(['electricitySortStatesStyle', 'title', 'export','xPadding']) }
        y = {titleYaxis} 
        fill= {Constants.getIn(['electricitySortStatesStyle', 'title', 'export','color']) } 
        className='ElectricitySortMenuTitle'> 
        {Tr.getIn(['electricitySortStates', 'title', 'export',this.props.lang])}
      </text>
      <MenuBarOption 
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
    </g>
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