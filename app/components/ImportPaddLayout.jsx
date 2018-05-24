import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import PaddMapPiece from './PaddMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
/*
import { PaddSelector } from '../selectors/Padd'
import { aggregateLocationPaddData } from '../selectors/data'
*/
import TRSelector from '../selectors/translate'
import Tr from '../TranslationTable'
import { getFullyFilteredValues } from '../selectors/renderData'

import ConfidentialIcon from './ConfidentialIcon'

import { handleInteractionWithTabIndex } from '../utilities'

import { arrangeBy, binSelector, selection } from '../selectors/data'
import { setSelection } from '../actions/visualizationSettings'

const emptyMap = new Immutable.Map()

const mapPieceTransformStartTop = (top, position, dimensions, mapPieceScale) => top + (position.get('y') * ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding')))
const mapPieceTransformStartLeft = (left, position, dimensions, mapPieceScale) => left + (position.get('x') * ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding')))

class ImportPaddLayout extends React.Component {
  static propTypes = {

    arrangeBy: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    selectedEnergy: PropTypes.string.isRequired,
  }
  getColorIndex(value) {
    return this.props.bins.findIndex(range => range.get(0) <= value && value < range.get(1))
  }
  getPaddColor(value) {
    if (!value || value === -1) { value = 0 } // eslint-disable-line no-param-reassign
    if (value === 0) { return 'rgb(237, 227, 203)' }
    const index = this.getColorIndex(value)
    return Constants.getIn(
      ['styleGuide', 'importColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ImportDefault']),
    )
  }

  renderConfidentialPopover(leftPadding, paddGroupId, style, confidentialCount, totalCount, left, top, transformTranslate) {
    const energyType = 'crudeOil'
    const scaleingAdjustmentX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -17 : style.getIn([energyType, 'scaleingAdjustmentX'], 0)
    const scaleingAdjustmentY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -12 : style.getIn([energyType, 'scaleingAdjustmentY'], 0)
    const xPosition = 36
    const yPosition = 13
    const paddContainerX = this.props.left + left + 135 + scaleingAdjustmentX
    const paddContainerY = this.props.top + top - 10 + scaleingAdjustmentY
    if (style && confidentialCount > 0
      && this.props.confidentialityMenu) {
      return (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          scale="scale(1)"
          text={`${confidentialCount} / ${totalCount} ${this.props.TRSelector('valuesConfidential')}`}
          containerX={paddContainerX}
          containerY={paddContainerY}
          lineX={142.16}
          lineY={173}
          textX={18}
          textY={23}
          xPosition={xPosition}
          yPosition={yPosition}
          name={`${paddGroupId}${this.props.selectedEnergy}Confidentiality`}
        />
      </g>)
    }
    return null
  }
  getArrow(orderBy, paddGroupId, left, top, color, confidentialCount = 0, totalCount, leftPadding = 0) {
    if (typeof paddGroupId === 'undefined' && paddGroupId === '') {
      return null
    }
    orderBy = orderBy === 'location' ? orderBy : 'default'
    const country = this.props.country
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', paddGroupId])
    const fontClassName = mapLayoutGrid.getIn(['arrow', 'fontClass'])
    const transformTranslate = mapLayoutGrid.getIn(['arrow', 'orderBy', orderBy, paddGroupId])
    const transformText = mapLayoutGrid.getIn(['arrow', 'textTranslate', paddGroupId])
    const text = this.props.TRSelector(['Padd', country, paddGroupId])
    const style = mapLayoutGrid.get('styles', false)
    const confidentialIcon = this.renderConfidentialPopover(
      leftPadding,
      paddGroupId,
      style,
      confidentialCount,
      totalCount,
      left,
      top,
      transformTranslate,
    )
    let scaleContainerX = 0
    let scaleContainerY = 0
    let canadaExplanation = null
    scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 10 : -100
    scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : -10
    canadaExplanation = (<g transform="translate(145 143)">
      
    </g>)

    return (<g className={fontClassName} transform={`translate(${left + transformTranslate.get('left')} ${top + transformTranslate.get('top')})`}>
      {this.breakLine(text, transformText.get('left'), transformText.get('top'))}
      <polygon fill={color} transform="translate(0 140) rotate(180)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68" />
      {confidentialIcon}
      {canadaExplanation}
    </g>)
  }

  breakLine(text, x, y) {
    if (text.includes('\n')) {
      const splitName = text.split('\n')
      return (
        <text textAnchor="middle" y={y - 20} aria-hidden>
          {splitName.map(text => <tspan key={text} x={x} dy="13">{text}</tspan>)}
        </text>
      )
    }
    return <text y={y} x={x}>{text}</text>
  }

  getTabIndex(country) {
    return Constants.getIn(['tabIndex', 'start', 'visualization', 'caPadd'])
  }

  onPaddClick(props, paddGroup) {
  }

  getMapPieceTextColor(value) {
    return 'mapPieceText'
  }
  renderDefault() {
    const { props } = this
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', props.paddGroup])
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === props.paddGroup)
    const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', 'ca', props.paddGroup])
    // TODO Is this a good way of getting Canada's data?
    const data = props.data.getIn(['values', 'ca'])

    const paddValue = data
      ? data.reduce((acc, next) => acc + next, 0)
      : 0
    const color = this.getPaddColor(paddValue)
    const paddColor = Constants.getIn(['styleGuide', 'colours', 'SandLight'])
    return (
      <g
        className="paddLayout"
        {...handleInteractionWithTabIndex(this.getTabIndex(props.country), this.onPaddClick, props, paddGroup)}
      >
        {layout.map((position, key) => (
          <PaddMapPiece
            key={`paddLayout_${props.country}_${position.get('name')}`}
            originKey={position.get('originKey')}
            dimensions={dimensions}
            styles={styles}
            color={paddColor}
            left={mapPieceTransformStartLeft(props.left, position, dimensions, mapPieceScale)}
            top={mapPieceTransformStartTop(props.top, position, dimensions, mapPieceScale)}
            mapPieceStyleClass={this.getMapPieceTextColor(paddValue)}
            isLabelRquired={props.arrangeBy === 'location'}
          />
        ))}
        {this.getArrow(
          this.props.arrangeBy,
          this.props.paddGroup,
          this.props.left,
          this.props.top,
          color,
          props.data.getIn(['confidential', paddGroup], emptyMap).reduce((a, n) => a + n, 0),
          props.data.getIn(['totalPoints', paddGroup], emptyMap).reduce((a, n) => a + n, 0),
        )}
      </g>
    )
  }

  render() {
    return this.renderDefault()
  }
}

const mapDispatchToProps = { savePaddState: setSelection }

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  selctionState: selection(state, props),
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  // Padd: PaddSelector(state, props),
  TRSelector: TRSelector(state, props),
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
  expandCollapseConfidentiality: state.expandCollapseConfidentiality,
  // paddData: aggregateLocationPaddData(state, props),
  data: getFullyFilteredValues(state, {
    ...props,
    valueKey: 'activity',
    groupBy: ['originCountry', 'destinationCountry'],
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportPaddLayout)
