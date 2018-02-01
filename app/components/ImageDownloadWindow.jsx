import React from 'react'
import Tr from '../TranslationTable'

import { connect } from 'react-redux'
import Request from 'client-request/promise'
import PropTypes from 'prop-types'

import RouteComputations from '../computations/RouteComputations'

import Constants from '../Constants'

const ReactDOM = require('react-dom')

const CloseModal = require('../actions/modal.js').CloseModal

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
    const screenshotUrl = `${RouteComputations.screenshotOrigin(location)}/${Constants.get('screenshotPath')}/?pageUrl=${RouteComputations.screenshotParameter(document.location)}&width=${Constants.get('screenshotWidth')}&height=${Constants.get('screenshotHeight')}`
    return <div
      className = 'imagePreview'>
      <img className="imagePreview"
        src="http://localhost:3004/screenshot/?pageUrl=%2Fimport-export-visualization%2Fscreenshot%3Fconfig%3DeyJ2aXN1YWxpemF0aW9uU2V0dGluZ3MiOnsibmF0dXJhbEdhc0xpcXVpZMUVYW1vdW50IjoibTMvZCIsImFycmFuZ2VCeSI6ImxvY8VFxBdjdGl2aXTEFmltcG9ydHNFeMUHIiwic3VidHlwZSI6IsQNZWxlY8U1OnsiY8RccnkiOm51bGwsIm9yaWdpbnMiOltdLCJkZXN0aW7FYOQAiX19LCJ0aW1lbGluZcQ7c2NhbGVMaW5rZWQiOnRydWUsImdyb3VwaW5nIjoieWVhciIsIuUAq8UudGFydMQJxRk6MTk4NSwicXVhcnRlxA99LCJlbmTKIDIwMTfLIDR9xAEsIuUAu3JpY2l0eUV4cGxh5gCeIjpmYWxzZSznAPnmAPhW7AFlIjrzAVwsImxhbmd1YeQAoSJl5AFEc2hvd8tYc%252BYA2H0%253D&width=1500&height=1200"
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageDownloadWindow)
