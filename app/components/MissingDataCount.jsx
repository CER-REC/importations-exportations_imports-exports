import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ConfidentialIcon from './ConfidentialIcon'
import { missingDataTotal } from '../selectors/details'
import TRSelector from '../selectors/translate'
import MapLayoutGridConstant from '../MapLayoutGridConstant'

const MissingDataCount = (props) => {
  // Don't display anything if no datapoints were missing
  if (props.value.missing === 0) { return null }

  return (
    <div>
      <svg width="20" height="15">
        <circle cx="10" cy="9" r="5" strokeDasharray="1, 1" stroke="black" fill="none" />
      </svg>
      <span>{props.TR('missingCount', props.value.missing, props.value.total)}</span>
    </div>
  )
}

MissingDataCount.propTypes = {
  TR: PropTypes.func.isRequired,
  value: PropTypes.shape({
    missing: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
}

export default connect((state, props) => ({
  language: state.language,
  value: missingDataTotal(state, props),
  TR: TRSelector(state, props),
}))(MissingDataCount)
