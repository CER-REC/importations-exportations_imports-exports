const React = require('react')
const ReactDOM = require('react-dom')

const Constants = require('../Constants')

let detailSidebarRoot

const getSidebarRoot = () => {
  if (process.env.NODE_ENV === 'development') {
    // Hot-reload unmounts the div, so we refetch it every time
    return document.getElementById('detailSidebar')
  }
  if (!detailSidebarRoot) {
    detailSidebarRoot = document.getElementById('detailSidebar')
  }
  return detailSidebarRoot
}

class DetailSidebar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    getSidebarRoot().appendChild(this.el)
  }

  componentWillUnmount() {
    getSidebarRoot().removeChild(this.el)
  }

  render() {
    const { top, height } = this.props
    const width = Constants.getIn(['visualizationDetailContainer', 'width'])
    const container = (
      <div style={{ position: 'absolute', top, width, height }}>
        {this.props.children}
      </div>
    )
    return ReactDOM.createPortal(
      container,
      this.el
    )
  }
}

DetailSidebar.defaultProps = {
  top: 0,
}

module.exports = DetailSidebar
