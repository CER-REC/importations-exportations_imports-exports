const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SortElectricityData = require('../actionCreators/SortElectricityData.js')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {

  controlArrowImage() {
    return <image
      height = {15}
      width = {15}
      x = { 0 }
      y = { 171 }
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  sortMenuText() {
    return <g>
      <text x = {13} y = {182}
        className = 'bodyText'>
        arranged by
      </text>
    </g>
  }

  sortMenuFunctionality() {
    return <g><MenuBarOption 
      key='electricitySortStateMenu'
      yaxis = { 183 }
      options = {Constants.get('electricitySortStates')}
      onOptionClick = {this.props.setElectricitySortState.bind(this)}
      selectedOption = {this.props.electricitySortState}
      optionXaxisPadding = {100}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'electricitySortStates' 
      color = {Constants.getIn(['electricitySortStatesStyle', 'color'])}
      lineWidth = {Constants.getIn(['electricitySortStatesStyle', 'lineWidth'])}
      language = {this.props.language}
    />
    </g>
  }

  sortOption() {
    let sortString = `${Tr.getIn(['electricitySortStates','location', this.props.language])}`
    if(this.props.electricitySortState === 'imports') {
      sortString = `${Tr.getIn(['electricitySortStates','imports', this.props.language])}`
    }
    if(this.props.electricitySortState === 'exports') {
      sortString = `${Tr.getIn(['electricitySortStates','exports', this.props.language])}`
    }

    return <g>
      <text x = {80} y = {182} 
        className = 'selectableDropdown'>
        {sortString} 
        <tspan> + </tspan>
      </text>
    </g>
  }

  render() {
    return <g>
      {this.sortOption()}
      {this.sortMenuText()}
      {this.controlArrowImage()}
    </g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    electricitySortState: state.electricitySortState,
    language: state.language
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