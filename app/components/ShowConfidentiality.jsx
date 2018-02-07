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
    width={150}
  >
    <g>
      <polyline fill="black" points="0 8 0 0 9.1 8.1 0 8.1" />
      <line stroke="black" x1="0.5" y1="7.6" x2="150" y2="7.6" />
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

  showText() {
    const { Tr } = this.props
    let confidentialityText = Tr('confidentialityShown')
    if (this.props.confidentialityMenu) {
      confidentialityText = Tr('confidentialityHide')
    }
    return (
      <text
        x={13}
        y={506}
        className="showHideConfidentiality"
        fill="#999"
      >
        {confidentialityText}
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
