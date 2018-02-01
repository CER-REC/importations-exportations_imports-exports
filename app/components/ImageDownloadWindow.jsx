import Tr from '../TranslationTable'
const Immutable = require('immutable')

const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

const CloseModal = require('../actions/modal.js').CloseModal
const RouteComputations = require('../computations/RouteComputations.js')

const Constants = require('../Constants.js')

require('./ImageDownloadWindow.scss')

class ImageDownloadWindow extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.saveImageClick = this.saveImageClick.bind(this)
  }

  handleClose() {
    this.props.closeWindowClick()
  }

  closeButton() {
    return <img 
      className = 'closeButton'
      src='images/hide_(close).svg'
      onClick = {this.handleClose}
    />
  }

  heading() {
    return <p
      className='imageDownloadHeading'>
      { Tr.getIn(['imageDownload', this.props.language]).toUpperCase() }
      </p>
  }

  imagePreview() {
    return <div
      className = 'imagePreview'>
      <img className="imagePreview"
        src="http://localhost:3004/screenshot/?pageUrl=%2Fimport-export-visualization%2Fscreenshot%3Fconfig%3DeyJ2aXN1YWxpemF0aW9uU2V0dGluZ3MiOnsiZWxlY3RyaWNpdHnED2Ftb3VudCI6Ik1XLmgiLCJhcnJhbmdlQnkiOiJsb2PFP8QXY3RpdsUzImltcG9ydHNFeMUHIiwic3VidHlwZSI6IsQNxWDENTp7ImPEXHJ5IjpudWxsLCJvcmlnaW5zIjpbXSwiZGVzdGluxWDkAJh9fSwidGltZWxpbmXEO3NjYWxlTGlua2VkIjp0cnVlLCJncm91cGluZyI6InllYXIiLCLlAKvFLnRhcnTECcUZOjE5OTAsInF1YXJ0ZcQPfSwiZW5kyiAyMDE3yyA0fcQBLOwBG0V4cGxh5gCeIjpmYWxzZSznAPnmAPhW7AFfIjrMOyIsImxhbmd1YeQAmyJl5AE%252Bc2hvd8tSc%252BYA0n0%253D&width=1500&height=1700"
      />
      </div>
  }

  saveImageClick() {
    const screenshotUrl = `${RouteComputations.screenshotOrigin(location)}/${Constants.get('screenshotPath')}/?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${Constants.get('screenshotWidth')}&height=${Constants.get('screenshotHeight')}`
    window.open(screenshotUrl)
  }

  saveImageButton() {
    return <p
      className='saveImage'
      onClick = {this.saveImageClick}>
      { Tr.getIn(['saveImage', this.props.language]).toUpperCase() }
    </p>
  }

  bitlyText() {
    return <p
      className = 'bitlyText'>
      placeholder for bitly link
    </p>
  }

  render() {
   return <div 
    className='imageDownloadWindow'>
    {this.imagePreview()}
    {this.closeButton()}
    {this.heading()}
    {this.bitlyText()}
    {this.saveImageButton()}
   </div>
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
})

const mapDispatchToProps = dispatch => ({
  closeWindowClick() {
    dispatch(CloseModal())
  },
})

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ImageDownloadWindow)