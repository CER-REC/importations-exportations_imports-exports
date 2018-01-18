const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ExpandElectricitySortMenuCreator = require('../actionCreators/ExpandElectricitySortMenuCreator.js')

const { setArrangeBy } = require('../actions/visualizationSettings')
const { visualizationSettings } = require('../selectors/visualizationSettings')

require('./ElectricitySortMenu.scss')

class ElectricitySortMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  controlRect() {
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

  expandedMenu() {
    const location = `${Tr.getIn(['electricitySortStates','location', this.props.language])}`
    const mostImports = `${Tr.getIn(['electricitySortStates','imports', this.props.language])}`
    const mostExports = `${Tr.getIn(['electricitySortStates','exports', this.props.language])}`

    if(!this.props.expandElectricitySortMenu || this.props.importExportVisualization !== 'electricity') {
      return null
    }

    if(this.props.arrangeBy === 'imports') {
      return <g>
        <text x={ Constants.getIn(['menuBar','textLabelOffset']) }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport)
        + Constants.getIn(['menuBar','sortMenuTextY']) - 35 }
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="0em"
        onClick = {() => this.props.setArrangeBy('location') }
      > {location} </tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="1.2em"
        onClick = {() => this.props.setArrangeBy('exports') }>
        {mostExports}
      </tspan>
    </text>

      </g>
    }
    if(this.props.arrangeBy === 'exports') {
      return <g>
        <text x={ Constants.getIn(['menuBar','textLabelOffset']) }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport)
        + Constants.getIn(['menuBar','sortMenuTextY']) - 35 }
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="0em"
        onClick = {() => this.props.setArrangeBy('location') }
      > {location} </tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="1.2em"
        onClick = {() => this.props.setArrangeBy('imports')}>
        {mostImports}
      </tspan>
    </text>

      </g>
    }

    return <g><text x={ Constants.getIn(['menuBar','textLabelOffset']) }
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport)
        + Constants.getIn(['menuBar','sortMenuTextY']) - 35 }
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="0em"
        onClick = {() => this.props.setArrangeBy('imports') }
      > {mostImports} </tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 } 
        dy="1.2em"
        onClick = {() => this.props.setArrangeBy('exports') }>
        {mostExports}
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
    if(this.props.arrangeBy === 'imports') {
      sortString = `${Tr.getIn(['electricitySortStates','imports', this.props.language])}`
    } 
    if(this.props.arrangeBy === 'exports') {
      sortString = `${Tr.getIn(['electricitySortStates','exports', this.props.language])}`
    }

    return <g>
      <text x = { Constants.getIn(['menuBar','sortTextButtonLabelOffset']) } 
        y = { labelPosition } 
        className = 'selectableDropdown'>
        <tspan onClick = {this.onClick}>{sortString} {expandedSign} </tspan>
      </text>
    </g>
  }

  render() {
    return <g>
      {this.sortOption()}
      {this.sortMenuText()}
      {this.controlRect()}
      {this.expandedMenu()}
    </g>
  }
}

const mapStateToProps = (state, props) => {
  return {
    viewport: state.viewport,
    language: state.language,
    importExportVisualization: state.importExportVisualization,
    arrangeBy: visualizationSettings(state, props).get('arrangeBy'),
    expandImportExportMenu: state.expandImportExportMenu,
    expandElectricitySortMenu: state.expandElectricitySortMenu,
  }
}


const mapDispatchToProps = dispatch => {
  return { 
    onClick: () => {
      dispatch(ExpandElectricitySortMenuCreator())
    },
    setArrangeBy: (value) => {
      dispatch(setArrangeBy(value))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ElectricitySortMenu)
