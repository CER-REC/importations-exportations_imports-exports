const Immutable = require('immutable')

const React = require('react')
const ReactRedux = require('react-redux')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

require('./ImageDownloadWindow.scss')

class ImageDownloadWindow extends React.Component {
  static get propTypes() {
    return {
      viewport: PropTypes.instanceOf(Immutable.Map).isRequired,
      language: PropTypes.string.isRequired,
    }
  }

  closeButton() {
    return <img 
      className = 'closeButton'
      src='images/hide_(close).svg'
    />
  }

  heading() {
    return <p
      className='imageDownloadHeading'>
      { Tr.getIn(['imageDownload', this.props.language]).toUpperCase() }
      </p>
  }

  saveImageButton() {
    return <p
      className='imageDownloadHeading'>
      { Tr.getIn(['saveImage', this.props.language]).toUpperCase() }
    </p>
  }

  render() {
   return <div 
    id = 'imageDownloadWindow'
    className='imageDownloadWindow'>
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

module.exports = ReactRedux.connect(mapStateToProps)(ImageDownloadWindow)