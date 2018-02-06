import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Constants from '../Constants'

import PopoverPortal from './PopoverPortal'
import ConfidentialityPopover from './ConfidentialityPopover'

class ConfidentialIcon extends React.Component {
  static get propTypes() {
    return {
      styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    }
  }

  confidentialityIcon() {
    return <g transform="translate(30, 0)" className="confidentialityIcon">
    <path
      fill='#fff'
      stroke='#999'
      d="M7.83.5A7.33,7.33,0,1,1,.5,7.83,7.33,7.33,0,0,1,7.83.5Z"
    />
    <path
      fill='#999'
      d="M8.65,10.58A1.14,1.14,0,0,1,9,11.4a1.17,1.17,0,0,1-.32.83,1.08,1.08,0,0,1-.83.34A1.11,1.11,0,0,1,7,12.23a1.16,1.16,0,0,1-.33-.83A1.14,1.14,0,0,1,7,10.58a1.11,1.11,0,0,1,.83-.34A1.09,1.09,0,0,1,8.65,10.58ZM8.9,3.18,8.62,9H7L6.75,3.18Z"
    />
  </g>
  }

  render() {
    return (<g>
      {this.confidentialityIcon()}
    <PopoverPortal>
      <ConfidentialityPopover
        containerX={this.props.containerX}
        containerY={this.props.containerY}
        xPosition={this.props.xPosition}
        yPosition={this.props.yPosition}
        text={this.props.text}
        lineX={this.props.lineX}
        lineY={this.props.lineY}
        textX={this.props.textX}
        textY={this.props.textY}
      />
    </PopoverPortal>
    </g>)
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  language: state.language,
})

export default connect(mapStateToProps)(ConfidentialIcon)
