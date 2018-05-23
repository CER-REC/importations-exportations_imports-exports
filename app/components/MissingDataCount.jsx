import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { getFullyFilteredValues } from '../selectors/renderData'
import TRSelector from '../selectors/translate'

const MissingDataCount = (props) => {
  // Don't display anything if no datapoints were missing
  const missingCount = props.data.get('missing')
    .reduce((acc, value) => acc + value.reduce((acc2, next) => acc2 + next, 0), 0)
  if (missingCount === 0) { return null }

  const totalCount = props.data.get('totalPoints')
    .reduce((acc, value) => acc + value.reduce((acc2, next) => acc2 + next, 0), 0)

  return (
    <div>
      <svg width="20" height="15">
        <circle cx="10" cy="9" r="5" strokeDasharray="1, 1" stroke="black" fill="none" />
      </svg>
      <span>{props.TR('missingCount', missingCount, totalCount)}</span>
    </div>
  )
}

MissingDataCount.propTypes = {
  TR: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default connect((state, props) => ({
  data: getFullyFilteredValues(state, props),
  TR: TRSelector(state, props),
}))(MissingDataCount)
