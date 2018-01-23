const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const MenuBarOption = require('./MenuBarOption.jsx')
const ExplanationDot = require('./ExplanationDot.jsx')

const SetVisualizationCreator = require('../actionCreators/SetVisualizationCreator.js')

require('./MainNavigationMenu.scss')

const explanationDot = () => {
  const xPosition = 125
  return (<ExplanationDot
    key="mainNavDot"
    xPosition={xPosition}
    yPosition={WorkspaceComputations.topHeightMargin() - Constants.getIn(['explanationDot', 'yOffset'])}
  />)
}

const MainNavigationMenu = props => (
  <g>
    <MenuBarOption
      key="mainNavigationMenu"
      yaxis={WorkspaceComputations.topHeightMargin()}
      options={Constants.get('visualizationTypes')}
      onOptionClick={props.setImportExportVisualization}
      selectedOption={props.importExportVisualization}
      optionXaxisPadding={Constants.getIn(['menuBarOptions', 'optionXaxisPadding'])}
      optionPadding={Constants.getIn(['menuBarOptions', 'optionPadding'])}
      trKey="mainMenuBar"
      color={Constants.getIn(['mainNavigationMenu', 'color'])}
      lineWidth={Constants.getIn(['mainNavigationMenu', 'lineWidth'])}
      language={props.language}
    />
    {explanationDot()}
  </g>
)

MainNavigationMenu.propTypes = {
  setImportExportVisualization: PropTypes.func.isRequired,
  importExportVisualization: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
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
