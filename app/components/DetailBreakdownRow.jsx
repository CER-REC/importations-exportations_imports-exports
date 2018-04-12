import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './DetailBreakDown.scss'
import PercentageBar from './PercentageBar'
import Tr from '../TranslationTable'
import { humanNumber } from '../utilities'

const DetailBreakdownRow = props => (
  <tr className="detailBreakDownText">
    <td width={props.colorBox?'14px':'0px'} style={{verticalAlign: 'baseline'}}>{props.colorBox}</td>
    <td width="100%">{/* Extra long so that it fills all available space */}
      {props.label}&nbsp;
      <span style={{display: 'inline-block' }}>{humanNumber(props.value, props.language)}</span>&nbsp;
      <span style={{display: 'inline-block' }}>{Tr.getIn(['amounts', props.unit, props.language])}</span>&nbsp;
      <span style={{display: 'inline-block' }}>{((props.total === 0) ? 0.0 : (props.value / props.total) * 100).toFixed(2)}%</span>&nbsp;
    </td>
    <td width="40px" style={{ display: 'inline-block' }}>
      <PercentageBar
        width={((props.total === 0) ? 0.0 : (props.value / props.total) * 100)}
      />
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
  language: PropTypes.string.isRequired,
}

export default connect(({ language }) => ({ language }))(DetailBreakdownRow)
