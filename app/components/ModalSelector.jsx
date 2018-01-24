const React = require('react')
const ReactRedux = require('react-redux')
const Constants = require('../Constants.js')

const AboutWindow = require('./AboutWindow')
const ImageDownloadWindow = require('./ImageDownloadWindow')

const ModalSelector = props => { 
  if(props.modal === 'about') return <AboutWindow />

  if(props.modal === 'imageDownload') return <ImageDownloadWindow />

  return null
}

const mapStateToProps = state => {
  return {
    language: state.language,
    viewport: state.viewport,
    modal: state.modal,
  }
}

module.exports = ReactRedux.connect(mapStateToProps)(ModalSelector)