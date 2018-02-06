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

export default connect(mapStateToProps)(SampleReduxComponent)
export const unwrapped = SampleReduxComponent
