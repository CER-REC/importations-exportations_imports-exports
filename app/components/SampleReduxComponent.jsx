import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SampleReduxComponent = props => (
  <div>
    <p>{`Why hello there ${props.name}`}</p>
  </div>
)

SampleReduxComponent.propTypes = {
  name: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  name: state.name,
})

module.exports = connect(mapStateToProps)(SampleReduxComponent)
module.exports.unwrapped = SampleReduxComponent
