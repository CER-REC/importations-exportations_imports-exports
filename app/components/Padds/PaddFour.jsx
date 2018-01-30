import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'
const PaddFour = props => (
    <polygon 
    fill ={props.color}
    points="53.63 43.35 42.91 37.15 42.91 37.16 42.91 24.77 32.18 18.58 32.18 18.58 32.18 6.19 21.45 0 10.73 6.19 10.73 18.58 0 24.77 0 37.16 10.73 43.35 21.45 37.16 32.18 43.35 32.18 43.35 32.18 55.73 21.45 61.92 21.45 74.31 32.18 80.5 42.91 74.31 42.91 61.93 53.63 55.73 53.63 43.35"/>
)

PaddFour.propTypes = {
  color: PropTypes.string.isRequired,
}

module.exports = PaddFour
