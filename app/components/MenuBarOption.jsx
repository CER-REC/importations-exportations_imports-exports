import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import Tr from '../TranslationTable'
import { handleInteraction } from '../utilities'
import './MenuBarOption.scss'

class MenuBarOption extends React.Component {
  static propTypes = {
    importExportVisualization: PropTypes.string.isRequired,
    options: PropTypes.instanceOf(Immutable.List).isRequired,
    selectedOption: PropTypes.string.isRequired,
    yaxis: PropTypes.number.isRequired,
    optionPadding: PropTypes.number.isRequired,
    optionXaxisPadding: PropTypes.number.isRequired,
    trKey: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    onOptionClick: PropTypes.func.isRequired,
  }

  mainVisGreyWidth = () => {
    if (this.props.importExportVisualization === 'electricity') {
      return '110'
    } else if (this.props.importExportVisualization === 'crudeOil') {
      return '100'
    } else if (this.props.importExportVisualization === 'naturalGas') {
      return '120'
    } else if (this.props.importExportVisualization === 'naturalGasLiquids') {
      return '160'
    } else if (this.props.importExportVisualization === 'refinedPetroleumProducts') {
      return '170'
    }
    return '100'
  }

  render() {
    const { options } = this.props

    return options.map((key, index) => {
      const yaxis = this.props.yaxis + (index * this.props.optionPadding)
      const trPath = [this.props.trKey, key, this.props.language]

      if (key === this.props.selectedOption) {
        return (
          <g
            key={key}
            role="menuitem"
            tabIndex={0}
            aria-label={Tr.getIn(['unabbreviated'].concat(trPath), Tr.getIn(trPath))}
            aria-current
          >
            <rect
              x={0}
              y={yaxis - 15}
              width={this.mainVisGreyWidth()}
              height="20"
              fill="#999"
            />
            <text x={this.props.optionXaxisPadding - 7} y={yaxis}>
              <tspan fill="#666" className="visSelectOfText"> of </tspan>
              <tspan className="visSelect">{Tr.getIn(trPath).toUpperCase()}</tspan>
            </text>
          </g>
        )
      }

      return (
        <g
          key={key}
          role="menuitem"
          onClick={handleInteraction(this.props.onOptionClick, key)}
          onKeyPress={handleInteraction(this.props.onOptionClick, key)}
          tabIndex={0}
          aria-label={Tr.getIn(['unabbreviated'].concat(trPath), Tr.getIn(trPath))}
        >
          <text x={this.props.optionXaxisPadding + 7} y={yaxis} className="bodyText">
            {Tr.getIn(trPath).toUpperCase()}
          </text>
        </g>
      )
    })
  }
}

const mapStateToProps = state => ({
  viewport: state.viewport,
  importExportVisualization: state.importExportVisualization,
  language: state.language,
  expandImportExportMenu: state.expandImportExportMenu,
})

module.exports = connect(mapStateToProps)(MenuBarOption)
