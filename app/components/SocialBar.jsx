import React from 'react'
import { connect } from 'react-redux'
import Request from 'client-request/promise'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import RouteComputations from '../computations/RouteComputations'

import Constants from '../Constants'
import Tr from '../TranslationTable'
import WorkspaceComputations from '../computations/WorkspaceComputations'
import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'

import { ExpandSocialBar } from '../actions/socialBar'

import { OpenModal } from '../actions/modal'

import './SocialBar.scss'

class SocialBar extends React.Component {
  static get propTypes() {
    return {
      language: PropTypes.string.isRequired,
      viewport: PropTypes.instanceOf(Immutable.Map).isRequired,

    }
  }

  static get defaultProps() {
    return {
      tabIndex: Constants.getIn(['tabIndex', 'start', 'socialBar']),

    }
  }

  makeBitlyPromise() {
    const bitlyEndpoint = RouteComputations.bitlyEndpoint(this.props.language)
    const shortenUrl = RouteComputations.bitlyParameter(this.props.language)

    const options = {
      uri: `${bitlyEndpoint}?shortenUrl=${shortenUrl}`,
      json: true,
    }

    return Request(options)
      .then((response) => {
        // The server proxies our request through to Bitly. If our request
        // to our server succeeds but the one to bitly fails, the returned
        // object will detail the error

        // A reponse for a successful request to the bitly shortening service
        // is a JSON string like:
        // {
        //  "status_code": 200,
        //  "status_txt": "OK",
        //  "data": {
        //    "url": "http://bit.ly/2xzn2HN",
        //    "hash": "2xzn2HN",
        //    "global_hash": "46frEb",
        //    "long_url": "https://www.google.ca/",
        //    "new_hash": 1
        //  }
        // }

        if (response.body.status_code !== 200) {
          // throw new Error(response.body.status_txt)
          return Constants.get('appHost')
        }
        return response.body.data.url
      })
      .catch(() => Constants.get('appHost'))
  }

  greyBar() {
    return (<rect
      x={this.props.viewport.get('x') - Constants.getIn(['menuBar', 'barWidth'])}
      y={this.props.viewport.get('y') + Constants.getIn(['socialBar', 'topMargin'])}
      width={Constants.getIn(['menuBar', 'barWidth'])}
      height={Constants.getIn(['socialBar', 'height'])}
      fill="#666666"
    />)
  }

