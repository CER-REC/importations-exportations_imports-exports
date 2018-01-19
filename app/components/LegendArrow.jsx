const React = require('react')
const ReactRedux = require('react-redux')
const PropTypes = require('prop-types')

const Constants = require('../Constants.js')

const LegendArrow = props => (
  <g>
    <svg
      x={props.xPosition}
      y={props.yPosition}
      height={Constants.getIn(['legend', 'iconHeight'])}
      width={Constants.getIn(['legend', 'iconHWidth'])}
    >
      <polygon
        transform={props.transformArrow}
        fill={props.colour}
        points="0 8.3 15.3 0 30.47 8.32 30.47
          8.97 27.71 8.97 27.71 12.38 2.44 12.38 2.42
          8.97 0 8.97 0 8.3"
      />
    </svg>
  </g>
)

LegendArrow.propTypes = {
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
  transformArrow: PropTypes.string,
  colour: PropTypes.string.isRequired,
}

LegendArrow.defaultProps = {
  xPosition: 0,
  yPosition: 0,
  transformArrow: '',
}

const mapStateToProps = ({ viewport }) => ({ viewport })
module.exports = ReactRedux.connect(mapStateToProps)(LegendArrow)
