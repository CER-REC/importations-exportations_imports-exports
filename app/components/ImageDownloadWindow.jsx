const Immutable = require('immutable')

const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')

const CloseModal = require('../actions/modal.js').CloseModal

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./ImageDownloadWindow.scss')

class ImageDownloadWindow extends React.Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
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
      className = 'imagePreview'
      />
  }

  saveImageButton() {
    return <p
      className='saveImage'>
      { Tr.getIn(['saveImage', this.props.language]).toUpperCase() }
    </p>
  }

  render() {
   return <div 
    className='imageDownloadWindow'>
    {this.imagePreview()}
    {this.closeButton()}
    {this.heading()}
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