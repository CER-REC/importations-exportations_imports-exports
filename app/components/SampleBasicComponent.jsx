const React = require('react')
const PropTypes = require('prop-types')

const SampleBasicComponent = props => (
  <div>
    <p>{`Why hello there ${props.name}`}</p>
  </div>
)

SampleBasicComponent.propTypes = {
  name: PropTypes.string.isRequired,
}

module.exports = SampleBasicComponent
