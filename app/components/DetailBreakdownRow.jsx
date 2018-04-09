import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './DetailBreakDown.scss'
import Tr from '../TranslationTable'
import { humanNumber } from '../utilities'

const DetailBreakdownRow = props => (
  <tr className="detailBreakDownText">
    <td width={props.colorBox?'14px':'0px'} style={{verticalAlign: 'baseline'}}>{props.colorBox}</td>
    <td width="200px">
      {props.labelPrefix}
      <span className="detailBolded"> {props.label}</span>{props.labelSuffix}&nbsp;
      <span style={{display: 'inline-block' }}>{humanNumber(props.value, props.language)}</span>&nbsp;
      <span style={{display: 'inline-block' }}>{Tr.getIn(['amounts', props.unit, props.language])}</span>&nbsp;
      <span style={{display: 'inline-block' }}>{((props.total === 0) ? 0.0 : (props.value / props.total) * 100).toFixed(2)}%</span>&nbsp;
    </td>
    <td width="40px" style={{ display: 'inline-block' }}>
      <div className="percentage-bar">
        <span
          style={{ ...props.progressBarStyle, width: `${((props.total === 0) ? 0.0 : (props.value / props.total) * 100)}%` }}
        />
      </div>
    </td>
  </tr>
)

DetailBreakdownRow.defaultProps = {
  value: 0,
}

DetailBreakdownRow.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  progressBarStyle: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
}

export default connect(({ language }) => ({ language }))(DetailBreakdownRow)
