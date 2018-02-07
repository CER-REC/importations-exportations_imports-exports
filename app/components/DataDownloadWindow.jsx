import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Tr from '../TranslationTable'
import { handleInteraction } from '../utilities'
import './DataDownloadWindow.scss'

class DataDownloadWindow extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
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
        {Tr.getIn(['dataDownloadModal','subtext', this.props.language])}
      </p>
    )
  }

  shareButton() {
    return 
    // const appRoot = RouteComputations.appRoot(document.location, this.props.language)
    //   const fileName = Tr.getIn(['downloadable', 'csv', this.props.language])
    //   window.open(`${appRoot}data/${fileName}`, 'data:text/csv;charset=utf-8,data/')

  }

  render() {
    return (
      <div id="dataDownloadWindow" className="aboutWindow">
        { this.closeButton() }
        { this.heading() }
        { this.subtext() }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  language: state.language,
  viewport: state.viewport,
})

export default connect(mapStateToProps)(DataDownloadWindow)
