import React from 'react'
import PropTypes from 'prop-types'

import ImportExportArrow from '../ImportExportArrow.jsx'
import Immutable from 'immutable'
const PaddThree = props => (<polygon 
    fill ={props.color}
    points="63.61 15.74 54.52 20.98 45.44 15.74 45.44 5.25 36.35 0 27.26 5.25 27.26 15.73 18.17 20.98 18.17 20.99 9.09 15.74 0 20.99 0 31.48 9.09 36.73 9.09 47.2 18.17 52.45 27.26 47.2 27.26 36.72 27.26 36.72 36.35 31.47 36.35 31.48 45.44 36.73 54.52 31.48 63.61 36.73 72.7 31.48 72.7 20.98 63.61 15.74"/>
)

PaddThree.propTypes = {
  color: PropTypes.string.isRequired,
  arrowLabel: PropTypes.string.isRequired,
}

module.exports = PaddThree
