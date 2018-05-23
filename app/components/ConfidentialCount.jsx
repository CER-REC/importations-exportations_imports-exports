import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { getFullyFilteredValues } from '../selectors/renderData'
import TRSelector from '../selectors/translate'

const ConfidentialCount = (props) => {
  // Don't display anything if no datapoints were confidential
  const confidentialCount = props.data.get('confidential')
    .reduce((acc, value) => acc + value.reduce((acc2, next) => acc2 + next, 0), 0)
  if (confidentialCount === 0) { return null }

  const totalCount = props.data.get('totalPoints')
    .reduce((acc, value) => acc + value.reduce((acc2, next) => acc2 + next, 0), 0)

  return (
    <div>
      <svg width="20" height="15">
        <g transform="translate(3, 2)">
          <image
            width={13}
            height={13}
            xlinkHref="images/conf_white.svg"
          />
        </g>
      </svg>
      <span>{props.TR('confidentialCount', confidentialCount, totalCount)}</span>
    </div>
  )
}

ConfidentialCount.propTypes = {
  TR: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default connect((state, props) => ({
  data: getFullyFilteredValues(state, props),
  TR: TRSelector(state, props),
}))(ConfidentialCount)
