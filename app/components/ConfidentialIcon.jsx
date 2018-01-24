import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

const ConfidentialIcon = props => (
  <g transform="translate(30, 0)">
    <path
      fill={props.styles.get('fill')}
      stoke={props.styles.get('stroke')}
      d="M7.83.5A7.33,7.33,0,1,1,.5,7.83,7.33,7.33,0,0,1,7.83.5Z"
    />
    <path
      fill={props.styles.get('exclamationFill')}
      // eslint-disable-next-line max-len
      d="M8.65,10.58A1.14,1.14,0,0,1,9,11.4a1.17,1.17,0,0,1-.32.83,1.08,1.08,0,0,1-.83.34A1.11,1.11,0,0,1,7,12.23a1.16,1.16,0,0,1-.33-.83A1.14,1.14,0,0,1,7,10.58a1.11,1.11,0,0,1,.83-.34A1.09,1.09,0,0,1,8.65,10.58ZM8.9,3.18,8.62,9H7L6.75,3.18Z"
    />
  </g>
)

ConfidentialIcon.propTypes = {
  styles: PropTypes.instanceOf(Immutable.Map).isRequired,
}

module.exports = ConfidentialIcon
