import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import { OpenModal as ShowAboutWindowCreator } from '../actions/modal'
import { handleInteractionWithTabIndex } from '../utilities'
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

  constructor(props) {
    super(props)
    this.resetClick = this.resetClick.bind(this)
  }

  resetClick() {
    this.props.onResetClick()
  }

  resetExplanation() {
    let textString = `${this.props.Tr(['explanations','reset'])}`
    let dotName = 'electricityTitleExplanation'
    if (this.props.selectedEnergy === 'crudeOil') {
      textString = `${this.props.Tr(['explanations','resetCrudeOil'])}`
      dotName = 'crudeOilTitleExplanation'
    }
    if (this.props.selectedEnergy === 'naturalGas') {
      textString = `${this.props.Tr(['explanations','resetNaturalGas'])}`
      dotName = 'naturalGasTitleExplanation'
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.Tr(['explanations','resetNaturalGasLiquids'])}`
      dotName = 'naturalGasLiquidsTitleExplanation'
    }
    if (this.props.selectedEnergy === 'refinedPetroleumProducts') {
      textString = `${this.props.Tr(['explanations','resetRefinedPetroleumProducts'])}`
      dotName = 'refinedPetroleumProductsTitleExplanation'
    }
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={250}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H423.2"
        xPosition={800}
        yPosition={57}
        lineX={142.16}
        lineY={173}
        textX={40}
        textY={58}
        containerX={0}
        containerY={-70}
        name={dotName}
        text={textString}
    /></g>)
  }

  leftHeading() {
    const { Tr } = this.props
    const energyType = this.props.selectedEnergy
    let color = (energyType === 'crudeOil' || energyType === 'refinedPetroleumProducts')
      ? '#DCDCDC'
      : ' '
    return (
      <div className="leftHeader">
        <div className="headingImports" style={{ color: color }}>
          {Tr(['mainHeading', 'imports'])}
        </div>&nbsp;
        <div className="headingBase" style={{ color: color }}>
          {Tr(['mainHeading', 'ampersand'])}
        </div>&nbsp;
        <div className="headingExports">
          {Tr(['mainHeading', 'exports'])}
        </div>&nbsp;
        <div className="headingBase">
          {Tr(['mainHeading', 'base'])}
        </div>
        <p className="subheading">
          {Tr(['mainSubheading'])}
        </p>
      </div>
    )
  }

  crudeOilImportsLink() {
    const { Tr } = this.props
    const language = this.props.language
    const energyType = this.props.selectedEnergy
    if (energyType !== 'crudeOil') { return }
    if (language === 'fr') {
      return (<div className="importsLink">
        <div className="importsSubheading">
          {Tr(['mainHeading', 'base_1'])} {Tr(['mainHeading', 'base_1_5_crude'])}&nbsp;
          <div className="importsSubheadingEnergy">{ Tr(['mainHeading', 'crudeOil']) }&nbsp;</div>
          {Tr(['mainHeading', 'base_2'])} {Tr(['mainHeading', 'base_2_5_crude'])}&nbsp;
          <a href={Tr(['mainHeading', 'crudeOilStatsLink_01'])}>{Tr(['mainHeading', 'crudeOilStats_01'])}</a>&nbsp;
          {Tr(['mainHeading', 'and'])}&nbsp;
          <a href={Tr(['mainHeading', 'crudeOilStatsLink_03'])}>{Tr(['mainHeading', 'crudeOilStats_03'])}</a>&nbsp;
          {Tr(['mainHeading', 'deCansim'])}&nbsp;{Tr(['mainHeading', 'closingBracket'])}
        </div>
      </div>)
    }
    return (<div className="importsLink">
      <div className="importsSubheading">
        {Tr(['mainHeading', 'base_1'])}&nbsp;
        <div className="importsSubheadingEnergy">{ Tr(['mainHeading', 'crudeOil']) }&nbsp;</div>
        {Tr(['mainHeading', 'base_2'])}&nbsp;
        <a href={Tr(['mainHeading', 'crudeOilStatsLink_01'])}>{Tr(['mainHeading', 'crudeOilStats_01'])}</a>&nbsp;
        {Tr(['mainHeading', 'and'])}&nbsp;
        <a href={Tr(['mainHeading', 'crudeOilStatsLink_03'])}>{Tr(['mainHeading', 'crudeOilStats_03'])}</a>&nbsp;
        {Tr(['mainHeading', 'closingBracket'])}
      </div>
    </div>)
  }

  refinedPetroleumProductsImportsLink() {
    const { Tr } = this.props
    const language = this.props.language
    const energyType = this.props.selectedEnergy
    if (energyType !== 'refinedPetroleumProducts') { return }
    if (language === 'fr') {
      return (<div className="importsLink">
        <div className="importsSubheading">
          {Tr(['mainHeading', 'base_1'])} {Tr(['mainHeading', 'base_1_5_refinedPetroleumProducts'])}&nbsp;
          <div className="importsSubheadingEnergy">{ Tr(['mainHeading', 'refinedPetroleumProducts']) }&nbsp;</div>
          {Tr(['mainHeading', 'base_2'])} {Tr(['mainHeading', 'base_2_5_refinedPetroleumProducts'])}&nbsp;
          <a href={Tr(['mainHeading', 'refinedPetroleumProductsLink_04'])}>{Tr(['mainHeading', 'refinedPetroleumProductsStats_04'])}</a>&nbsp;
          {Tr(['mainHeading', 'deCansim'])}&nbsp;{Tr(['mainHeading', 'closingBracket'])}
        </div>
      </div>)
    }
      return (<div className="importsLink">
          <div className="importsSubheading">
            {Tr(['mainHeading', 'base_1'])}&nbsp;
            <div className="importsSubheadingEnergy">
              { Tr(['mainHeading', 'refinedPetroleumProducts']) }&nbsp;
            </div>
            {Tr(['mainHeading', 'base_2'])}&nbsp;        
          <a href={Tr(['mainHeading', 'refinedPetroleumProductsLink_04'])}>{Tr(['mainHeading', 'refinedPetroleumProductsStats_04'])}</a>&nbsp;
            {Tr(['mainHeading', 'closingBracket'])}
        </div>
      </div>)
  }

  metaBar() {
    const { Tr } = this.props
    const tabIndex = Constants.getIn(['tabIndex','start', 'menuBar'])
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
            {this.resetExplanation()}
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
    if (this.props.screenshot) {
      return (<div style={{ height: Constants.get('topHeightMargin') }}>
        {this.leftHeading()}
        {this.crudeOilImportsLink()}
        {this.refinedPetroleumProductsImportsLink()}
      </div>)
    }
    return (<div style={{ height: Constants.get('topHeightMargin') }}>
      {this.leftHeading()}
      {this.metaBar()}
      {this.crudeOilImportsLink()}
      {this.refinedPetroleumProductsImportsLink()}
    </div>)
  }
}


const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  selectedEnergy: state.importExportVisualization,
  screenshot: state.screenshot,
  Tr: TrSelector(state, props),
})


const mapDispatchToProps = dispatch => ({
  onClick() {dispatch(ShowAboutWindowCreator('about'))},
  onResetClick(){dispatch(resetVisualization())},
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
