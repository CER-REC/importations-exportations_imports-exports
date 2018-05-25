import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Constants from '../Constants'

import PopoverPortal from './PopoverPortal'
import ConfidentialityPopover from './ConfidentialityPopover'

import { ExpandCollapseConfidentiality } from '../actions/confidentiality'

import { handleInteraction } from '../utilities'

import './ConfidentialIcon.scss'

export const ConfidentialIconLogo = props => (
  <g className="confidentialityIcon">
    <path
      fill={props.expanded ? '#999' : '#fff'}
      stroke="#999"
      d="M7.83.5A7.33,7.33,0,1,1,.5,7.83,7.33,7.33,0,0,1,7.83.5Z"
    />
    <path
      fill={props.expanded ? '#fff' : '#999'}
      d="M8.65,10.58A1.14,1.14,0,0,1,9,11.4a1.17,1.17,0,0,1-.32.83,1.08,1.08,0,0,1-.83.34A1.11,1.11,0,0,1,7,12.23a1.16,1.16,0,0,1-.33-.83A1.14,1.14,0,0,1,7,10.58a1.11,1.11,0,0,1,.83-.34A1.09,1.09,0,0,1,8.65,10.58ZM8.9,3.18,8.62,9H7L6.75,3.18Z"
    />
  </g>
)

class ConfidentialIcon extends React.Component {
  static get propTypes() {
    return {
      containerX: PropTypes.number.isRequired,
      containerY: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      textX: PropTypes.number.isRequired,
      textY: PropTypes.number.isRequired,
      xPosition: PropTypes.number.isRequired,
      yPosition: PropTypes.number.isRequired,
      expanded: PropTypes.bool.isRequired,
    }
  }

  confidentialityIcon() {
    return <ConfidentialIconLogo expanded={this.props.expanded} />
  }

  render() {
    return (<g transform={`translate(${this.props.xPosition} ${this.props.yPosition})`}>
      <a
        role="menuItem"
        {...handleInteraction(this.props.onClick, this.props.name)}
      >
        {this.confidentialityIcon()}
      </a>
      <PopoverPortal>
        <ConfidentialityPopover
          containerX={this.props.containerX}
          containerY={this.props.containerY}
          text={this.props.text}
          textX={this.props.textX}
          textY={this.props.textY}
          xPosition={this.props.xPosition}
          yPosition={this.props.yPosition}
          expanded={this.props.expanded}
        />
      </PopoverPortal>
    </g>)
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  showConfidentiality: state.showConfidentiality,
  confidentialityPopover: state.confidentialityPopover,
  expanded: state.openConfidentiality.contains(props.name),
})

const mapDispatchToProps = {
  onClick: ExpandCollapseConfidentiality,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfidentialIcon)
