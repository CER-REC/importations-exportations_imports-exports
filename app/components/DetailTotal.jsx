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
      <span className="totalType">
        {TR.getIn(['importExportMenu', props.type, props.language])}
      </span>&nbsp;
      {(props.amountUnit === 'CAN$/MW.h' || props.amountUnit === 'CN$/GJ')
        ? TR.getIn(['detailTotal', 'average', props.language])
        : TR.getIn(['detailTotal', 'total', props.language])}&nbsp;
      {humanNumber(props.value, props.language)}&nbsp;
      {TR.getIn(['amounts', props.amountUnit, props.language])}&nbsp;
    </div>
    <div className="percentage">{props.value === 0 ? '0%' : '100%'}</div>
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
