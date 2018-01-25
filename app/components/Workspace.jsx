import React from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import MenuBar from './MenuBar'
import SocialBar from './SocialBar'
import ModalSelector from './ModalSelector'
import VisualizationContainer from './VisualizationContainer'
import ViewportSelectors from '../selectors/viewport/'

const ExplanationLine = require('./ExplanationLine.jsx')
const ExplanationText = require('./ExplanationText.jsx')

const PopoverPortal = require('./PopoverPortal.jsx')
const ExplanationDot = require('./ExplanationDot.jsx')

import './Workspace.scss'

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
      <ExplanationLine />
    </svg>

    <div id="popoverPortal" />
    <ExplanationText />
    <ModalSelector />

  </div>
)

module.exports = connect((state, props) => ({
  svgSize: ViewportSelectors.svgSize(state, props),
  detailSidebarPosition: ViewportSelectors.detailSidebarPosition(state, props),
}))(Workspace)
