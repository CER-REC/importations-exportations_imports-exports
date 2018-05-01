import React from 'react'
import PropTypes from 'prop-types'

import './PercentageBar.scss'

const PercentageBar = (props) => {
  let { width } = props
  let negative = false

  if (width < 0) {
    width = Math.abs(width)
    negative = true
  }

  return (
    <div className="percentage-bar">
      <span
        style={{ ...props.style, width: `${width}%` }}
        className={negative ? 'negative' : ''}
      />
    </div>
  )
}

PercentageBar.propTypes = {
  width: PropTypes.number.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

PercentageBar.defaultProps = {
  style: {},
}

export default PercentageBar
