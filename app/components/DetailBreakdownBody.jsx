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
        labelPrefix={bodyContent.getIn(['action', props.language])}
        label={name}
        value={value}
        unit={props.amountUnit}
        total={total}
        colorBox={props.colorBox}
        color={props.color || (props.colors && props.colors.get(key))}
      />
    )
  })
  return result.toArray()
}


DetailBreakdownBody.propTypes = {
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  color: PropTypes.string,
  colors: PropTypes.instanceOf(Immutable.Map),
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
  nameMappings: PropTypes.instanceOf(Immutable.Map).isRequired,
  total: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  colorBox: PropTypes.bool,
}

DetailBreakdownBody.defaultProps = {
  total: false,
  colorBox: false,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
}))(DetailBreakdownBody)
