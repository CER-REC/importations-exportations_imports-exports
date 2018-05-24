import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'

import './DetailBreakDown.scss'
import PercentageBar from './PercentageBar'
import Tr from '../TranslationTable'
import { humanNumber } from '../utilities'

import { ConfidentialIconLogo } from './ConfidentialIcon'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import { arrangeBy } from '../selectors/data'
import { visualizationSettings } from '../selectors/visualizationSettings'

import './DetailBreakDown.scss'

const unitsWithoutPercentage = ['CAN$/MW.h', 'CN$/GJ']

class PercentageBarConfidentialIcon extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = { active: false }
  }

  handleClick() {
    this.setState({ active: !this.state.active })
  }

  render() {
    const toggleClass = this.state.active ? 'show' : ''
    return (
      <div className="cofidentialTooltip" onClick={this.handleClick}>
        <svg className="confidentialIcon">
          <g transform="translate(0 0) scale(0.8)">
            <ConfidentialIconLogo/>
          </g>
        </svg>
        <span className={`tooltiptext confidentialityText ${toggleClass}`}>{`${this.props.confidential} / ${this.props.totalPoints} values confidential`}</span>
      </div>
    )
  }
}

const DetailBreakdownRow = props => (

  <tr className="detailBreakDownText">
    <td width={props.colorBox ? '14px' : '0px'} style={{ verticalAlign: 'baseline' }}>
      {!props.colorBox ? null : (
        <div
          style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            marginRight: '4px',
            backgroundColor: props.color,
          }}
        />
      )}
    </td>
    <td width="100%">{/* Extra long so that it fills all available space */}
      {props.labelPrefix}
      <span className="detailBolded"> {props.label}</span>{props.labelSuffix}&nbsp;
      <span style={{ display: 'inline-block' }}>
        {humanNumber(props.value, props.language)}
      </span>&nbsp;
      <span style={{ display: 'inline-block' }}>
        {Tr.getIn(['amounts', props.unit, props.language])}
      </span>&nbsp;
      {unitsWithoutPercentage.includes(props.unit)
        ? null
        : (
          <span style={{ display: 'inline-block' }}>
            {((props.total === 0) ? 0.0 : Math.abs(props.value / props.total) * 100).toFixed(2)}%
          </span>
        )
      }
    </td>

    {unitsWithoutPercentage.includes(props.unit)
      ? null
      : (
        <td width="40px" style={{ display: 'inline-block', position: 'relative' }}>
          <PercentageBar
            style={{ backgroundColor: props.color, ...props.progressBarStyle }}
            width={((props.total === 0) ? 0.0 : (props.value / props.total) * 100)}
          />
          {props.confidential === 0 || !props.confidentialityMenu
            ? null
            : (
              <PercentageBarConfidentialIcon
                visualization={props.importExportVisualization}
                confidential={props.confidential}
                totalPoints={props.totalPoints}
              />
            )}
        </td>
      )
    }
  </tr>
)

DetailBreakdownRow.propTypes = {
  label: PropTypes.node.isRequired,
  labelPrefix: PropTypes.node,
  labelSuffix: PropTypes.node,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  colorBox: PropTypes.bool,
  color: PropTypes.string,
  progressBarStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

DetailBreakdownRow.defaultProps = {
  colorBox: false,
  labelPrefix: null,
  labelSuffix: null,
  progressBarStyle: {},
}

export default connect(({ language, confidentialityMenu, importExportVisualization }) =>
  ({ language, confidentialityMenu, importExportVisualization }))(DetailBreakdownRow)
