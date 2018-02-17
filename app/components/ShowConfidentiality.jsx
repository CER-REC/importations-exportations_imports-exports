import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TrSelector from '../selectors/translate'
import { ToggleConfidentialityMenu } from '../actions/confidentialityMenu'
import { handleInteraction } from '../utilities'

import '../styles/Fonts.scss'

const triangleLine = (
  <svg
    x={0}
    y={503}
    width={160}
  >
    <g>
      <polyline fill="black" points="0 8 0 0 9.1 8.1 0 8.1" />
      <line stroke="black" x1="0.5" y1="7.6" x2="160" y2="7.6" />
    </g>
  </svg>
)

class ShowConfidentiality extends React.Component {
  static get propTypes() {
    return {
      Tr: PropTypes.func.isRequired,
      onClick: PropTypes.func.isRequired,
      confidentialityMenu: PropTypes.bool.isRequired,
    }
  }

  icon() {
    return <g transform="translate(116 493) scale(0.84)" className="confidentialityIcon">
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

  showText() {
    const { Tr } = this.props
    let sign = '+'
    const confidentialityText = Tr('confidentialityShown')
    if (this.props.confidentialityMenu) {
      sign = '-'
    }
    return (
      <text
        x={13}
        y={506}
        className="showHideConfidentiality"
        fill="#999"
      >
        {confidentialityText}
        <tspan dx="25">
          {sign}
        </tspan>
      </text>
    )
  }

  render() {
    return (
      <g
        transform="translate(0 30)"
        role="menuitem"
        {...handleInteraction(this.props.onClick)}
      >
        {this.icon()}
        {this.showText()}
        {triangleLine}
      </g>
    )
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  Tr: TrSelector(state, props),
  confidentialityMenu: state.confidentialityMenu,
})

const mapDispatchToProps = {
  onClick: ToggleConfidentialityMenu,
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowConfidentiality)
