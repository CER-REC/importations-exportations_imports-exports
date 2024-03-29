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


const Workspace = ({ svgSize, detailSidebarPosition, portalSvgSize }) => (
  <div style={{ position: 'relative' }}>
    <div className="Workspace">
      <Header />

    </div>
    <svg
      id="workspace"
      className="Workspace"
      {...svgSize}
      style={{ zIndex: 10 }}
      viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      preserveAspectRatio="xMinYMin meet"
      role="application"
      focusable="true"
      tabIndex="0"
    >
      <VisualizationContainer />
      <MenuBar />
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
    <div
      id="popoverPortal"
      style={{
 position: 'absolute',
        top: Constants.get('topHeightMargin'),
      }}
    />
    <ModalSelector />

    <div
      id="popoverPortal"
      style={{
 position: 'absolute',
        top: Constants.get('topHeightMargin'),
    }}
    />
  </div>
)

export default connect((state, props) => ({
  svgSize: svgSizeSelector(state, props),
  detailSidebarPosition: detailSidebarSelector(state, props),
}))(Workspace)
