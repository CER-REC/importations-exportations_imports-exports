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
        y={y}
        width={textOffset + 1}
        height={height}
        fill="#666"
      />
      <text x={0} y={0} fill="#999" textAnchor="end" aria-hidden>{of}&nbsp;</text>
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
  let yOffset = Constants.getIn(['menuBar', 'visualizationPadding']) / 2
  const tabIndex = Constants.getIn(['tabIndex','start', 'menuBar'])
  const options = ['electricity', 'crudeOil', 'naturalGas', 'naturalGasLiquids', 'refinedPetroleumProducts']
    .sort((a, b) => (b === props.importExportVisualization ? 1 : 0))
    .map((option) => {
      const translated = Tr(['mainMenuBar', option])
      let el = (
        <text
          key={option}
          x={textOffset}
          y={yOffset}
          className="menuOption"
          {...handleInteractionWithTabIndex(tabIndex, props.setVisualization, option)}
          role="menuitem"
          aria-label={Tr(['unabbreviated', 'mainMenuBar', option])}
        >
          {translated}
        </text>
      )

      if (option === props.importExportVisualization) {
        el = (
          <g
            key={option}
            transform={`translate(0 ${yOffset})`}
            aria-current
            role="menuitem"
            tabIndex={tabIndex}
            aria-label={Tr(['unabbreviated', 'mainMenuBar', option])}
          >
            <g transform={`translate(${textOffset} 0)`}>
              <TextBox
                padding={0}
                boxStyles={{ fill: '#666' }}
                textStyles={{ className: 'bold menuOption', style: { fill: '#fff' } }}
                unsizedContent={SelectedPrefix(Tr(['menu', 'of']))}
              >
                {translated}&nbsp;
              </TextBox>
            </g>
          </g>
        )
      }

      yOffset += Constants.getIn(['menuBar', 'visualizationPadding'])
      return el
    })
  return (
    <g transform={`translate(${props.left} ${props.top})`} className="menuGroup">
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
  Tr: TrSelector(state, props),
}), { setVisualization })(VisualizationSelector)
