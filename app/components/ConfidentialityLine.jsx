const React = require('react')
const PropTypes = require('prop-types')
const Immutable = require('immutable')

const ConfidentialityLine = props => (
  <g transform="translate(0, 0)">
    <path d="M102,40 C184,191 161,167 463,165" fill="#999"/>
  </g>
)

ConfidentialityLine.propTypes = {
  confidentality: PropTypes.bool.isRequired,
}

module.exports = ConfidentialityLine
