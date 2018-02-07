import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailBreakDown.scss'
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
    const total = props.data.reduce((acc, curr) => acc + curr)
    const result = props.data.map((value, key) => {
      const exportOrImportPercentage = ((value / total) * 100).toFixed(2)

      const progressBarStyle = {
        width: `${exportOrImportPercentage}%`,
        backgroundColor: props.color,
      }
      const name = TR.getIn(['country', 'us', key, props.language])
      || TR.getIn(['country', 'ca', key, props.language])
      || TR.getIn(['country', 'powerpool', key, props.language]) || ''
      // get state name corresponding to the
      return (
        <tr key={key} className="detailBreakDownText">
          <td width ="95%">
          {bodyContent.getIn(['action', props.language])} &nbsp;
          {name}&nbsp;
          {humanNumber(value, props.language)}&nbsp;
          {TR.getIn(['electricityDataTypes', props.amountUnit, props.language])}&nbsp;
          {exportOrImportPercentage}%&nbsp;
          </td>
          <td width ="5%" className="progress-bar">
            <span style={progressBarStyle} />
          </td>
        </tr>
      )
    })
    return result.toArray()
  }

  renderDetailBreakdownHeader() {
    const { props } = this
    const headerContent = props.trContent.get('header')
    return (
      <thead className={`header ${props.type}`}>
        <span style={{ color: props.color }}>{headerContent.getIn(['type', props.language], '').toUpperCase()}</span> &nbsp;
        {headerContent.getIn(['action', props.language], '')}&nbsp;
        {headerContent.getIn(['adjective', props.language], '')}&nbsp;
        {headerContent.getIn(['place', props.language], '')}&nbsp;
      </thead>
    )
  }

  render() {
    const { props } = this
    if (typeof props.data !== 'undefined' && props.data.count() > 0) {
      return (
        <table className="detailBreakDown">
          {this.renderDetailBreakdownHeader()}
          <tbody className ='detailBreakDownContainer'  style={{ height: props.height }}>
            {this.renderDetailBreakdownBody()}
          </tbody>
        </table>
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
