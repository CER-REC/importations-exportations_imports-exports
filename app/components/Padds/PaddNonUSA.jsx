import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'
const PaddNonUSA = props => (
    <polygon 
    fill ={props.color}
    points="15.04 25.38 15.04 45.46 32.56 55.5 50.09 45.46 50.09 25.38 32.56 15.33 15.04 25.38"/>
)

PaddNonUSA.propTypes = {
  color: PropTypes.string.isRequired,
}

module.exports = PaddNonUSA
