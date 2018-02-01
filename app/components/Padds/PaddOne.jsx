import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'

const PaddOne = props => (
  <polyline
    fill={props.color}
    points="32.01 11.09 25.61 14.79 25.61 22.17 19.21 25.86 19.21 33.25 12.8 36.95 12.8 36.95 6.4 33.26 0 36.95 0 44.34 6.4 48.04 6.4 55.42 12.8 59.12 12.8 66.49 12.8 66.49 6.4 70.18 6.4 77.58 12.8 81.27 19.2 77.58 19.2 70.19 19.21 70.19 25.61 66.5 25.61 59.11 32.01 55.42 38.41 59.12 44.81 55.42 44.81 48.04 44.81 48.04 51.22 44.34 51.22 36.95 57.62 33.26 57.62 25.88 64.02 22.18 64.02 14.79 57.62 11.09 57.62 11.09 57.62 3.7 51.22 0 44.82 3.7 38.41 0 32.01 3.7 32.01 11.09"
  />
)

PaddOne.propTypes = {
  color: PropTypes.string.isRequired,
}

module.exports = PaddOne
