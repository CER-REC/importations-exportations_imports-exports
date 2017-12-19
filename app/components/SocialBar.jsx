const React = require('react')
const ReactRedux = require('react-redux')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')
const WorkspaceComputations = require('../computations/WorkspaceComputations.js')

require('./SocialBar.scss')

class SocialBar extends React.Component {

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

  }

  emailClick() {

  }

  facebookClick() {

  }

  linkedIn() {

  }

  downloadImageClick() {

  }

  downloadDataClick() {

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