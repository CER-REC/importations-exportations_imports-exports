const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

const ExpandImportExportMenuCreator = require('../actionCreators/ExpandImportExportMenuCreator.js')

const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

class ImportExportMenu extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)
  }

  controlRect() {
    return <rect 
      x={ 0 } 
      y= { WorkspaceComputations.importExportMenuY(this.props.viewport) } 
      width={ 5} 
      height={ 16 }
      fill = '#666666'
    />
  }

  onClick(e) {
    e.preventDefault()
  }

  showText() {
    let expandedSign = '+'
    if(this.props.expandImportExportMenu) {
      expandedSign = '-'
    }
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','importExportTextLabelYOffset']) } 
      className = 'selectableDropdown'> 
      <tspan> {Tr.getIn(['importExportMenu', 'imports', this.props.language])} </tspan>
      <tspan className = 'bodyText'> 
        {Tr.getIn(['importExportMenu', 'and', this.props.language])} </tspan> 
      <tspan className = 'selectableDropdown'> 
        {Tr.getIn(['importExportMenu', 'exports', this.props.language])}
      </tspan>   
      <tspan onClick = {this.onClick}> {expandedSign} </tspan>
    </text>
    </g>
  }

  expandedMenu() {
    if(!this.props.expandImportExportMenu) {
      return null
    }
    return <g><text x = { Constants.getIn(['menuBar','textLabelOffset']) } 
      y = { WorkspaceComputations.importExportMenuY(this.props.viewport) 
        + Constants.getIn(['menuBar','importExportTextLabelYOffset']) + 0 } 
      className = 'bodyText'> 
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 }  
        dy="1.2em"> {Tr.getIn(['importExportMenu', 'importsOnly', this.props.language])} </tspan>
      <tspan x = { Constants.getIn(['menuBar','textLabelOffset']) + 12 }  
        dy="1.2em"> 
        {Tr.getIn(['importExportMenu', 'exportsOnly', this.props.language])}
      </tspan>   
    </text>
    </g>
  }

  render() {
    return <g> 
      {this.showText()}
      {this.controlRect()}
      {this.expandedMenu()}</g>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language,
    expandImportExportMenu: state.expandImportExportMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(ExpandImportExportMenuCreator())
    }
  }

}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ImportExportMenu)