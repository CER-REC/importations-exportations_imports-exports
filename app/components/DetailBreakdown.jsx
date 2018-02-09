import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailBreakDown.scss'
import DetailBreakdownRow from './DetailBreakdownRow'
import { visualizationSettings } from '../selectors/visualizationSettings'
import TR from '../TranslationTable'
import { timelineYearScaleCalculation } from '../selectors/timeline'
import TRSelector from '../selectors/translate'
import { humanNumber } from '../utilities'

// Add language compatibility
class DetailBreakdown extends React.Component {
  renderDetailBreakdownBody() {
    const { props } = this
    const bodyContent = props.trContent.get('body')
    const total = props.data.reduce((acc, curr) => acc + curr, 0)
    const result = props.data.map((value, key) => {
      const exportOrImportPercentage = ((value / total) * 100).toFixed(2)

      const progressBarStyle = { backgroundColor: props.color }
      const name = TR.getIn(['country', 'us', key, props.language])
      || TR.getIn(['country', 'ca', key, props.language])
      || TR.getIn(['country', 'powerpool', key, props.language]) || ''
      // get state name corresponding to the
      return (
        <DetailBreakdownRow
          key={key}
          label={`${bodyContent.getIn(['action', props.language])} ${name}`}
          value={value}
          unit={props.amountUnit}
          total={total}
          progressBarStyle={progressBarStyle}
        />
      )
    })
    return result.toArray()
  }

  renderDetailBreakdownHeader() {
    const { props } = this
    const headerContent = props.trContent.get('header')
    return (
      <div className={`header ${props.type}`}>
        <span style={{ color: props.color }}>{headerContent.getIn(['type', props.language], '').toUpperCase()}</span> &nbsp;
        {headerContent.getIn(['action', props.language], '')}&nbsp;
        {headerContent.getIn(['adjective', props.language], '')}&nbsp;
        {headerContent.getIn(['place', props.language], '')}&nbsp;
      </div>
    )
  }

  render() {
    const { props } = this
    if (typeof props.data !== 'undefined' && props.data.count() > 0) {
      return (
        <div className="detailBreakDown">
          {this.renderDetailBreakdownHeader()}
          <table className ='detailBreakDownContainer'  style={{ height: props.height }}>
            <tbody>
              {this.renderDetailBreakdownBody()}
            </tbody>
          </table>
        </div>
      )
    } else if (typeof props.timelineYears !== 'undefined' && props.showDefault) {
      return (
        <div>
          {props.TRSelector(['detailBreakDown', props.importExportVisualization, 'defaultText'], props.timelineYears.min, props.timelineYears.max)}
        </div>
      )
    }
    return null
  }
}


DetailBreakdown.propTypes = {
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
}

export default connect((state, props) => ({
  importExportVisualization: state.importExportVisualization,
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
  TRSelector: TRSelector(state, props),
  timelineYears: timelineYearScaleCalculation(state, props),
}))(DetailBreakdown)
