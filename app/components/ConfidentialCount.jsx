import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'

import ConfidentialIcon from './ConfidentialIcon'
import { confidentialTotal } from '../selectors/details'
import TR from '../TranslationTable'
import MapLayoutGridConstant from '../MapLayoutGridConstant'

// TODO: Temporary until we refactor where this is stored
const iconStyle = MapLayoutGridConstant.getIn(['electricity', 'ca', 'styles', 'confidentialStyle'])

const ConfidentialCount = (props) => {
  // Don't display anything if no datapoints were confidential
  if (props.value.confidential === 0) { return null }

  return (
    <div>
      <svg width="20" height="15">
        <g transform="translate(-30, 0)">
          <ConfidentialIcon styles={iconStyle} />
        </g>
      </svg>
      <span>{props.value.confidential} of {props.value.total} values Confidential</span>
    </div>
  )
}

ConfidentialCount.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.shape({
    confidential: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}

export default connect((state, props) => ({
  language: state.language,
  value: confidentialTotal(state, props),
}))(ConfidentialCount)
