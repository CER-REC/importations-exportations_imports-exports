const React = require('react')
const ReactDOM = require('react-dom')

const Constants = require('../Constants.js')
const Tr = require('../TranslationTable.js')

let modalPortalRoot

// TODO: create a state to check whether a modal has been summoned already
//  and allow for only one modal to be open at a time. Also use this as an
//  implementation layer for handling keyboard tab focus for accessibility =)

const getModalPortalRoot = () => {
  if (process.env.NODE_ENV === 'development') {
    // Hot-reload unmounts the div, so we refetch it every time
    return document.getElementById('modalPortal')
  }
  if (!modalPortalRoot) {
    modalPortalRoot = document.getElementById('modalPortal')
  }
  return modalPortalRoot
}

class ModalPortal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    getModalPortalRoot().appendChild(this.el)
  }

  componentWillUnmount() {
    getModalPortalRoot().removeChild(this.el)
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

ModalPortal.defaultProps = {
  top: 0,
  left: 0,
}

module.exports = ModalPortal
