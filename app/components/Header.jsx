import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import Constants from '../Constants'
import { OpenModal as ShowAboutWindowCreator } from '../actions/modal'
import { handleInteraction } from '../utilities'
import TrSelector from '../selectors/translate'

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
    this.aboutThisProjectClick = this.aboutThisProjectClick.bind(this)
    this.methodologyClick = this.methodologyClick.bind(this)
    this.resetClick = this.resetClick.bind(this)
  }

  aboutThisProjectClick() { // eslint-disable-line class-methods-use-this
    this.props.onClick()
  }

  methodologyClick() { // eslint-disable-line class-methods-use-this
    // TODO: add methodology click functionality
  }

  resetClick() { // eslint-disable-line class-methods-use-this
    // TODO: add reset visualization functionality
  }

  leftHeading() {
    const { Tr } = this.props
    return (
      <div className="leftHeader">
        <div className="headingImports">
          {Tr(['mainHeading', 'imports'])}
        </div>&nbsp;
        <div className="headingBase" >
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

  metaBar() {
    const { Tr } = this.props
    const transformMetaBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['metaBar', 'iconMargin'])}, 0)`

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
            {...handleInteraction(this.resetClick)}
            y={Constants.getIn(['metaBar', 'resetTextY'])}
            x={this.props.viewport.get('x') - Constants.getIn(['metaBar', 'resetTextOffset'])}
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
            xlinkHref="images/info_about.svg"
            y={Constants.getIn(['metaBar', 'aboutThisProjectIconMargin'])}
            {...handleInteraction(this.aboutThisProjectClick)}
            aria-label={Tr(['socialBar', 'aboutThisProject'])}
            role="menuitem"
          />

          <image
            className="metaBarButton"
            height={Constants.getIn(['metaBar', 'iconSize'])}
            width={Constants.getIn(['metaBar', 'iconSize'])}
            xlinkHref="images/info_methodology.svg"
            y={Constants.getIn(['metaBar', 'methodologyIconMargin'])}
            {...handleInteraction(this.methodologyClick)}
            aria-label={Tr(['socialBar', 'methodology'])}
            role="menuitem"
          />

          <image
            className="metaBarButton"
            height={Constants.getIn(['metaBar', 'iconSize'])}
            width={Constants.getIn(['metaBar', 'iconSize'])}
            xlinkHref="images/reset.svg"
            {...handleInteraction(this.resetClick)}
            y={Constants.getIn(['metaBar', 'resetIconMargin'])}
            aria-label={Tr(['socialBar', 'resetVisualization'])}
            role="menuitem"
          />
        </g>
      </svg>
    )
  }


  render() {
    return (<div style={{ height: Constants.get('topHeightMargin') }}>
      {this.leftHeading()}
      {this.metaBar()}
    </div>)
  }
}


const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  Tr: TrSelector(state, props),
})

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(ShowAboutWindowCreator('about'))
  },
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header)
