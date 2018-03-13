import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import './DetailBreakDown.scss'
import { visualizationSettings } from '../selectors/visualizationSettings'
import TR from '../TranslationTable'
import { humanNumber } from '../utilities'
import DetailBreakdownRow from './DetailBreakdownRow'

class DetailBreakdownBody extends React.Component {
  render() {
    const { props } = this
    const bodyContent = props.trContent
    const total = props.data.reduce((acc, curr, key) => acc + curr)
    const result = props.data.map((value, key) => {
      const exportOrImportPercentage = ((total === 0) ? 0 : (value / total) * 100).toFixed(2)
      const progressBarStyle = {
        width: `${exportOrImportPercentage}%`,
        backgroundColor: props.color,
      }
      const name = props.nameMappings.getIn([key, this.props.language], '')
      return (
        <DetailBreakdownRow
          key={key}
          label={`${bodyContent.getIn(['action', this.props.language])} ${name}`}
          value={value}
          unit={props.amountUnit}
          total={total}
          progressBarStyle={progressBarStyle}
        />
      )
    })
    return result.toArray()
  }
}


DetailBreakdownBody.propTypes = {
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
  nameMappings: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
}))(DetailBreakdownBody)
