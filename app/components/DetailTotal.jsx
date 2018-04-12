import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailTotal.scss'
import PercentageBar from './PercentageBar'
import { visualizationSettings } from '../selectors/visualizationSettings'
import { detailTotal } from '../selectors/details'
import TR from '../TranslationTable'
import { humanNumber } from '../utilities'

const DetailTotal = props => (
  <div className={`detailTotal ${props.type}`}>
    <div className="detailText">
      <span className="totalType">
        {TR.getIn(['importExportMenu', props.type, props.language])}
      </span> {TR.getIn(['detailTotal', (props.average ? 'average' : 'total'), props.language])}&nbsp;
      {humanNumber(props.value, props.language)}&nbsp;
      {TR.getIn(['amounts', props.amountUnit, props.language])}&nbsp;
    </div>
    {props.average === false && (Math.abs(props.percentage) === 100 || props.percentage === 0)
      ? <div className="percentage">{Math.abs(props.percentage)}%</div>
      : (
        <div className="detailBreakDownContainer">
          <PercentageBar width={props.percentage} />
        </div>
      )
    }
  </div>
)

DetailTotal.propTypes = {
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  average: PropTypes.bool.isRequired,
  percentage: PropTypes.number.isRequired,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
  ...detailTotal(state, props),
}))(DetailTotal)
