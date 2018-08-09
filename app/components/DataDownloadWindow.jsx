import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tr from '../TranslationTable'
import RouteComputations from '../computations/RouteComputations'
import { handleInteraction } from '../utilities'
import './DataDownloadWindow.scss'

class DataDownloadWindow extends React.Component {
  constructor(props) {
    super(props)
    this.downloadDataClick = this.downloadDataClick.bind(this)
  }

  static get propTypes() {
    return {
      closeModal: PropTypes.func.isRequired,
      language: PropTypes.string.isRequired,
    }
  }


  closeButton() {
    return (<img
      className="closeButton"
      src="images/about_close.svg"
      alt={Tr.getIn(['aboutWindow', 'closeWindow', this.props.language])}
      {...handleInteraction(this.props.closeModal)}
    />)
  }

  heading() {
    return (
      <p className="aboutHeading">
        {Tr.getIn(['dataDownloadModal', 'title', this.props.language])}
      </p>
    )
  }

  subtext() {
    return (
      <p className="subtext">
        {Tr.getIn(['dataDownloadModal', 'subtext', this.props.language])}
      </p>
    )
  }

  fileNameText() {
    const displayName = Tr.getIn(['downloadable', 'csv', this.props.language])
    return (
      <p className="subtext">
        {displayName}
      </p>
    )
  }

  shareButton() {
    return (<img
      className="dataDownloadImage"
      src="images/download_file.svg"
      onClick={this.downloadDataClick}
    />)
  }

  downloadDataClick() {
    const appRoot = RouteComputations.appRoot(this.props.language)
    const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    window.open(`${appRoot}data/${fileName}`, 'data:text/csv;charset=utf-8,data/')
  }

  render() {
    return (
      <div>
        { this.closeButton() }
        { this.heading() }
        { this.subtext() }
        { this.shareButton() }
        { this.fileNameText() }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language,
  viewport: state.viewport,
})

export default connect(mapStateToProps)(DataDownloadWindow)