  controlArrow() {
    if (this.props.expandSocialBar) {
      return null
    }
    const transformControlArrow = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'controlArrowMargin'])} ${this.props.viewport.get('y') + Constants.getIn(['socialBar', 'controlArrowY'])}) scale(-2.5,2.5)`
    return (
      <polygon
        className="socialBarIcon"
        points="0 0 4.2 8 0 15.7 0 0"
        fill="#666"
        transform={transformControlArrow}
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.props.controlArrowClick)}
      />
    )
  }

  aboutThisProjectClick = () => {
    if (!this.props.expandSocialBar) { return this.props.controlArrowClick() }
    this.showAnalytics('about')
    this.props.onClick()
  }

  methodologyClick = () => {
    if (!this.props.expandSocialBar) { return this.props.controlArrowClick() }
    this.showAnalytics('methodology')
    const appRoot = RouteComputations.appRoot(this.props.language)
    window.open(`${appRoot}${Tr.getIn(['methodologyLinks', this.props.language])}`)
  }

  twitterClick = () => {
    this.showAnalytics('twitter')
    this.makeBitlyPromise().then((url) => {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
      window.open(twitterUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  emailClick = () => {
    const self = this
    self.showAnalytics('email')
    this.makeBitlyPromise().then((url) => {
      const emailBody = `${url}%0A%0A ${Tr.getIn(['shareEmail', 'body', self.props.language])}`

      const emailUrl = `mailto:?subject=${Tr.getIn(['shareEmail', 'subject', self.props.language])} &body= ${emailBody}`

      window.location.href = emailUrl
    })
  }

  facebookClick = () => {
    this.showAnalytics('facebook')
    this.makeBitlyPromise().then((url) => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(facebookUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  linkedInClick = () => {
    this.showAnalytics('linkedIn')
    this.makeBitlyPromise().then((url) => {
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`
      window.open(linkedinUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  downloadDataClick = () => {
    if (!this.props.expandSocialBar) { return this.props.controlArrowClick() }
    this.showAnalytics('download data')
    this.props.dataDownloadClick()
  }

  shareIcon() {
    const viewPort = WorkspaceComputations.socialBarY(this.props.viewport) || 0
    if (this.props.expandSocialBar) { return }
    return (<image
      className="socialBarIcon"
      height={Constants.getIn(['socialBar', 'iconSize'])}
      width={Constants.getIn(['socialBar', 'iconSize'])}
      y={viewPort + Constants.getIn(['socialBar', 'shareIconMargin'], 0)}
      xlinkHref="images/share.svg"
      {...handleInteractionWithTabIndex(this.props.tabIndex, this.props.controlArrowClick)}
    />)
  }

  icons() {
    let transformSocialBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'iconMarginY'])}, 0)`
    let rectWidth = `${Constants.getIn(['socialBar', 'width'])}`
    let rectXPosition = `${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) - Constants.getIn(['menuBar', 'barWidth'])}`
    if (this.props.expandSocialBar && this.props.language === 'en') {
      rectWidth = `${Constants.getIn(['socialBar', 'width']) + Constants.getIn(['socialBar', 'expandedWidth'])}`
      rectXPosition = `${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'expandedWidth'])}`
      transformSocialBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'expandedIconX'])}, 0)`
    }
    if (this.props.expandSocialBar && this.props.language === 'fr') {
      rectWidth = `${Constants.getIn(['socialBar', 'width']) + Constants.getIn(['socialBar', 'expandedWidthFr'])}`
      rectXPosition = `${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) - Constants.getIn(['socialBar', 'expandedWidthFr'])}`
      transformSocialBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'expandedIconXFr'])}, 0)`
    }
    const viewPort = WorkspaceComputations.socialBarY(this.props.viewport) || 0
    return (
      <g
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.props.controlArrowClick)}
      >
        <rect
          x={rectXPosition}
          y={WorkspaceComputations.socialBarY(this.props.viewport)}
          width={rectWidth}
          height={Constants.getIn(['socialBar', 'height'])}
          fill="#e6e6e6"
        />
        <g transform={transformSocialBarIcons}>
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            xlinkHref="images/info_about.svg"
            y={viewPort + Constants.getIn(['menuBar', 'barWidth'], 0)}
            {...handleInteractionWithTabIndex(this.props.tabIndex, this.aboutThisProjectClick)}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            xlinkHref="images/info_methodology.svg"
            y={viewPort + Constants.getIn(['socialBar', 'iconMargin'], 0)}
            {...handleInteractionWithTabIndex(this.props.tabIndex, this.methodologyClick)}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            y={viewPort + Constants.getIn(['socialBar', 'downloadDataIconMargin'], 0)}
            xlinkHref="images/download_file.svg"
            {...handleInteractionWithTabIndex(this.props.tabIndex, this.downloadDataClick)}
          />
          {this.shareIcon()}
        </g>
      </g>
    )
  }

  expandedMenu() {
    let iconTransformString = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'iconX'])} ${this.props.viewport.get('y') + Constants.getIn(['socialBar', 'iconY'])})`
    let twitterX = Constants.getIn(['socialBar', 'twitterMargin'])
    let facebookX = Constants.getIn(['socialBar', 'facebookMargin'])
    let linkedinX = Constants.getIn(['socialBar', 'linkedinMargin'])
    if (!this.props.expandSocialBar) {
      return null
    }
    if (this.props.language === 'fr') {
      iconTransformString = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'iconX']) - 61} ${this.props.viewport.get('y') + Constants.getIn(['socialBar', 'iconY'])})`
      twitterX = Constants.getIn(['socialBar', 'twitterMargin']) + 14
      facebookX = Constants.getIn(['socialBar', 'facebookMargin']) + 34
      linkedinX = Constants.getIn(['socialBar', 'linkedinMargin']) + 58
    }
    return (<g transform={iconTransformString}>
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={0}
        x={0}
        xlinkHref="images/sm_email.svg"
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.emailClick)}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={0}
        xlinkHref="images/sm_twitter.svg"
        x={twitterX}
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.twitterClick)}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={0}
        xlinkHref="images/sm_facebook.svg"
        x={facebookX}
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.facebookClick)}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={0}
        xlinkHref="images/sm_linkedin.svg"
        x={linkedinX}
        {...handleInteractionWithTabIndex(this.props.tabIndex, this.linkedInClick)}
      />
            </g>)
  }

  menuText() {
    const transformString = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'expandedWidth'])} ${this.props.viewport.get('y') + Constants.getIn(['socialBar', 'iconTextY'])})`
    if (!this.props.expandSocialBar) {
      return null
    }
    let aboutTextX = '0.0em'
    let methodologyTextX = '-2.6em'
    let downloadDataTextX = '-5.6em'
    if (this.props.language === 'fr') {
      aboutTextX = '-4.5em'
      methodologyTextX = '-3.8em'
      downloadDataTextX = '-5.9em'
    }
    return (<g transform={transformString}>
      <text className="socialBarText">
        <tspan dx={aboutTextX} dy="0.1em" {...handleInteractionWithTabIndex(this.props.tabIndex, this.aboutThisProjectClick)}> {Tr.getIn(['socialBarText', 'about', this.props.language])}</tspan>
        <tspan dx={methodologyTextX} dy="1.8em" {...handleInteractionWithTabIndex(this.props.tabIndex, this.methodologyClick)}> {Tr.getIn(['socialBarText', 'methodology', this.props.language])}</tspan>
        <tspan dx={downloadDataTextX} dy="1.8em" {...handleInteractionWithTabIndex(this.props.tabIndex, this.downloadDataClick)}> {Tr.getIn(['socialBarText', 'downloadData', this.props.language])}</tspan>
      </text>
    </g>)
  }

  showAnalytics(text) {
    const eventDetail = text
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'socialBar']),
      Constants.getIn(['analytics', 'action', 'clicked']),
      eventDetail,
    )
  }

  render() {
    let translate = '0 0'
    if (this.props.viewport.get('changeHeightRatio') < 1.2) {
      translate = '0 35'
    }
    return (<g transform={`translate(${translate})`}>
      {this.controlArrow()}
      {this.icons()}
      {this.greyBar()}
      {this.expandedMenu()}
      {this.menuText()}
    </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
  expandSocialBar: state.expandSocialBar,
})

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(OpenModal('about'))
  },
  controlArrowClick() {
    dispatch(ExpandSocialBar())
  },
  dataDownloadClick() {
    dispatch(OpenModal('dataDownload'))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(SocialBar)
