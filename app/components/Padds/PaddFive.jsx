import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'
const PaddFive = props => (
    <polygon 
    fill ={props.color}
    points="53.17 61.39 44.31 66.5 35.45 61.39 35.45 51.16 35.44 51.15 44.3 46.04 44.3 35.81 35.44 30.69 26.58 35.8 17.73 30.69 17.73 30.69 17.73 20.47 26.59 15.35 26.59 5.12 17.73 0 8.86 5.12 8.86 15.34 0 20.46 0 30.69 8.86 35.81 8.86 35.81 8.86 46.04 17.72 51.16 17.72 51.16 17.72 61.39 26.58 66.51 26.58 76.74 35.45 81.85 44.31 76.74 53.17 81.85 62.03 76.74 62.03 66.5 53.17 61.39"/>
)

PaddFive.propTypes = {
  color: PropTypes.string.isRequired,
  arrowLabel: PropTypes.string.isRequired,
}

module.exports = PaddFive
