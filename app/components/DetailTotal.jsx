import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailTotal.scss'
import PercentageBar from './PercentageBar'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { detailBreakdownTotal } from '../selectors/renderData'
import TR from '../TranslationTable'
import { humanNumber } from '../utilities'

const unitsWithoutPercentage = ['CAN$/MW.h', 'CN$/GJ']

const DetailTotal = props => (
  <div className={`detailTotal ${props.type}`}>
    <div className={`detailText ${unitsWithoutPercentage.includes(props.amountUnit) ? '' : 'with-percentage'}`}>
      <span className="totalType">
        {TR.getIn(['importExportMenu', props.type, props.language])}
      </span>
      {props.valueAverage && !unitsWithoutPercentage.includes(props.amountUnit)
        ? ''
        : ` ${TR.getIn(['detailTotal', (props.valueAverage ? 'average' : 'total'), props.language])}`}&nbsp;
      {humanNumber(props.total, props.language)}&nbsp;
      {TR.getIn(['amounts', props.amountUnit, props.language])}&nbsp;
    </div>
    {unitsWithoutPercentage.includes(props.amountUnit)
      ? null
      : <div className="detailBreakDownContainer"><PercentageBar width={100} /></div>
    }
  </div>
)

DetailTotal.propTypes = {
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  valueAverage: PropTypes.oneOf([false, true, 'weighted']),
}

DetailTotal.defaultProps = {
  valueAverage: false,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
  total: detailBreakdownTotal(state, props),
}))(DetailTotal)
