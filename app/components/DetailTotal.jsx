import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailTotal.scss'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { detailTotal } from '../selectors/details'
import TR from '../TranslationTable'

const DetailTotal = (props) => {
  let { value } = props
  let valueScale = 0
  while (value >= 1000000) {
    value = Math.round(value / 1000)
    valueScale += 1
  }
  return (
    <div className={`detailTotal ${props.type}`}>
      <div className="detailText">
        <span className="totalType">{props.type.toUpperCase()}</span> Total&nbsp;
        {value.toLocaleString()}{TR.getIn(['formatNumberUnit', props.language, valueScale])}&nbsp;
        {TR.getIn(['electricityDataTypes', props.amountUnit, props.language])}&nbsp;
        ({value === 0 ? '0%' : '100%'})
      </div>
    </div>
  )
}

DetailTotal.propTypes = {
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
  value: detailTotal(state, props),
}))(DetailTotal)
