const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ExpandElectricitySortMenuCreator = require('../actionCreators/ExpandElectricitySortMenuCreator.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const { setArrangeBy } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  controlArrowImage() {
    let rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          116 }`
    if(this.props.expandImportExportMenu) {
      rectYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          146 }`
    }
    return <rect 
      x={ 0 } 
      y= { rectYPosition } 
      width={ 5} 
      height={ 16 }
      fill = '#666666'
    />
  }

  sortMenuText() {
    let textPosition = `${ Constants.getIn(['menuBar','sortMenuTextY']) }`
    if(this.props.expandImportExportMenu) {
      textPosition = `${ Constants.getIn(['menuBar','sortMenuTextY']) + 30}`
    }
    return <g>
      <text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
        y = { textPosition }
        className = 'bodyText'>
        { Tr.getIn(['arrangedBy', this.props.language]) }
      </text>
    </g>
  }

  onClick(e) {
    e.preventDefault()
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

  expandedMenu() {
    if(!this.props.expandElectricitySortMenu) {
      return null
    }
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','sortMenuTextY']) - 35 } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 }  
        dy="0em"> {Tr.getIn(['electricitySortStates', 'imports', this.props.language])} </tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 }  
        dy="1.2em"> 
        {Tr.getIn(['electricitySortStates', 'exports', this.props.language])}
      </tspan>   
    </text>
    </g>
  }

  sortOption() {
    let expandedSign = '+'
    if(this.props.expandElectricitySortMenu) {
      expandedSign = '-'
    }

    let labelPosition = `${ Constants.getIn(['menuBar','sortMenuTextY']) } `
    if(this.props.expandImportExportMenu) {
      labelPosition = `${ Constants.getIn(['menuBar','sortMenuTextY']) + 30} `
    }

    let sortString = `${Tr.getIn(['electricitySortStates','location', this.props.language])}`
    if(this.props.electricitySortState === 'imports') {
      sortString = `${Tr.getIn(['electricitySortStates','imports', this.props.language])}`
    }
    if(this.props.electricitySortState === 'exports') {
      sortString = `${Tr.getIn(['electricitySortStates','exports', this.props.language])}`
    }

    return <g>
      <text x = { Constants.getIn(['menuBar','sortTextButtonLabelOffset']) } 
        y = { labelPosition } 
        className = 'selectableDropdown'>
        {sortString} 
        <tspan onClick = {this.onClick}> {expandedSign} </tspan>
      </text>
    </g>
  }

  render() {
    return <g>
      {this.sortOption()}
      {this.sortMenuText()}
      {this.controlArrowImage()}
      {this.expandedMenu()}
    </g>
  }
}

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    language: state.language,
    arrangeBy: visualizationSettings(state, props).get('arrangeBy'),
    expandImportExportMenu: state.expandImportExportMenu,
    expandElectricitySortMenu: state.expandElectricitySortMenu,
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    onClick: () => {
      dispatch(ExpandElectricitySortMenuCreator())
    }
    //({ setArrangeBy } )
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricitySortMenu)
