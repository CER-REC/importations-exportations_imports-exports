const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setArrangeBy } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.dropDownClick.bind(this)
  }

  controlArrowImage() {
    return <image
      height = { Constants.getIn(['menuBar','controlArrowSize']) }
      width = { Constants.getIn(['menuBar','controlArrowSize']) }
      x = { 0 }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['menuBar','sortMenuYMargin']) } 
      xlinkHref = 'images/control_arrow.svg'
    />
  }

  sortMenuText() {
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = { Constants.getIn(['menuBar','sortMenuTextY']) }
        className = 'bodyText'>
        { Tr.getIn(['arrangedBy', this.props.language]) }
      </text>
    </g>
  }

  dropDownClick(e) {
    e.preventDefault()
    console.log('Clicked', this) 
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
      <text x = { Constants.getIn(['menuBar','sortTextButtonLabelOffset']) } 
        y = { Constants.getIn(['menuBar','sortMenuTextY']) } 
        className = 'selectableDropdown'>
        {sortString} 
        <tspan onClick = {this.onClick}> + </tspan>
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

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    language: state.language,
    arrangeBy: visualizationSettings(state, props).get('arrangeBy'),
  }
}

const mapDispatchToProps = { setArrangeBy }

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricitySortMenu)
