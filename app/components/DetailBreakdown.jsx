import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import './DetailBreakdown.scss'
import { visualizationSettings } from '../selectors/visualizationSettings'
import TR from '../TranslationTable'
import { timelineYearScaleCalculation } from '../selectors/timeline'
import TRSelector from '../selectors/translate'
import Constants from '../Constants'

//Add langauge compatibility
class DetailBreakdown extends React.Component {
  renderDetailBreakdownBody(props) {
    const bodyContent = props.trContent.get('body')
    const total = props.data.reduce((acc, curr) =>acc+curr)
    const result = props.data.map((value,key) => {
      const exportOrImportPercentage = ((value/total)*100).toFixed(2)
      let valueScale = 0
      while (value >= 1000000) {
        value = Math.round(value / 1000)
        valueScale += 1
      }

      const progressBarStyle ={
        width: `${exportOrImportPercentage}%`,
        backgroundColor: props.color
      }
      //get state name corresponding to the 
      return <div key={key} className="detailBreakDownText">
        {bodyContent.getIn(['action',props.language])} &nbsp; 
        {TR.getIn(['country', 'us', key, props.language], '')}&nbsp;
        {value.toLocaleString()}{TR.getIn(['formatNumberUnit', props.language, valueScale])}&nbsp;
        {TR.getIn(['electricityDataTypes', props.amountUnit, props.language])}&nbsp;
        {exportOrImportPercentage}%&nbsp;
        <div className="progress-bar">
            <span style={progressBarStyle}></span>
        </div>
      </div>
      })
    return Array.from(result.values())
  }

  renderDetailBreakdownHeader(props){
    const headerContent = props.trContent.get('header')
    return <div className={`header ${props.type}`}>
          <span style={{color: props.color}}>{headerContent.getIn(['type',props.language], '').toUpperCase()}</span> &nbsp;
          {headerContent.getIn(['action',props.language], '')}&nbsp;
          {headerContent.getIn(['adjective',props.language], '')}&nbsp;
          {headerContent.getIn(['place',props.language], '')}&nbsp;
        </div>
  }

  render() {
    const props = this.props
    if(typeof props.data !== 'undefined' && props.data.count() > 0){
      return <div className="detailBreakDown" style={{height: props.height}}>
        {this.renderDetailBreakdownHeader(props)}
        {this.renderDetailBreakdownBody(props)}
      </div>
    } else if(typeof props.timelineYears !== 'undefined' && props.showDefault){
      return <div>
        {props.TRSelector( ['detailBreakDown', props.importExportVisualization, 'defaultText'], props.timelineYears.min, props.timelineYears.max)}
      </div>
    }else{
      return <span></span>
    }
  }
}


DetailBreakdown.propTypes = {
  type: PropTypes.oneOf(['imports', 'exports']).isRequired,
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
}

export default connect((state, props) => ({
  importExportVisualization: state.importExportVisualization,
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
  TRSelector: TRSelector(state, props),
  timelineYears: timelineYearScaleCalculation(state, props),
}))(DetailBreakdown)
