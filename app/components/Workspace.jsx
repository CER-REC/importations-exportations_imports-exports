const React = require('react')
const { connect } = require('react-redux')
const Constants = require('../Constants.js')

const Header = require('./Header.jsx')
const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const ModalSelector = require('./ModalSelector')

const VisualizationContainer = require('./VisualizationContainer.jsx')
const ViewportSelectors = require('../selectors/viewport/')

require('./Workspace.scss')

const Workspace = ({ svgSize, detailSidebarPosition }) => (
  <div style={{ position: 'relative' }}>
    <div className="Workspace">
      <Header />

    </div>
    <div
      id="detailSidebar"
      style={{
        position: 'absolute',
        top: detailSidebarPosition.top,
        left: detailSidebarPosition.left,
        width: detailSidebarPosition.width,
      }}
    />
    <svg
      id="workspace"
      className="Workspace"
      {...svgSize}
    >

      <VisualizationContainer />

      <MenuBar />
      <SocialBar />
    </svg>
    <ModalSelector />
  </div>
)

module.exports = connect((state, props) => ({
  svgSize: ViewportSelectors.svgSize(state, props),
  detailSidebarPosition: ViewportSelectors.detailSidebarPosition(state, props),
}))(Workspace)
