const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')
const ExplanationDot = require('./ExplanationDot.jsx')

const SetVisualizationCreator = require('../actionCreators/SetVisualizationCreator.js')

require('./MainNavigationMenu.scss')

class MainNavigationMenu extends React.Component {

  controlArrowImage() {
    let arrowYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['mainNavigationMenu','menuYPadding']) }`
    let textPosition = `${ Constants.getIn(['mainNavigationMenu','textYPosition']) }`
    if(this.props.expandImportExportMenu) {
      arrowYPosition = `${ WorkspaceComputations.importExportMenuY(this.props.viewport) + 
          Constants.getIn(['mainNavigationMenu','menuYPadding']) + 30 }`
      textPosition = `${ Constants.getIn(['mainNavigationMenu','textYPosition']) + 30}`
    }
    return <g><image
      height = { Constants.getIn(['menuBar','controlArrowSize']) }
      width = { Constants.getIn(['menuBar','controlArrowSize']) }
      x = { 0 }
      y = { arrowYPosition }
      xlinkHref = 'images/control_arrow.svg'
    />
    <text x = { Constants.getIn(['menuBar','textLabelOffset']) }
      y = { textPosition } className = 'bodyText'>
      { Tr.getIn(['nglSubproductMenu','of',this.props.language]) }
    </text>
    </g>
  }

  explanationDot() {
    const xPosition = '155'
    return <ExplanationDot
      key = 'mainNavDot' 
      xPosition = {xPosition}
      yPosition = {WorkspaceComputations.topHeightMargin() - Constants.getIn(['explanationDot','yOffset'])}
    />
  }

  render() {
    if(this.props.expandImportExportMenu) {
      return <g><MenuBarOption 
        key='mainNavigationMenu'
        yaxis ={WorkspaceComputations.topHeightMargin() + 49}
        options = {Constants.get('visualizationTypes')}
        onOptionClick = {this.props.setImportExportVisualization.bind(this)}
        selectedOption = {this.props.importExportVisualization}
        optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
        optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
        trKey = 'mainMenuBar' 
        color = {Constants.getIn(['mainNavigationMenu', 'color'])}
        language = {this.props.language}
      />
      {this.controlArrowImage()}
      {this.explanationDot()}
      </g>
    } else {
      return <g><MenuBarOption 
        key='mainNavigationMenu'
        yaxis ={WorkspaceComputations.topHeightMargin() + 18}
        options = {Constants.get('visualizationTypes')}
        onOptionClick = {this.props.setImportExportVisualization.bind(this)}
        selectedOption = {this.props.importExportVisualization}
        optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
        optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
        trKey = 'mainMenuBar' 
        color = {Constants.getIn(['mainNavigationMenu', 'color'])}
        language = {this.props.language}
      />
      {this.controlArrowImage()}
      {this.explanationDot()}
      </g>
    }
  }

}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization,
    language: state.language,
    expandImportExportMenu: state.expandImportExportMenu
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setImportExportVisualization(importExportVisualization) {
      dispatch(SetVisualizationCreator(importExportVisualization))
    }
  }
}
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MainNavigationMenu)