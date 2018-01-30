import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'
const PaddTwo = props => <polygon 
    fill ={props.color}
    points="72.66 12.59 72.66 4.2 65.4 0 58.13 4.2 58.13 12.59 58.13 12.59 50.86 16.78 50.86 16.78 43.6 12.59 43.59 12.59 43.59 4.2 36.33 0 29.06 4.2 21.8 0.01 14.53 4.2 7.27 0.01 0 4.2 0 12.59 7.26 16.78 7.26 25.17 14.52 29.36 14.52 37.75 14.53 37.75 7.26 41.94 7.26 50.33 14.53 54.53 21.79 50.33 29.05 54.53 36.32 50.33 36.32 41.94 36.32 41.94 43.59 37.75 43.59 37.75 50.86 41.94 50.86 41.94 50.86 50.33 58.12 54.52 65.39 50.33 65.39 41.94 58.12 37.74 58.12 37.74 58.12 29.37 58.13 29.37 65.4 25.17 65.4 25.17 72.66 29.37 79.93 25.17 79.93 16.78 72.66 12.59"/>

PaddTwo.propTypes = {
  color: PropTypes.string.isRequired,
  arrowLabel: PropTypes.string.isRequired,
}

module.exports = PaddTwo
