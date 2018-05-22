import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import './DetailBreakDown.scss'
import '../styles/Fonts.scss'

const withSpace = text => (text ? `${text} ` : '')

export const DetailBreakdownHeader = ({ trContent, language, ...props }) => (
  <div className={`header ${props.type}`}>
    {withSpace(trContent.getIn(['prefix', language], ''))}
    <span style={{ color: props.color }}>
      {withSpace(trContent.getIn(['type', language], '').toUpperCase())}
    </span>
    {withSpace(trContent.getIn(['action', language], ''))}
    {withSpace(trContent.getIn(['adjective', language], ''))}
    {withSpace(trContent.getIn(['place', language], ''))}
  </div>
)

DetailBreakdownHeader.propTypes = {
  color: PropTypes.string.isRequired,
  trContent: PropTypes.instanceOf(Immutable.Map).isRequired,
  type: PropTypes.oneOf(['imports', 'exports', 'crudeOilTypeMode']).isRequired,
  language: PropTypes.string.isRequired,
}

export default connect(({ language }) => ({ language }))(DetailBreakdownHeader)
