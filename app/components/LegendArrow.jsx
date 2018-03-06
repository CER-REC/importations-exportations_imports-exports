import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Constants from '../Constants'

const LegendArrow = props => (
  <g>
    <svg
      x={props.xPosition}
      y={props.yPosition}
      height={Constants.getIn(['legend', 'iconHeight'])}
      width={Constants.getIn(['legend', 'iconHWidth'])}
    >
      <g transform={props.exportArrow}>
        <polygon
          transform={props.transformArrow}
          fill={props.colour}
          points="0 8.3 15.3 0 30.47 8.32 30.47
            8.97 27.71 8.97 27.71 12.38 2.44 12.38 2.42
            8.97 0 8.97 0 8.3"
        />
      </g>
    </svg>
  </g>
)

LegendArrow.propTypes = {
  xPosition: PropTypes.number,
  yPosition: PropTypes.number,
  transformArrow: PropTypes.string,
  colour: PropTypes.string.isRequired,
  exportArrow: PropTypes.string,
}

LegendArrow.defaultProps = {
  xPosition: 0,
  yPosition: 0,
  transformArrow: '',
  exportArrow: '',
}

const mapStateToProps = ({ viewport }) => ({ viewport })
export default connect(mapStateToProps)(LegendArrow)
