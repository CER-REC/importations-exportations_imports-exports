import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import './DetailBreakDown.scss'
import { visualizationSettings } from '../selectors/visualizationSettings'
import DetailBreakdownRow from './DetailBreakdownRow'

const DetailBreakdownBody = (props) => {
  const bodyContent = props.trContent
  const total = props.total === false
    ? props.data.reduce((acc, curr) => acc + curr)
    : props.total
  const result = props.data.map((value, key) => {
    const name = props.nameMappings.getIn([key, props.language], '')
    return (
      <DetailBreakdownRow
        key={key}
        label={`${bodyContent.getIn(['action', props.language])} ${name}`}
        value={value}
        unit={props.amountUnit}
        total={total}
      />
    )
  })
  return result.toArray()
}


DetailBreakdownBody.propTypes = {
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
  nameMappings: PropTypes.instanceOf(Immutable.Map).isRequired,
  total: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
}

DetailBreakdownBody.defaultProps = {
  total: false,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
}))(DetailBreakdownBody)
