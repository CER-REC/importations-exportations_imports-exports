import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import './DetailBreakDown.scss'

class DetailBreakdownHeader extends React.Component {
  render() {
    const { props } = this
    const headerContent = props.trContent
    return (
      <div className={`header ${props.type}`}>
        <span style={{ color: props.color }}>{headerContent.getIn(['type', props.language], '').toUpperCase()}</span> &nbsp;
        {headerContent.getIn(['action', props.language], '')}&nbsp;
        {headerContent.getIn(['adjective', props.language], '')}&nbsp;
        {headerContent.getIn(['place', props.language], '')}&nbsp;
      </div>
    )
  }
}


DetailBreakdownHeader.propTypes = {
  color: PropTypes.string.isRequired,
  trContent: PropTypes.instanceOf(Immutable.Map).isRequired,
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  language: PropTypes.string.isRequired,
}

export default connect((state, props) => ({
  language: state.language,
}))(DetailBreakdownHeader)
