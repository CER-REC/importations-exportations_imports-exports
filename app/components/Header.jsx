import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import { OpenModal as ShowAboutWindowCreator } from '../actions/modal'
import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'
import TrSelector from '../selectors/translate'

import ExplanationDot from './ExplanationDot'
import tr from '../TranslationTable'
import { resetVisualization } from '../actions/visualizationSettings'

import './Header.scss'
import '../styles/Fonts.scss'
import '../styles/Colours.scss'

class Header extends React.Component {
  static get propTypes() {
    return {
      language: PropTypes.string.isRequired,
      viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
    }
  }

  resetClick = () => {
    this.props.onResetClick()
    this.showAnalytics('reset')
  }
  showAnalytics(text) {
    const eventDetail = (text === 'reset') ? ('reset') : ('CANSIM')
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'headerLinks']),
      Constants.getIn(['analytics', 'action', 'clicked']),
      eventDetail,
    )
  }
  resetExplanation() {
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 910 : 710
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 65 : 50
    let textString = `${this.props.Tr(['explanations', 'reset'])}`
    let dotName = 'electricityTitleExplanation'
    if (this.props.selectedEnergy === 'crudeOilImports') {
      textString = `${this.props.Tr(['explanations', 'resetCrudeOilImports'])}`
      dotName = 'crudeOilImportsTitleExplanation'
    }
    if (this.props.selectedEnergy === 'crudeOilExports') {
      textString = `${this.props.Tr(['explanations', 'resetCrudeOilExports'])}`
      dotName = 'crudeOilExportsTitleExplanation'
    }
    if (this.props.selectedEnergy === 'naturalGas') {
      textString = `${this.props.Tr(['explanations', 'resetNaturalGas'])}`
      dotName = 'naturalGasTitleExplanation'
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.Tr(['explanations', 'resetNaturalGasLiquids'])}`
      dotName = 'naturalGasLiquidsTitleExplanation'
    }
    if (this.props.selectedEnergy === 'refinedPetroleumProducts') {
      textString = `${this.props.Tr(['explanations', 'resetRefinedPetroleumProducts'])}`
      dotName = 'refinedPetroleumProductsTitleExplanation'
    }
    return (
      <svg
        width={this.props.viewport.get('x')}
        height={Constants.get('topHeightMargin')}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <ExplanationDot
          scale="scale(1)"
          lineStroke="1"
          textBoxWidth={230}
          linePath=""
          xPosition={scaleContainerX}
          yPosition={scaleContainerY}
          lineX={142.16}
          lineY={173}
          textX={-100}
          textY={-58}
          containerX={100}
          containerY={0}
          name={dotName}
          text={textString}
        />
      </svg>
    )
  }

  leftHeading() {
    const { Tr } = this.props
    const energyType = this.props.selectedEnergy
    const importsColour = (energyType === 'crudeOilExports' || energyType === 'refinedPetroleumProducts')
      ? '#DCDCDC'
      : ' '
    const subheading = (energyType === 'crudeOilImports')
      ? Tr(['mainSubheadingCrudeOilImports'])
      : Tr(['mainSubheading'])
    const exportsColour = (energyType === 'crudeOilImports')
      ? '#DCDCDC'
      : ' '
    const offColour = (energyType === 'crudeOilImports' || energyType === 'crudeOilExports' || energyType === 'refinedPetroleumProducts')
      ? '#DCDCDC'
      : ''
    return (
      <div className="leftHeader">
        <div className="headingImports" style={{ color: importsColour }}>
          {Tr(['mainHeading', 'imports'])}
        </div>&nbsp;
        <div className="headingBase" style={{ color: offColour }}>
          {Tr(['mainHeading', 'ampersand'])}
        </div>&nbsp;
        <div className="headingExports" style={{ color: exportsColour }}>
          {Tr(['mainHeading', 'exports'])}
        </div>&nbsp;
        <div className="headingBase">
          {Tr(['mainHeading', 'base'])}
        </div>
        <p className="subheading">
          { subheading }
        </p>
      </div>
    )
  }

  refinedPetroleumProductsImportsLink = () => {
    const { Tr, language } = this.props
    const energyType = this.props.selectedEnergy
    if (energyType !== 'refinedPetroleumProducts') { return null }
    if (language === 'fr') {
      return (
        <div className="importsLink">
          <div className="importsSubheading">
            {Tr(['mainHeading', 'base_1'])} {Tr(['mainHeading', 'base_1_5_refinedPetroleumProducts'])}
            <div className="importsSubheadingEnergy">{ Tr(['mainHeading', 'refinedPetroleumProducts']) }</div>
            {Tr(['mainHeading', 'base_2'])}{Tr(['mainHeading', 'base_2_5_refinedPetroleumProducts'])}
            <a href={Tr(['mainHeading', 'refinedPetroleumProductsLink_04'])} onClick={this.showAnalytics}>{Tr(['mainHeading', 'refinedPetroleumProductsStats_04'])}</a>
            {Tr(['mainHeading', 'deCansim'])}{Tr(['mainHeading', 'closingBracket'])}
          </div>
        </div>)
    }
    return (
      <div className="importsLink">
        <div className="importsSubheading">
          {Tr(['mainHeading', 'base_1'])}
          <div className="importsSubheadingEnergy">
            { Tr(['mainHeading', 'refinedPetroleumProducts']) }
          </div>
          {Tr(['mainHeading', 'base_2'])}{Tr(['mainHeading', 'base_2_5_refinedPetroleumProducts'])}
          <a
            href={Tr(['mainHeading', 'refinedPetroleumProductsLink_04'])}
            onClick={this.showAnalytics}
          >{Tr(['mainHeading', 'refinedPetroleumProductsStats_04'])}
          </a>
          {Tr(['mainHeading', 'closingBracket'])}
        </div>
      </div>)
  }

  metaBar() {
    const { Tr } = this.props
    const tabIndex = Constants.getIn(['tabIndex', 'start', 'menuBar'])
    const transformMetaBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'iconMargin'])}, 0)`
    let resetX = `${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'resetTextOffset'])}`
    if (this.props.language === 'fr') {
      resetX = `${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'resetTextOffset']) - 55}`
    }
    return (
      <svg
        className="metaBar"
        width={this.props.viewport.get('x')}
        height={Constants.get('topHeightMargin')}
      >
        <rect
          width={Constants.getIn(['metaBar', 'width'])}
          height={Constants.getIn(['metaBar', 'height'])}
          x={this.props.viewport.get('x') - Constants.getIn(['metaBar', 'width'])}
          className="metaBarBackground"
        />
        <g>
          <text
            className="resetLabel"
            {...handleInteractionWithTabIndex(tabIndex, this.resetClick)}
            y={Constants.getIn(['metaBar', 'resetTextY'])}
            x={resetX}
            aria-label={Tr(['socialBar', 'resetVisualization'])}
            role="menuitem"
          >{Tr('resetLabel')}
          </text>
        </g>

        <g transform={transformMetaBarIcons} >

          <image
            className="metaBarButton"
            height={Constants.getIn(['metaBar', 'iconSize'])}
            width={Constants.getIn(['metaBar', 'iconSize'])}
            xlinkHref="images/reset.svg"
            {...handleInteractionWithTabIndex(tabIndex, this.resetClick)}
            y={Constants.getIn(['metaBar', 'resetIconMargin'])}
            aria-label={Tr(['socialBar', 'resetVisualization'])}
            role="menuitem"
          />
        </g>
      </svg>
    )
  }


  render() {
    return (
      <div style={{ height: Constants.get('topHeightMargin'), marginBottom: 20 }}>
        {this.leftHeading()}
        {this.metaBar()}
        {this.resetExplanation()}
        <br />
        {this.refinedPetroleumProductsImportsLink()}
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  selectedEnergy: state.importExportVisualization,
  Tr: TrSelector(state, props),
})


const mapDispatchToProps = dispatch => ({
  onClick() { dispatch(ShowAboutWindowCreator('about')) },
  onResetClick() { dispatch(resetVisualization()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
