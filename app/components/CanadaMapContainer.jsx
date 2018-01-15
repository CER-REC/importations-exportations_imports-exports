const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')

const ElectricityMapLayout = require('./ElectricityMapLayout.jsx')

const CanadaMapContainer = props => (
  // Scale is temporary adjustment as it's too small if we use dimensions
  // mentioned in the design document
  // TODO: scale map dynamically when screen size change
  <g transform="scale(1.4)">
    <ElectricityMapLayout
      left={props.left}
      top={props.top}
      country="ca"
    />
  </g>
)

CanadaMapContainer.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  viewport: state.viewport,
})


module.exports = ReactRedux.connect(mapStateToProps)(CanadaMapContainer)
