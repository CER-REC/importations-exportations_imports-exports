import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import PaddMapPiece from './PaddMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import TRSelector from '../selectors/translate'
import Tr from '../TranslationTable'
import { getFullyFilteredValues } from '../selectors/renderData'

import PaddOne from './Padds/PaddOne'
import PaddTwo from './Padds/PaddTwo'
import PaddThree from './Padds/PaddThree'
import PaddFour from './Padds/PaddFour'
import PaddFive from './Padds/PaddFive'
import PaddNonUSA from './Padds/PaddNonUSA'
import ConfidentialIcon from './ConfidentialIcon'

import ExplanationDot from './ExplanationDot'

import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'

import { arrangeBy, binSelector, selection } from '../selectors/data'
import { setSelection } from '../actions/visualizationSettings'

const emptyMap = new Immutable.Map()

const mapPieceTransformStartTop = (top, position, dimensions, mapPieceScale) => top + (position.get('y') * ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding')))
const mapPieceTransformStartLeft = (left, position, dimensions, mapPieceScale) => left + (position.get('x') * ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding')))

class PaddLayout extends React.Component {

  static propTypes = {
    /*
    arrangeBy: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    confidentialityMenu: PropTypes.bool.isRequired,
    selectedEnergy: PropTypes.string.isRequired,
    */
  }

  getColorIndex(value) {
    return this.props.bins.findIndex(range => range.get(0) <= value && value < range.get(1))
  }
  getPaddColor(value) {
    if (!value || value === -1) { value = 0 } // eslint-disable-line no-param-reassign
    if (value === 0) { return 'rgb(237, 227, 203)' }
    const index = this.getColorIndex(value)
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }

  renderConfidentialPopover(leftPadding, paddGroupId, style, confidentialCount, totalCount, left, top, transformTranslate) {
    const energyType = this.props.selectedEnergy
    const scaleingAdjustmentX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -17 : style.getIn([energyType, 'scaleingAdjustmentX'], 0)
    const scaleingAdjustmentY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -12 : style.getIn([energyType, 'scaleingAdjustmentY'], 0)
    let paddContainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + transformTranslate.get('left') - style.getIn([energyType, 'xPadding'], 0) + scaleingAdjustmentX)
    let paddContainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top + transformTranslate.get('top') - style.getIn([energyType, 'yPadding'], 0) + scaleingAdjustmentY)
    if (this.props.arrangeBy !== 'location') {
      paddContainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + transformTranslate.get('left') + style.getIn([energyType, 'xExportPadding'], 0) + leftPadding)
      paddContainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top + transformTranslate.get('top') + style.getIn([energyType, 'yExportPadding'], 0))
    }
    if (energyType === 'crudeOilExports') {
      paddContainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + transformTranslate.get('left') + style.getIn([energyType, 'xExportPadding'], 0) + 135)
      paddContainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + transformTranslate.get('top') + style.getIn([energyType, 'yExportPadding'], 0) + 150)
    }
    if (energyType === 'crudeOilExports' && this.props.arrangeBy !== 'location') {
      paddContainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + transformTranslate.get('left') + style.getIn([energyType, 'xExportPadding'], 0) + leftPadding + 130)
      paddContainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top + transformTranslate.get('top') + style.getIn([energyType, 'yExportPadding'], 0) + 200)
    }
    let xPosition = 30
    let yPosition = 0
    if (paddGroupId === 'ca') {
      xPosition = 36
      yPosition = 13
      paddContainerX = this.props.left + left + 135 + scaleingAdjustmentX
      paddContainerY = this.props.top + top - 10 + scaleingAdjustmentY
    }
    if (style && confidentialCount > 0
      && this.props.confidentialityMenu) {
      return (<g transform="translate(145 143)">
        <ConfidentialIcon
          styles={style.get('confidentialStyle')}
          text={`${confidentialCount} / ${totalCount} ${this.props.TRSelector('valuesConfidential')}`}
          containerX={paddContainerX}
          containerY={paddContainerY}
          textX={-80}
          textY={-38}
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
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', country])
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
    if (country === 'ca') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 10 : -100
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : -10
      canadaExplanation = (<g transform="translate(145 143)">
        <ExplanationDot
          scale="scale(1)"
          lineStroke="1"
          textBoxWidth={140}
          textBoxHeight={150}
          linePath="
            M142.16,
            173.94l24.26,
            36.69a40.12,
            40.12,0,0,0,
            33.47,
            18H328.2"
          xPosition={50}
          yPosition={-10}
          lineX={142.16}
          lineY={173}
          textX={46}
          textY={58}
          containerX={this.props.left + 330 + scaleContainerX}
          containerY={this.props.top + 14 + scaleContainerY}
          name="canadaExplanation"
          text={`${this.props.TRSelector(['explanations', 'canadaPaddCrudeOil'])}`}
        />
      </g>)
    }

    let paddIExplanation = null
    let textString = `${this.props.TRSelector(['explanations', 'paddICrudeOil'])}`
    scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 90 : 87
    scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 225 : 270
    let paddIExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
    let paddIExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      textString = `${this.props.TRSelector(['explanations', 'paddINaturalGasLiquids'])}`
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 70 : 84
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 225 : 265
      paddIExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddIExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids' && this.props.arrangeBy === 'amount') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 70 : 68
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : 0
      paddIExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddIExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (this.props.arrangeBy === 'exports' && this.props.selectedEnergy === 'crudeOilExports') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 148 : 145
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : 0
      paddIExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddIExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (country !== 'ca' && paddGroupId === 'PADD I') {
      paddIExplanation = (<g transform="translate(145 143)">
        <ExplanationDot
          scale="scale(0.6)"
          lineStroke="1.4"
          textBoxWidth={290}
          textBoxHeight={150}
          linePath="
            M142.16,
            173.94l24.26,
            36.69a40.12,
            40.12,0,0,0,
            33.47,
            18H828.2"
          xPosition={20}
          yPosition={0}
          lineX={142.16}
          lineY={173}
          textX={26}
          textY={36}
          containerX={paddIExplanationcontainerX}
          containerY={paddIExplanationcontainerY}
          name={`${this.props.selectedEnergy} paddIExplanation`}
          text={textString}
        />
      </g>)
    }

    let paddVExplanation = null
    scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -170 : -180
    scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 225 : 270
    let paddVExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
    let paddVExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -190 : -175
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 225 : 265
      paddVExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddVExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids' && this.props.arrangeBy === 'amount') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 148 : 145
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : 0
      paddVExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddVExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (this.props.arrangeBy === 'exports' && this.props.selectedEnergy === 'crudeOilExports') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 230 : 225
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 0 : 0
      paddVExplanationcontainerX = this.props.viewport.get('changeWidthRatio') * (this.props.left + left + scaleContainerX)
      paddVExplanationcontainerY = this.props.viewport.get('changeHeightRatio') * (this.props.top + top - scaleContainerY)
    }
    if (country !== 'ca' && paddGroupId === 'PADD V') {
      paddVExplanation = (<g transform="translate(145 143)">
        <ExplanationDot
          scale="scale(0.4)"
          lineStroke="1.4"
          textBoxWidth={277}
          textBoxHeight={150}
          linePath="
            M142.16,
            173.94l24.26,
            36.69a40.12,
            40.12,0,0,0,
            33.47,
            18H828.2"
          xPosition={20}
          yPosition={0}
          lineX={142.16}
          lineY={173}
          textX={23}
          textY={25}
          containerX={paddVExplanationcontainerX}
          containerY={paddVExplanationcontainerY}
          name={`${this.props.selectedEnergy} paddVExplanation`}
          text={`${this.props.TRSelector(['explanations', 'padd'])}`}
        />
      </g>)
    }

    return (<g className={fontClassName} transform={`translate(${left + transformTranslate.get('left')} ${top + transformTranslate.get('top')})`}>
      <text transform={`translate(${transformText.get('left')} ${transformText.get('top')})`}>{text}</text>
      <polygon fill={color} transform="translate(0 140)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68" />
      {confidentialIcon}
      {canadaExplanation}
      {paddIExplanation}
      {paddVExplanation}
    </g>)
  }

  getOpacityOfPadd(props, paddGroup) {
    if (props.country !== props.selctionState.get('country')) { return 1 }
    if (props.selctionState.get('origins').count() === 0) { return 1 }
    return props.selctionState.get('origins').includes(paddGroup) ? 1 : 0.5
  }
  getTabIndex(country) {
    if (country === 'ca') {
      return Constants.getIn(['tabIndex', 'start', 'visualization', 'caPadd'])
    }
    return Constants.getIn(['tabIndex', 'start', 'visualization', 'usPadd'])
  }
  onPaddClick = (props, paddGroup) => {
    const { selctionState } = props
    let { country } = props
    let origins = []
    if (country === 'ca') {
      origins = []
      country = null
    } else if (selctionState.get('country') === country) {
      const paddGroupExists = selctionState.get('origins').indexOf(paddGroup)
      if (paddGroupExists === -1) {
        origins = selctionState.get('origins').push(paddGroup).toJS()
      } else {
        origins = selctionState.get('origins').delete(paddGroupExists)
        if (origins.count() === 0) {
          country = null
        }
      }
    } else {
      origins = [paddGroup]
    }

    /** Analytics reporting: start */
    // Creating event detail
    const eventDetail = paddGroup
    // report even to analytics
    const paddGroupNumber = origins.indexOf(paddGroup)
    analyticsReporter(
      Constants.getIn(['analytics', 'category', 'padd']),
      Constants.getIn(['analytics', 'action', ((paddGroupNumber > -1) ? 'selected' : 'unselected')]),
      eventDetail,
    )
    /** Analytics reporting: Finish */

    props.savePaddState({
      country,
      origins,
    })
  }

  renderDefault() {
    const { props } = this
    let left = 0
    const paddingBetweenSortedElement = 80
    const allValues = props.data.get('values')
    const viz = props.selectedEnergy
    const layout = Constants.getIn(['dataloader', 'mapping', 'padd'])
      .flatten()
      .filter((_, k) => {
        if (viz === 'naturalGasLiquids' && k === 'Non-USA') { return false }
        if (viz === 'crudeOilExports' && k === 'Mexico') { return false }
        return true
      })
      .map((_, k) => {
        if (!allValues.has(k)) { return 0 }
        return allValues.get(k, emptyMap).reduce((acc, next) => acc + next, 0)
      })
      .sort((a, b) => b - a)
      .reduce((acc, paddValue, paddGroup) => {
        let paddLayout = null
        const color = this.getPaddColor(paddValue)
        switch (paddGroup) {
          case 'PADD I':
            paddLayout = <PaddOne color={color} />
            break
          case 'PADD II':
            paddLayout = <PaddTwo color={color} />
            break
          case 'PADD III':
            paddLayout = <PaddThree color={color} />
            break
          case 'PADD IV':
            paddLayout = <g transform="translate(10 0)"><PaddFour color={color} /></g>
            break
          case 'PADD V':
            paddLayout = <PaddFive color={color} />
            break
          case 'Mexico':
          case 'Non-USA':
            paddLayout = <PaddNonUSA color={color} />
            break
          default: return acc
        }

        const fillOpacity = this.getOpacityOfPadd(props, paddGroup)
        paddLayout = (
          <g
            className="paddLayout"
            fillOpacity={fillOpacity}
            strokeOpacity={fillOpacity === 1 ? 1 : 0}
            key={`${props.arrangeBy}_${paddGroup}`}
            transform={`translate(${left} 0)`}
            {...handleInteractionWithTabIndex(this.getTabIndex(props.country), this.onPaddClick, props, paddGroup)}
          >
            {paddLayout}
            {this.getArrow(
              props.arrangeBy,
              paddGroup,
              0,
              0,
              color,
              props.data.getIn(['confidential', paddGroup], emptyMap).reduce((a, n) => a + n, 0),
              props.data.getIn(['totalPoints', paddGroup], emptyMap).reduce((a, n) => a + n, 0),
              left,
            )}
          </g>
        )
        acc.push(paddLayout)
        left += paddingBetweenSortedElement

        return acc
      }, [])
    return layout
  }
  getMapPieceTextColor(value) {
    const index = this.getColorIndex(value)
    switch (index) {
      case -1:
      case 2:
      case 3:
      case 4:
        return 'mapPieceWhiteText'
      default:
        return 'mapPieceText'
    }
  }
  renderLocation() {
    const { props } = this
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', props.country])
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === props.paddGroup)
    const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', props.country, props.paddGroup])
    // TODO Is this a good way of getting Canada's data?
    const data = props.data.getIn(['values', (paddGroup === 'ca' ? '' : paddGroup)])
    const paddValue = data
      ? data.reduce((acc, next) => acc + next, 0)
      : 0
    const color = this.getPaddColor(paddValue)
    const fillOpacity = this.getOpacityOfPadd(props, paddGroup)
    return (
      <g
        className="paddLayout"
        fillOpacity={fillOpacity}
        strokeOpacity={fillOpacity === 1 ? 1 : 0}
        {...handleInteractionWithTabIndex(this.getTabIndex(props.country), this.onPaddClick, props, paddGroup)}
      >
        <filter id="paddOutline">
          <feMorphology operator="dilate" in="SourceAlpha" radius="1.5" />
          <feColorMatrix result="recolored" type="matrix" values="-1 0 0 1 0, 0 -1 0 1 0, 0 0 -1 1 0, 0 0 0 1 0" />
          <feMerge>
            <feMergeNode in="recolored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g filter="url(#paddOutline)" >
          {layout.map((position, key) => (
            <PaddMapPiece
              key={`paddLayout_${props.country}_${position.get('name')}`}
              originKey={position.get('originKey')}
              dimensions={dimensions}
              styles={styles}
              color={color}
              left={mapPieceTransformStartLeft(props.left, position, dimensions, mapPieceScale)}
              top={mapPieceTransformStartTop(props.top, position, dimensions, mapPieceScale)}
              mapPieceStyleClass={this.getMapPieceTextColor(paddValue)}
              isLabelRquired={props.arrangeBy === 'location'}
            />
          ))}
        </g>
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
    if (this.props.arrangeBy === 'location' || this.props.country === 'ca') {
      return this.renderLocation()
    }
    return this.renderDefault()
  }
}

const mapDispatchToProps = { savePaddState: setSelection }

const mapStateToProps = (state, props) => ({
  viewport: state.viewport,
  selctionState: selection(state, props),
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  TRSelector: TRSelector(state, props),
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
  expandCollapseConfidentiality: state.expandCollapseConfidentiality,
  data: getFullyFilteredValues(state, {
    ...props,
    valueKey: 'activity',
    groupBy: ['originKey', 'destinationKey'],
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaddLayout)
