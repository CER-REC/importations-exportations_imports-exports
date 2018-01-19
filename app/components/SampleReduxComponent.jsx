const React = require('react')
const PropTypes = require('prop-types')
const ReactRedux = require('react-redux')

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

module.exports = ReactRedux.connect(mapStateToProps)(SampleReduxComponent)
module.exports.unwrapped = SampleReduxComponent
