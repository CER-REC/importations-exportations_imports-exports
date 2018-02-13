import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import './DetailBreakDown.scss'

import { humanNumber } from '../utilities'
import DetailBreakdownHeader from './DetailBreakdownHeader'
import DetailBreakdownBody from './DetailBreakdownBody'
import { visualizationSettings } from '../selectors/visualizationSettings'

class DetailBreakdown extends React.Component {
  render() {
    const { props } = this
    //TR.getIn(['detailBreakDown', props.energyType, props.type])
    if (typeof props.data !== 'undefined' && props.data.count() > 0) {
      return (
        <div className="detailBreakDown">
          <DetailBreakdownHeader
            trContent= {props.trContent.get('header')}
            color={props.color}
            type={props.type}
          />
          <table className ='detailBreakDownContainer'  style={{ height: props.height }}>
            <tbody>
              <DetailBreakdownBody 
                trContent= {props.trContent.get('body')}
                color= {props.color}
                data= {props.data}
                nameMappings= {props.nameMappings}
              />
            </tbody>
          </table>
        </div>
      )
    } else {
      if(!this.props.showDefault) { return null}
      return (
        <div>
          {props.defaultContent}
        </div>
      )
    }
    return null
  }
}

DetailBreakdown.defaultProps = {
    trContent: new Immutable.Map(),
    data: new Immutable.Map(),
    nameMappings: new Immutable.Map(),
    defaultContent: '',
  }

DetailBreakdown.propTypes = {
  amountUnit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  defaultContent: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
  trContent: PropTypes.instanceOf(Immutable.Map).isRequired,
  nameMappings: PropTypes.instanceOf(Immutable.Map).isRequired,
  showDefault: PropTypes.string.isRequired,
}

export default connect((state, props) => ({
  amountUnit: visualizationSettings(state, props).get('amount'),
  language: state.language,
}))(DetailBreakdown)
