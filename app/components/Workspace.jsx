import React from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import MenuBar from './MenuBar'
import SocialBar from './SocialBar'
import ModalSelector from './ModalSelector'
import VisualizationContainer from './VisualizationContainer'

import Constants from '../Constants'
import { svgSize as svgSizeSelector, detailSidebarPosition as detailSidebarSelector } from '../selectors/viewport/'

import './Workspace.scss'

const Workspace = ({ svgSize, detailSidebarPosition }) => (
  <div style={{ position: 'relative' }}>
    <div className="Workspace">
      <Header />

    </div>
    <svg
      id="workspace"
      className="Workspace"
      {...svgSize}
      style={{ zIndex: 9999 }}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      preserveAspectRatio="xMinYMin meet"
      role="application"
    >
      <MenuBar />

      <VisualizationContainer />
      <SocialBar />
    </svg>
    <div
      id="detailSidebar"
      style={{
        position: 'absolute',
        top: detailSidebarPosition.top,
        left: detailSidebarPosition.left,
        width: detailSidebarPosition.width,
      }}
    />
    <div id="popoverPortal"
      style={{ position: 'absolute',
        top: Constants.get('topHeightMargin')
      }}>
    </div>
    <ModalSelector />
  </div>
)

export default connect((state, props) => ({
  svgSize: svgSizeSelector(state, props),
  detailSidebarPosition: detailSidebarSelector(state, props),
}))(Workspace)
