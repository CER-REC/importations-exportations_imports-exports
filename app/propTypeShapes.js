import PropTypes from 'prop-types'

// When more shapes are added to this file, remove the eslint comment
// eslint-disable-next-line import/prefer-default-export
export const positionShape = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
