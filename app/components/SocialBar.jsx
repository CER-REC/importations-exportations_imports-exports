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

  aboutThisProjectClick() {
    // TODO
    console.log('about this project')
  }

  tellMeAStoryClick() {
    // TODO
    console.log('tell me a story')
  }

  methodologyClick() {
    // TODO
    console.log('methodology')
  }

  resetVisualizationClick() {
    // TODO
    console.log('reset visualization')
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

  }

  downloadDataClick() {
    const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    window.open(`${appRoot}data/${fileName}`, 'data:text/csv;charset=utf-8,data/' + escape())  
  }


  render() {
    return <svg>
      <rect 
        x = { 0 }
        y = { WorkspaceComputations.socialBarY(this.props.viewport) }
        width = { Constants.getIn(['socialBar','width']) }
        height = { Constants.getIn(['socialBar','height']) }
        fill = '#d4d7db' 
      />
      <g>
        <title>{Tr.getIn(['socialBar','aboutThisProject', this.props.language])}</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = { Constants.getIn(['socialBar','iconXOffset'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.aboutThisProjectClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>{Tr.getIn(['socialBar','tellMeAStory', this.props.language])}</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {Constants.getIn(['socialBar','iconXOffset']) + Constants.getIn(['socialBar','iconMargin'])}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.tellMeAStoryClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>{Tr.getIn(['socialBar','methodology', this.props.language])}</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {Constants.getIn(['socialBar','iconXOffset']) + (Constants.getIn(['socialBar','iconMargin']) * 2)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.methodologyClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>{Tr.getIn(['socialBar','resetVisualization', this.props.language])}</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {Constants.getIn(['socialBar','iconXOffset']) + (Constants.getIn(['socialBar','iconMargin']) * 3)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.resetVisualizationClick.bind(this)}
        ></image>
      </g>
      <line x1={130} y1={WorkspaceComputations.socialBarY(this.props.viewport) + 6.5}
        x2={130} y2={WorkspaceComputations.socialBarY(this.props.viewport) + 25}
        strokeWidth="1.5" stroke = "#666666" />
      <g>
        <title>twitter</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 4)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.twitterClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>email</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 5)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.emailClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>facebook</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 6)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.facebookClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>linkedin</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 7)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.linkedInClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>download image</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 8)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.downloadImageClick.bind(this)}
        ></image>
      </g>
      <g>
        <title>download data</title>
        <image className = 'socialBarIcon'
          height = {Constants.getIn(['socialBar','iconHeight'])}
          width = {Constants.getIn(['socialBar','iconWidth'])}
          x = {14 + (Constants.getIn(['socialBar','iconMargin']) * 9)}
          y = { WorkspaceComputations.socialBarY(this.props.viewport) + Constants.getIn(['socialBar','iconPadding']) }
          xlinkHref = 'images/methodology-icon-black.svg'
          onClick = {this.downloadDataClick.bind(this)}
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