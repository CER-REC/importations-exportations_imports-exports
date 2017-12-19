const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')

const SetVisualizationCreator = require('../actionCreators/SetVisualizationCreator.js')

require('./MainNavigationMenu.scss')

class MainNavigationMenu extends React.Component {
  render() {
    return <MenuBarOption 
      key='mainNavigationMenu'
      yaxis ={WorkspaceComputations.topHeightMargin()}
      options = {Constants.get('visualizationTypes')}
      onOptionClick = {this.props.setImportExportVisualization.bind(this)}
      selectedOption = {this.props.importExportVisualization}
      optionXaxisPadding = {Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding = {Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey = 'mainMenuBar' 
      color = {Constants.getIn(['mainNavigationMenu', 'color'])}
      lineWidth = {Constants.getIn(['mainNavigationMenu', 'lineWidth'])}
      language = {this.props.language}
    />
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    importExportVisualization: state.importExportVisualization,
    language: state.language
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