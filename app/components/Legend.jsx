import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import LegendArrow from './LegendArrow'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import { humanNumber } from '../utilities'
import { binSelector } from '../selectors/data'

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
    return (
      <svg
        className="importColumn"
      >
        <g>
          <g>
            <text
              className="theLegendHeading"
              x={Constants.getIn(['legend', 'importHeadingX'])}
              y={Constants.getIn(['legend', 'headingY'])}
            >
              {Tr.getIn(['theLegendValues', 'importations', this.props.language])}
            </text>
          </g>

          <g transform={transformImportColumn}>
            <LegendArrow
              yPosition={Constants.getIn(['legend', 'bin1Y'])}
              colour="#fed190"
            />
            <LegendArrow
              yPosition={Constants.getIn(['legend', 'bin2Y'])}
              colour="#fdae61"
            />
            <LegendArrow
              yPosition={Constants.getIn(['legend', 'bin3Y'])}
              colour="#ff774c"
            />
            <LegendArrow
              yPosition={Constants.getIn(['legend', 'bin4Y'])}
              colour="#d71c27"
            />
            <LegendArrow
              yPosition={Constants.getIn(['legend', 'bin5Y'])}
              colour="#a50026"
            />
          </g>
        </g>
      </svg>
    )
  }

  exportColumn() {
    const transformExportColumn = `translate(${Constants.getIn(['legend', 'exportColumn'])} 0)`
    const rotateArrow = 'rotate(180, 15, 5.5)'
    return (
      <svg
        className="exportColumn"
      >
        <text
          className="theLegendHeading"
          x={Constants.getIn(['legend', 'exportHeadingX'])}
          y={Constants.getIn(['legend', 'headingY'])}
        > {Tr.getIn(['theLegendValues', 'exportations', this.props.language])}
        </text>

        <g transform={transformExportColumn}>
          <LegendArrow
            yPosition={Constants.getIn(['legend', 'bin1Y'])}
            colour="#d6eaf6"
            transformArrow={rotateArrow}
          />
          <LegendArrow
            yPosition={Constants.getIn(['legend', 'bin2Y'])}
            colour="#9ecae1"
            transformArrow={rotateArrow}
          />
          <LegendArrow
            yPosition={Constants.getIn(['legend', 'bin3Y'])}
            colour="#5698cb"
            transformArrow={rotateArrow}
          />
          <LegendArrow
            yPosition={Constants.getIn(['legend', 'bin4Y'])}
            colour="#1c64b2"
            transformArrow={rotateArrow}
          />
          <LegendArrow
            yPosition={Constants.getIn(['legend', 'bin5Y'])}
            colour="#084594"
            transformArrow={rotateArrow}
          />
        </g>
      </svg>
    )
  }

  textValues() {
    const bins = this.props.bins.toJS()
    const transformString = `translate(${Constants.getIn(['legend', 'textValuePosition'])} 0)`
    const humanNumberLang = v => humanNumber(v, this.props.language)
    return (
      <svg>
        <g transform={transformString}>
          <text
            className="theLegendValues"
            y={Constants.getIn(['legend', 'rangeOneY'])}
          > {bins[0].map(humanNumberLang).join('-')}
          </text>
          <text
            className="theLegendValues"
            y={Constants.getIn(['legend', 'rangeTwoY'])}
          > {bins[1].map(humanNumberLang).join('-')}
          </text>
          <text
            className="theLegendValues"
            y={Constants.getIn(['legend', 'rangeThreeY'])}
          > {bins[2].map(humanNumberLang).join('-')}
          </text>
          <text
            className="theLegendValues"
            y={Constants.getIn(['legend', 'rangeFourY'])}
          > {bins[3].map(humanNumberLang).join('-')}
          </text>
          <text
            className="theLegendValues"
            y={Constants.getIn(['legend', 'rangeFiveY'])}
          > {bins[4].map(humanNumberLang).join('-')}
          </text>
        </g>
      </svg>
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
    return <g>{this.shownLegend()}</g>
  }
}

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  language: state.language,
  importExportVisualization: state.importExportVisualization,
  bins: binSelector(state, props),
})


module.exports = connect(mapStateToProps)(Legend)
