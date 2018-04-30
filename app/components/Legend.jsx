import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import LegendArrow from './LegendArrow'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import { humanNumber } from '../utilities'
import { binSelector } from '../selectors/data'
import { legendBinsPosition } from '../selectors/viewport/menus'

import '../styles/Fonts.scss'
import './Legend.scss'

class Legend extends React.Component {
  static get propTypes() {
    return {
      language: PropTypes.string.isRequired,
      importExportVisualization: PropTypes.string.isRequired,
      bins: PropTypes.instanceOf(Immutable.List).isRequired,
    }
  }

  importColumn() {
    const transformImportColumn = `translate(${Constants.getIn(['legend', 'importColumn'])} 0)`
    let zeroArrow = ''
    let yPosition = 10
    if (this.props.importExportVisualization !== 'electricity') {
      yPosition = 33
      zeroArrow = <LegendArrow
          colour="#ede3cb"
        />
    }
    return (
      <g
        className="importColumn"
      >
        <g>
          <g>
            <text
              className="theLegendHeading"
              x={Constants.getIn(['legend', 'importHeadingX'])}
              y={0}
            >
              {Tr.getIn(['theLegendValues', 'importations', this.props.language])}
            </text>
          </g>

          <g transform={transformImportColumn}>
            {Constants.getIn(['styleGuide', 'importColours']).map((color, i) => (
              <LegendArrow
                key={`import-${color}`}
                yPosition={(i * 20) + yPosition}
                colour={color}
              />
            )).toArray()}
          </g>
        </g>
        <g transform="translate(0 13)">{zeroArrow}</g>
      </g>
    )
  }

  exportColumn() {
    const transformExportColumn = `translate(${Constants.getIn(['legend', 'exportColumn'])} 0)`
    let zeroArrow = ''
    let yPosition = 10
    if (this.props.importExportVisualization !== 'electricity') {
      yPosition = 33
      zeroArrow = <LegendArrow
          exportArrow="rotate(180, 15, 5.5)"
          colour="#ede3cb"
        />
    }
    return (
      <g
        className="exportColumn"
      >
        <text
          className="theLegendHeading"
          x={Constants.getIn(['legend', 'exportHeadingX'])}
          y={0}
        > {Tr.getIn(['theLegendValues', 'exportations', this.props.language])}
        </text>

        <g transform={transformExportColumn}>
          {Constants.getIn(['styleGuide', 'exportColours']).map((color, i) => (
            <LegendArrow
              exportArrow="rotate(180, 15, 5.5)"
              key={`import-${color}`}
              yPosition={(i * 20) + yPosition}
              colour={color}
            />
          )).toArray()}
        </g>
        <g transform="translate(41 13)">{zeroArrow}</g>
      </g>
    )
  }

  textValues() {
    const bins = this.props.bins.toJS()
    let transformString = `translate(${Constants.getIn(['legend', 'textValuePosition'])} 0)`
    let zeroText = ''
    if (this.props.importExportVisualization !== 'electricity') {
      zeroText = '0'
      transformString = `translate(${Constants.getIn(['legend', 'textValuePosition'])} 21)`
    }
    const humanNumberLang = v => humanNumber(v, this.props.language)
    return (
        <g transform={transformString}>
          {bins.map((value, i) => {
            if (value[0] === Number.MIN_SAFE_INTEGER && this.props.importExportVisualization === 'electricity') {
              return (
                <text className="theLegendValues" y={(i * 20) + 20} x="34" key={`bin-${i}`}>
                  &lt;={humanNumberLang(value[1])}
                </text>
              )
            }

            if (value[0] === Number.MIN_SAFE_INTEGER && this.props.importExportVisualization === 'naturalGas') {
              return (
                <text className="theLegendValues" y={(i * 20) + 20} x="34" key={`bin-${i}`}>
                  ={humanNumberLang(value[1])}
                </text>
              )
            }

            if (value[1] === Number.MAX_SAFE_INTEGER) {
              return (
                <text className="theLegendValues" y={(i * 20) + 20} key={`bin-${i}`}>
                  &gt;{humanNumberLang(value[0])}
                </text>
              )
            }

            return (
              <g key={`bin-${i}`}>
                <text className="theLegendValues" y={(i * 20) + 20}>
                  {`>${humanNumberLang(value[0])}`}
                </text>
                <text className="theLegendValues" y={(i * 20) + 20} x="38">
                  {`- ${humanNumberLang(value[1])}`}
                </text>
              </g>
            )
          })}
          <text className="theLegendValues">{zeroText}</text>
        </g>
    )
  }

  shownLegend() {
    const visualizationContainerType = this.props.importExportVisualization
    const transformCrudeOil = `translate(${Constants.getIn(['legend', 'crudeOilLegendPosition'])} 0)`
    switch (visualizationContainerType) {
      case 'crudeOil': return (
        <g transform={transformCrudeOil}>
          {this.exportColumn()}
          {this.textValues()}
        </g>
      )
      case 'naturalGas': return (
        <g>
          {this.importColumn()}
          {this.exportColumn()}
          {this.textValues()}
        </g>
      )
      case 'naturalGasLiquids': return (
        <g>
          {this.importColumn()}
          {this.exportColumn()}
          {this.textValues()}
        </g>
      )
      case 'refinedPetroleumProducts':
        return null
      case 'electricity':
      default: return (
        <g>
          {this.importColumn()}
          {this.exportColumn()}
          {this.textValues()}
        </g>
      )
    }
  }

  render() {
    if (!this.props.bins || this.props.bins.count() === 0) { return null }
    return <g transform={`translate(${this.props.left} ${this.props.top})`}>{this.shownLegend()}</g>
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  importExportVisualization: state.importExportVisualization,
  bins: binSelector(state, props),
  ...legendBinsPosition(state, props),
})


export default connect(mapStateToProps)(Legend)
