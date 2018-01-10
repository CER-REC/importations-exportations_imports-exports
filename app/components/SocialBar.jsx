const React = require('react')
const ReactRedux = require('react-redux')
const Request = require('client-request/promise')

const RouteComputations = require('../computations/RouteComputations.js')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./SocialBar.scss')

class SocialBar extends React.Component {

  makeBitlyPromise() {

    const bitlyEndpoint = RouteComputations.bitlyEndpoint(document.location, this.props.language)
    const shortenUrl = RouteComputations.bitlyParameter(document.location, this.props.language)

    const options = {
      uri: `${bitlyEndpoint}?shortenUrl=${shortenUrl}`,
      json: true
    }

    return Request(options)
      .then(function (response) {
        // The server proxies our request through to Bitly. If our request
        // to our server succeeds but the one to bitly fails, the returned
        // object will detail the error

        // A reponse for a successful request to the bitly shortening service 
        // is a JSON string like:
        //{
        //  "status_code": 200,
        //  "status_txt": "OK",
        //  "data": {
        //    "url": "http://bit.ly/2xzn2HN",
        //    "hash": "2xzn2HN",
        //    "global_hash": "46frEb",
        //    "long_url": "https://www.google.ca/",
        //    "new_hash": 1
        //  }
        //}

        if (response.body.status_code !== 200) {
          // throw new Error(response.body.status_txt)
          return Constants.get('appHost')
        }
        return response.body.data.url
      })
      .catch( () => Constants.get('appHost'))
  }

  twitterClick() {
    this.makeBitlyPromise().then(function(url){
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}`
      window.open(twitterUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  emailClick() {
    const self = this
    this.makeBitlyPromise().then(function(url){

      const emailBody = `${url}%0A%0A ${Tr.getIn(['shareEmail', 'body', self.props.language])}`

      const emailUrl = `mailto:?subject=${Tr.getIn(['shareEmail', 'subject', self.props.language])} &body= ${emailBody}`

      window.location.href = emailUrl
    })
  }

  facebookClick() {
    this.makeBitlyPromise().then(function(url){
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
      window.open(facebookUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  linkedInClick() {
    this.makeBitlyPromise().then(function(url){
      const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&summary=${url}`
      window.open(linkedinUrl , 'targetWindow' , 'width=650,height=650') 
    })
  }

  downloadImageClick() {
    // TODO
    const screenshotUrl = `${RouteComputations.screenshotOrigin(location)}/${Constants.get('screenshotPath')}/?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${TODO}&height=${TODO}`

    window.open(screenshotUrl)
  }

  downloadDataClick() {
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    window.open(`${appRoot}data/${fileName}`, 'data:text/csv;charset=utf-8,data/' + escape())  
  }


  render() {
    let transformSocialBarIcons = `translate(${this.props.viewport.get('x') - Constants.getIn(['socialBar', 'iconMargin'])}, 0)`

    return <svg alignment-baseline = 'baseline'>
      <rect 
        x = { this.props.viewport.get('x') - Constants.getIn(['socialBar','width']) }
        y = { WorkspaceComputations.socialBarY(this.props.viewport) }
        width = { Constants.getIn(['socialBar','width']) }
        height = { Constants.getIn(['socialBar','height']) }
        fill = '#e6e6e6' 
      />
      <g transform = { transformSocialBarIcons }>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','emailIconPadding']) }
          xlinkHref = 'images/sm_email.svg'
          onClick = {this.emailClick.bind(this)}
        ></image>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','downloadFileIconPadding']) }
          xlinkHref = 'images/download_file.svg'
          onClick = {this.downloadDataClick.bind(this)}
        ></image>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','downloadImageIconPadding']) }
          xlinkHref = 'images/download_image.svg'
          onClick = {this.downloadImageClick.bind(this)}
        ></image>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','twitterIconPadding']) }
          xlinkHref = 'images/sm_twitter.svg'
          onClick = {this.twitterClick.bind(this)}
        ></image>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','facebookIconPadding']) }
          xlinkHref = 'images/sm_facebook.svg'
          onClick = {this.facebookClick.bind(this)}
        ></image>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconSize'])}
          width = {Constants.getIn(['socialBar','iconSize'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','linkedInIconPadding']) }
          xlinkHref = 'images/sm_linkedin.svg'
          onClick = {this.linkedInClick.bind(this)}
        ></image>
      </g>
    </svg>
  }
}

const mapStateToProps = state => {
  return {
    viewport: state.viewport,
    language: state.language
  }
}


module.exports = ReactRedux.connect(mapStateToProps)(SocialBar)