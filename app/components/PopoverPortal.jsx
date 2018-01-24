import React from 'react'
import ReactDOM from 'react-dom'

import Constants from '../Constants'
import Tr from '../TranslationTable'

let popoverPortalRoot

const getPopoverPortalRoot = () => {
  if (process.env.NODE_ENV === 'development') {
    // Hot-reload unmounts the div, so we refetch it every time
    return document.getElementById('popoverPortal')
  }
  if (!popoverPortalRoot) {
    popoverPortalRoot = document.getElementById('popoverPortal')
  }
  return popoverPortalRoot
}

class PopoverPortal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    getPopoverPortalRoot().appendChild(this.el)
  }

  componentWillUnmount() {
    getPopoverPortalRoot().removeChild(this.el)
  }

  render() {
    const { top, height } = this.props
    const container = (
      <div style={{ position: 'absolute', top, height }}>
        {this.props.children}
      </div>
    )
    return ReactDOM.createPortal(
      container,
      this.el,
    )
  }
}

PopoverPortal.defaultProps = {
  top: 0,
  left: 0,
}

module.exports = PopoverPortal
