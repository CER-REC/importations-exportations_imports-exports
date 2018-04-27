import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import dialogPolyfill from 'dialog-polyfill'
import 'dialog-polyfill/dialog-polyfill.css'

import AboutWindow from './AboutWindow'
import ImageDownloadWindow from './ImageDownloadWindow'
import DataDownloadWindow from './DataDownloadWindow'

import { CloseModal } from '../actions/modal'
import './ModalSelector.scss'

class ModalSelector extends React.PureComponent {
  static propTypes = {
    modal: PropTypes.string.isRequired,
    CloseModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.lastFocus = null
  }

  registerDialog = (ref) => {
    this.dialog = ref
    if (ref === null) { return }

    this.lastFocus = document.activeElement
    dialogPolyfill.registerDialog(ref)
    ref.showModal()
  }

  dialogClosed = () => {
    this.props.CloseModal()
    if (this.lastFocus) { this.lastFocus.focus() }
  }

  close = () => { if (this.dialog) { this.dialog.close() } }

  renderContent() {
    const { modal } = this.props
    if (modal === 'about') { return <AboutWindow closeModal={this.close} /> }
    if (modal === 'imageDownload') { return <ImageDownloadWindow closeModal={this.close} /> }
    if (modal === 'dataDownload') { return <DataDownloadWindow closeModal={this.close} /> }
    return null
  }

  render() {
    const content = this.renderContent()
    if (content === null) { return null }

    return (
      <dialog
        onClose={this.dialogClosed}
        ref={this.registerDialog}
        className={this.props.modal}
      >
        {content}
      </dialog>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language,
  viewport: state.viewport,
  modal: state.modal,
})

export default connect(mapStateToProps, { CloseModal })(ModalSelector)
