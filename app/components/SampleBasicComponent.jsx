import React from 'react'
import PropTypes from 'prop-types'

const SampleBasicComponent = props => (
  <div>
    <p>{`Why hello there ${props.name}`}</p>
  </div>
)

SampleBasicComponent.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SampleBasicComponent
