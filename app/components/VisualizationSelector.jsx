import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextBox from './TextBox'
import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'
import Constants from '../Constants'
import TrSelector from '../selectors/translate'
import setVisualization from '../actions/SetVisualizationCreator'

const textOffset = Constants.getIn(['menuBar', 'textLabelOffset'])
  + Constants.getIn(['menuBar', 'expandedMenuTextMargin'])

class VisualizationSelector extends React.PureComponent {
  static propTypes = {
    importExportVisualization: PropTypes.string.isRequired,
    setVisualization: PropTypes.func.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number,
    Tr: PropTypes.func.isRequired,
  }

  static defaultProps = {
    left: 0,
  }
  setVisualization = (visualization) => {
    this.props.setVisualization(visualization)
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'menuBar']),
      Constants.getIn(['analytics', 'action', 'clicked']),
      visualization,
    )
  }

  render() {
    const { Tr } = this.props
    let yOffset = Constants.getIn(['menuBar', 'visualizationPadding'])
    const tabIndex = Constants.getIn(['tabIndex', 'start', 'menuBar'])
    const options = ['electricity', 'crudeOilImports', 'crudeOilExports', 'naturalGas', 'naturalGasLiquids', 'refinedPetroleumProducts']
      .map((option) => {
        const translated = Tr(['mainMenuBar', option])
        const textWithBox = (
          <TextBox padding={1} boxStyles={{ fill: 'white', stroke: '#b3b3b3', strokeWidth: 0.5 }}>
            &nbsp;{translated}&nbsp;
          </TextBox>
        )
        let el = (
          <g
            key={option}
            transform={`translate(0 ${yOffset})`}
            x={textOffset}
            className="menuOption"
            {...handleInteractionWithTabIndex(tabIndex, this.setVisualization, option)}
            role="menuitem"
            aria-label={Tr(['unabbreviated', 'mainMenuBar', option])}
          >
            <defs>
              <filter id="controlAreaOutline" x="0" y="0">
                <feOffset result="offOut" in="SourceAlpha" dx="-20" dy="-12" />
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(3 0)">
              {/* Render with and without filter to fix Firefox blur bug */}
              <g filter="url(#controlAreaOutline)">{textWithBox}</g>
              {textWithBox}
            </g>
          </g>
        )

        let prefix = null
        if (this.props.language === 'fr' && this.props.importExportVisualization === 'electricity') {
          prefix =
            <tspan className="prefix" aria-hidden>{Tr(['menu', 'ofElectricity'])}&nbsp;</tspan>
        }
        if (this.props.language === 'fr' && this.props.importExportVisualization !== 'electricity') {
          prefix =
            <tspan className="prefix" aria-hidden>{Tr(['menu', 'of'])}&nbsp;</tspan>
        }

        if (option === this.props.importExportVisualization) {
          el = (
            <g
              key={option}
              transform={`translate(3 ${yOffset})`}
              aria-current
              role="menuitem"
              tabIndex={tabIndex}
              aria-label={Tr(['unabbreviated', 'mainMenuBar', option])}
            >
              <TextBox
                padding={1}
                boxStyles={{ fill: '#666' }}
                textStyles={{ className: 'bold menuOption', style: { fill: '#fff' } }}
              >
                &nbsp;{prefix}{translated}&nbsp;
              </TextBox>
            </g>
          )
        }

        yOffset += Constants.getIn(['menuBar', 'visualizationPadding']) + 8
        return el
      })
    return (
      <g transform={`translate(${this.props.left} ${this.props.top - 5})`} className="menuGroup" >
        {options}
      </g>
    )
  }
}

export default connect((state, props) => ({
  importExportVisualization: state.importExportVisualization,
  language: state.language,
  Tr: TrSelector(state, props),
}), { setVisualization })(VisualizationSelector)
