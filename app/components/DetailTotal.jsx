import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailTotal.scss'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { detailTotal } from '../selectors/details'
import TR from '../TranslationTable'
import { humanNumber } from '../utilities'

const DetailTotal = props => (
  <div className={`detailTotal ${props.type}`}>
    <div className="detailText">
      <span className="totalType">{props.type.toUpperCase()}</span> Total&nbsp;
      {humanNumber(props.value, props.language)}&nbsp;
      {TR.getIn(['electricityDataTypes', props.amountUnit, props.language])}&nbsp;
      ({props.value === 0 ? '0%' : '100%'})
    </div>
  </div>
)

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
