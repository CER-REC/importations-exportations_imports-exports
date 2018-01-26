import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import WorkspaceComputations from '../computations/WorkspaceComputations'

import MenuBarOption from './MenuBarOption'
import ExplanationDot from './ExplanationDot'

import SetVisualizationCreator from '../actionCreators/SetVisualizationCreator'

import './MainNavigationMenu.scss'

class MainNavigationMenu extends React.Component {
  explanationDot() {
    const xPosition = 75
    return (<g><ExplanationDot
      key="mainNavDot"
      xPosition={xPosition}
      yPosition={92}
    />
    <use xlinkHref="#back" x={85} y={92} /> </g>)
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
    expandImportExportMenu: state.expandImportExportMenu,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setImportExportVisualization(importExportVisualization) {
      dispatch(SetVisualizationCreator(importExportVisualization))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainNavigationMenu)
