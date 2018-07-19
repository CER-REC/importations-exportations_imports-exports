import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import './DetailBreakDown.scss'

import DetailBreakdownHeader from './DetailBreakdownHeader'
import DetailBreakdownBody from './DetailBreakdownBody'
import { detailBreakdownSelector } from '../selectors/renderData'

const DetailBreakdown = (props) => {
  const { data } = props
  if (data.get('values', new Immutable.Map()).count() === 0) { return null }
  return (
    <div className={`detailBreakDown ${props.showGroup}`}>
      {!props.showHeader ? null : (
        <DetailBreakdownHeader
          trContent={props.trContent.get('header')}
          color={props.color}
          type={props.showGroup}
        />
      )}
      <table className="detailBreakDownContainer" style={{ height: props.height }}>
        <tbody>
          <DetailBreakdownBody
            trContent={props.trContent.get('body')}
            selectedCountry={props.selectedCountry}
            color={props.color}
            colors={props.colors}
            data={data}
            nameMappings={props.nameMappings}
            total={props.total}
            colorBox={props.colorBox}
            showGroup={props.showGroup}
          />
        </tbody>
      </table>
    </div>
  )
}

DetailBreakdown.defaultProps = {
  total: false,
  showHeader: true,
  colorBox: false,
  color: '',
  colors: null,
}

DetailBreakdown.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  trContent: PropTypes.instanceOf(Immutable.Map).isRequired,
  nameMappings: PropTypes.instanceOf(Immutable.Map).isRequired,
  showHeader: PropTypes.bool,
  colorBox: PropTypes.bool,
  color: PropTypes.string,
  colors: PropTypes.instanceOf(Immutable.Map),
  showGroup: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Immutable.Map).isRequired,
  total: PropTypes.bool,
  selectedCountry: PropTypes.string.isRequired,
}

export default connect((state, props) => ({
  data: detailBreakdownSelector(state, props),
}))(DetailBreakdown)
