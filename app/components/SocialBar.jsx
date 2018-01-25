const React = require('react')
const ReactRedux = require('react-redux')
const Request = require('client-request/promise')
const PropTypes = require('prop-types')
const Immutable = require('immutable')

const RouteComputations = require('../computations/RouteComputations.js')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

const ExpandSocialBar = require('../actions/socialBar.js').ExpandSocialBar

const ShowAboutWindowCreator = require('../actions/modal.js').OpenModal

require('./SocialBar.scss')

class SocialBar extends React.Component {
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
    this.twitterClick = this.twitterClick.bind(this)
    this.emailClick = this.emailClick.bind(this)
    this.facebookClick = this.facebookClick.bind(this)
    this.linkedInClick = this.linkedInClick.bind(this)
    this.downloadImageClick = this.downloadImageClick.bind(this)
    this.downloadDataClick = this.downloadDataClick.bind(this)
    this.controlArrowClick = this.controlArrowClick.bind(this)
  }

  makeBitlyPromise() {
    const bitlyEndpoint = RouteComputations.bitlyEndpoint(document.location, this.props.language)
    const shortenUrl = RouteComputations.bitlyParameter(document.location, this.props.language)

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
      x={this.props.viewport.get('x') - 5}
      y={this.props.viewport.get('y') + 120}
      width={ Constants.getIn(['menuBar','barWidth'])}
      height={125}
      fill="#666666"
    />)
  }

  controlArrow() {
    if(this.props.expandSocialBar) {
      return null
    }
    const transformControlArrow = `translate(${this.props.viewport.get('x') - 30} ${this.props.viewport.get('y') + 137}) scale(-1,1)`
    return <image
      className='socialBarIcon'
      height={40}
      transform={transformControlArrow}
      xlinkHref='images/control_arrow.svg'
      onClick={this.controlArrowClick}
    />
  }

  controlArrowClick() {
    this.props.controlArrowClick()
  }

  aboutThisProjectClick() { 
    this.props.onClick()
  }

  methodologyClick() { // eslint-disable-line class-methods-use-this
    // TODO: add methodology click functionality
  }

  twitterClick() {
    this.makeBitlyPromise().then((url) => {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
      window.open(twitterUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  emailClick() {
    const self = this
    this.makeBitlyPromise().then((url) => {
      const emailBody = `${url}%0A%0A ${Tr.getIn(['shareEmail', 'body', self.props.language])}`

      const emailUrl = `mailto:?subject=${Tr.getIn(['shareEmail', 'subject', self.props.language])} &body= ${emailBody}`

      window.location.href = emailUrl
    })
  }

  facebookClick() {
    this.makeBitlyPromise().then((url) => {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(facebookUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  linkedInClick() {
    this.makeBitlyPromise().then((url) => {
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`
      window.open(linkedinUrl, 'targetWindow', 'width=650,height=650')
    })
  }

  downloadImageClick() {
    // TODO
    const TODO = 100
    const screenshotUrl = `${RouteComputations.screenshotOrigin(document.location)}/${Constants.get('screenshotPath')}/?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${TODO}&height=${TODO}`

    window.open(screenshotUrl)
  }

  downloadDataClick() {
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    window.open(`${appRoot}data/${fileName}`, 'data:text/csv;charset=utf-8,data/')
  }


  icons() {
    let transformSocialBarIcons = `translate(${this.props.viewport.get('x') - 24}, 0)`
    let rectWidth = `${Constants.getIn(['socialBar','width'])}`
    let rectXPosition = `${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) - 5}`
    if(this.props.expandSocialBar) {
      rectWidth = `${Constants.getIn(['socialBar','width']) + 110}`
      rectXPosition = `${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'width']) - 110}`
      transformSocialBarIcons = `translate(${this.props.viewport.get('x') - 129}, 0)`
    }
    return (
      <svg>
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
            y={WorkspaceComputations.socialBarY(this.props.viewport) + 6}
            onClick={this.aboutThisProjectClick}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            xlinkHref="images/info_methodology.svg"
            y={WorkspaceComputations.socialBarY(this.props.viewport) + 30}
            onClick={this.methodologyClick}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            y={WorkspaceComputations.socialBarY(this.props.viewport) + 54}
            xlinkHref="images/download_file.svg"
            onClick={this.downloadDataClick}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            y={WorkspaceComputations.socialBarY(this.props.viewport) + 78}
            xlinkHref="images/download_image.svg"
            onClick={this.downloadImageClick}
          />
          <image
            className="socialBarIcon"
            height={Constants.getIn(['socialBar', 'iconSize'])}
            width={Constants.getIn(['socialBar', 'iconSize'])}
            y={WorkspaceComputations.socialBarY(this.props.viewport) + 102}
            xlinkHref="images/share.svg"
          />
        </g>
      </svg>
    )
  }

  expandedMenu() {
    const iconTransformString = `translate(${this.props.viewport.get('x') - 103} ${this.props.viewport.get('y') + 223})`
    if(!this.props.expandSocialBar) {
      return null
    }
    return (<g transform={iconTransformString}>
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar', 'emailIconPadding'])}
        x={0}
        xlinkHref="images/sm_email.svg"
        onClick={this.emailClick}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar', 'twitterIconPadding'])}
        xlinkHref="images/sm_twitter.svg"
        x={22}
        onClick={this.twitterClick}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar', 'facebookIconPadding'])}
        xlinkHref="images/sm_facebook.svg"
        x={44}
        onClick={this.facebookClick}
      />
      <image
        className="socialBarIcon"
        height={Constants.getIn(['socialBar', 'iconSize'])}
        width={Constants.getIn(['socialBar', 'iconSize'])}
        y={WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar', 'linkedInIconPadding'])}
        xlinkHref="images/sm_linkedin.svg"
        x={66}
        onClick={this.linkedInClick}
      />
      </g>)
  }

  menuText() {
    const transformString = `translate(${this.props.viewport.get('x') - 110} ${this.props.viewport.get('y') + 137})`
    if(!this.props.expandSocialBar) {
      return null
    }
    return (<g transform={transformString}>
      <text className = 'socialBarText'>
      <tspan onClick={this.aboutThisProjectClick}> {Tr.getIn(['socialBarText','about',this.props.language])}</tspan>
      <tspan dx='-2.6em' dy='1.8em' onClick={this.methodologyClick}> {Tr.getIn(['socialBarText','methodology',this.props.language])}</tspan>
      <tspan dx='-5.6em' dy='1.8em' onClick={this.downloadDataClick}> {Tr.getIn(['socialBarText','downloadData',this.props.language])}</tspan>
      <tspan dx='-6.35em' dy='1.8em' onClick={this.downloadImageClick}> {Tr.getIn(['socialBarText','downloadImage',this.props.language])}</tspan>
      </text>
    </g>)
  }

  render() {
    return (<g>
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
    dispatch(ShowAboutWindowCreator('about'))
  },
  controlArrowClick() {
    dispatch(ExpandSocialBar())
  },
})


module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SocialBar)
