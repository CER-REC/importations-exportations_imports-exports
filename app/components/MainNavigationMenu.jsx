const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')
const ExplanationDot = require('./ExplanationDot.jsx')

const SetVisualizationCreator = require('../actionCreators/SetVisualizationCreator.js')

require('./MainNavigationMenu.scss')

class MainNavigationMenu extends React.Component {
  explanationDot() {
    const xPosition = '125'
    return (<ExplanationDot
      key="mainNavDot"
      xPosition={xPosition}
      yPosition={WorkspaceComputations.topHeightMargin() - Constants.getIn(['explanationDot', 'yOffset'])}
    />)
  }

  render() {
    return (<g><MenuBarOption
      key="mainNavigationMenu"
      yaxis={WorkspaceComputations.topHeightMargin()}
      options={Constants.get('visualizationTypes')}
      onOptionClick={this.props.setImportExportVisualization.bind(this)}
      selectedOption={this.props.importExportVisualization}
      optionXaxisPadding={Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding={Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey="mainMenuBar"
      color={Constants.getIn(['mainNavigationMenu', 'color'])}
      lineWidth={Constants.getIn(['mainNavigationMenu', 'lineWidth'])}
      language={this.props.language}
    />
      {this.explanationDot()}
            </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  importExportVisualization: state.importExportVisualization,
  language: state.language,
})
const mapDispatchToProps = dispatch => ({
  setImportExportVisualization(importExportVisualization) {
    dispatch(SetVisualizationCreator(importExportVisualization))
  },
})
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MainNavigationMenu)
