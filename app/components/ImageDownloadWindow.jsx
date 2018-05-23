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
    return (<img
      className="closeButton"
      src="images/hide_(close).svg"
      onClick={this.handleClose}
    />)
  }

  heading() {
    return (<p
      className="imageDownloadHeading"
    >
      { Tr.getIn(['imageDownload', this.props.language]).toUpperCase() }
    </p>)
  }

  imagePreview() {
    return (
      <div className="imagePreview">
        <img className="imagePreview" src={RouteComputations.screenshotURL(this.props.language)} />
      </div>
    )
  }

  saveImageClick() {
    window.open(RouteComputations.screenshotURL(this.props.language), 'targetWindow', 'width=650,height=650')
  }

  saveImageButton() {
    return (<p
      className="saveImage"
      onClick={this.saveImageClick}
    >
      { Tr.getIn(['saveImage', this.props.language]).toUpperCase() }
            </p>)
  }

  render() {
    return (<div>
      {this.imagePreview()}
      {this.closeButton()}
      {this.heading()}
      {this.saveImageButton()}
            </div>)
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
