const React = require('react')
const { connect } = require('react-redux')
const Constants = require('../Constants.js')

const Header = require('./Header.jsx')
const MenuBar = require('./MenuBar.jsx')
const SocialBar = require('./SocialBar.jsx')
const VisualizationContainer = require('./VisualizationContainer.jsx')
const ViewportSelectors = require('../selectors/viewport/')

require('./Workspace.scss')

const Workspace = ({ viewport, detailSidebarPosition }) => (
  <div style={{ position: 'relative' }}>
    <div className = 'Workspace'>
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
      width={viewport.get('x')}
      height={viewport.get('y') + Constants.getIn(['workspace','viewportPadding'])}
    >
      <VisualizationContainer />
      <SocialBar />
      <MenuBar />
    </svg>
  </div>
)

module.exports = connect(
  (state, props) => ({
    viewport: state.viewport,
    detailSidebarPosition: ViewportSelectors.detailSidebarPosition(state, props),
  })
)(Workspace)
