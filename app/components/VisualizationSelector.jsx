import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import memoize from 'memoize-immutable'

import TextBox from './TextBox'
import { handleInteractionWithTabIndex } from '../utilities'
import Constants from '../Constants'
import TrSelector from '../selectors/translate'
import setVisualization from '../actionCreators/SetVisualizationCreator'

const textOffset = Constants.getIn(['menuBar', 'textLabelOffset'])
  + Constants.getIn(['menuBar', 'expandedMenuTextMargin'])

const SelectedPrefix = memoize((of) => {
  const UnmemoizedSelectedPrefix = ({ y, height }) => (
    <g>
      <rect
        x={-textOffset}
        y={y - 1}
        width={textOffset + 1}
        height={height + 2}
        fill="#666"
      />
      <text x={3} y={0} fill="#999" textAnchor="end" aria-hidden>{of}&nbsp;</text>
    </g>
  )

  UnmemoizedSelectedPrefix.propTypes = {
    y: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  return UnmemoizedSelectedPrefix
})

const VisualizationSelector = (props) => {
  const { Tr, importExportVisualization } = props
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
          {...handleInteractionWithTabIndex(tabIndex, props.setVisualization, option)}
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
      let transformString = ''
      if (props.language === 'fr' && props.importExportVisualization === 'electricity') {
        console.log('yes')
        prefix = SelectedPrefix(Tr(['menu', 'ofElectricity']))
        transformString = 'translate(14 0)'
      }
      if (props.language === 'fr' && props.importExportVisualization !== 'electricity') {
        prefix = SelectedPrefix(Tr(['menu', 'of']))
        transformString = 'translate(18 0)'
      }

      if (option === props.importExportVisualization) {
        el = (
          <g
            key={option}
            transform={`translate(3 ${yOffset})`}
            aria-current
            role="menuitem"
            tabIndex={tabIndex}
            aria-label={Tr(['unabbreviated', 'mainMenuBar', option])}
          >
            <g transform={transformString}>
              <TextBox
                padding={1}
                boxStyles={{ fill: '#666' }}
                textStyles={{ className: 'bold menuOption', style: { fill: '#fff' } }}
                unsizedContent={prefix}
              >
                {translated}&nbsp;
              </TextBox>
            </g>
          </g>
        )
      }

      yOffset += Constants.getIn(['menuBar', 'visualizationPadding']) + 8
      return el
    })
  return (
    <g transform={`translate(${props.left} ${props.top - 5})`} className="menuGroup" >
      {options}
    </g>
  )
}

VisualizationSelector.propTypes = {
  importExportVisualization: PropTypes.string.isRequired,
  setVisualization: PropTypes.func.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number,
  Tr: PropTypes.func.isRequired,
}

VisualizationSelector.defaultProps = {
  left: 0,
}

export default connect((state, props) => ({
  importExportVisualization: state.importExportVisualization,
  language: state.language,
  Tr: TrSelector(state, props),
}), { setVisualization })(VisualizationSelector)
