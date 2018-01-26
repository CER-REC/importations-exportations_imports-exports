import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextBox from './TextBox'
import { handleInteraction } from '../utilities'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import setVisualization from '../actionCreators/SetVisualizationCreator'

const VisualizationSelector = (props) => {
  let yOffset = Constants.getIn(['menuBar', 'visualizationPadding']) / 2
  const textOffset = Constants.getIn(['menuBar', 'textLabelOffset'])
    + Constants.getIn(['menuBar', 'expandedMenuTextMargin'])
  const options = ['electricity', 'crudeOil', 'naturalGas', 'naturalGasLiquids', 'refinedPetroleumProducts']
    .map((option) => {
      const translated = Tr.getIn(['mainMenuBar', option, props.language])
      let el = (
        <text
          key={option}
          x={textOffset}
          y={yOffset}
          className="menuOption"
          {...handleInteraction(props.setVisualization, option)}
        >
          {translated}
        </text>
      )

      if (option === props.importExportVisualization) {
        el = (
          <g key={option} transform={`translate(0 ${yOffset})`}>
            <rect
              x="0"
              y="-7.5"
              width={textOffset}
              height="15"
              fill="#666"
            />
            <text x={textOffset} y={0} fill="#999" textAnchor="end">of&nbsp;</text>
            <g transform={`translate(${textOffset} 0)`}>
              <TextBox
                padding={0}
                boxStyles={{ fill: '#666' }}
                textStyles={{ className: 'bold menuOption', style: { fill: '#fff' } }}
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
  language: PropTypes.string.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number,
}

VisualizationSelector.defaultProps = {
  left: 0,
}

export default connect(state => ({
  importExportVisualization: state.importExportVisualization,
  language: state.language,
}), { setVisualization })(VisualizationSelector)
