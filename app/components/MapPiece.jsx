import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import ImportExportArrow from './ImportExportArrow'
import MapPieceLabel from './MapPieceLabel'
import ConfidentialIcon from './ConfidentialIcon'
import Constants from '../Constants'
import AnimatedGroup from './SVGAnimation/SafeAnimation'
import AnimatedMapPiece from './SVGAnimation/AnimatedMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import ExplanationDot from './ExplanationDot'
import { arrangeBy } from '../selectors/data'
import { visualizationSettings } from '../selectors/visualizationSettings'

import trSelector from '../selectors/translate'
// import tr from '../TranslationTable'

class MapPiece extends React.Component {
  static propTypes = {
    bins: PropTypes.instanceOf(Immutable.List),
    styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    dimensions: PropTypes.instanceOf(Immutable.Map).isRequired,
    // data: PropTypes.instanceOf(Immutable.Map).isRequired,
    legend: PropTypes.bool,
    confidentialityMenu: PropTypes.bool.isRequired,
    selectedEnergy: PropTypes.string.isRequired,
    isOrigin: PropTypes.bool,
    arrangeBy: PropTypes.string.isRequired,
    activity: PropTypes.string.isRequired,
    overrideArroWPosition: PropTypes.bool,
  }

  static defaultProps = {
    bins: new Immutable.List(),
    legend: false,
    isOrigin: false,
  }

  getArrowColor(type, value) {
    if (this.props.legend) { return '#fff' }

    const index = this.props.bins.findIndex(range => range.get(0) < value && value < range.get(1))
    if (type === 'imports') {
      return Constants.getIn(
        ['styleGuide', 'importColours', index],
        Constants.getIn(['styleGuide', 'colours', 'ImportDefault']),
      )
    }
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }

  breakLine(className, text, x, y) {
    let anchor = 'end'
    if (this.props.arrangeBy === 'amount') {
      anchor = 'middle'
    }
    if (text.includes('\n')) {
      const splitName = text.split('\n')
      return (
        <text className={className} y={y - 17} aria-hidden>
          {splitName.map(text => <tspan key={text} x={x} textAnchor={anchor} dy="13">{text}</tspan>)}
        </text>
      )
    }
    return <text className={className} y={y} x={x}>{text}</text>
  }

  drawLeftLabel(text) {
    const atlq = this.props.name === 'ATL-Q'
    const rowIndex = this.props.tilePosition.get('y')
    let xPosition = -15
    let yPosition = 20
    if (atlq && this.props.arrangeBy === 'amount' && (rowIndex === 0)) {
      xPosition = 20
      yPosition = -20
    }
    if (atlq && this.props.arrangeBy === 'amount' && (rowIndex === 1)) {
      xPosition = 20
      yPosition = 60
    }
    if (!text || text === '') { return null }
    return this.breakLine('mapPieceDescription', text, xPosition, yPosition)
  }

  drawArrow(type) {
    const value = this.props.value.get(type, 0)
    if (value === 0) { return null }

    let color = this.getArrowColor(type, value)
    if (typeof this.props.arrowProps !== 'undefined' &&
        typeof this.props.arrowProps.get('fill') !== 'undefined') {
      color = this.props.arrowProps.get('fill')
    }

    return (
      <ImportExportArrow
        arrowSpacing={this.props.styles.get('arrowSpacing')}
        type={type}
        color={color}
        arrowProps={this.props.arrowProps}
        text={this.props.text}
        drawLabelLabelY={this.props.drawLabelLabelY}
        drawLabelLineY={this.props.drawLabelLineY}
        drawLabelLineImportY={this.props.drawLabelLineImportY}
        drawLabelLabelImportY={this.props.drawLabelLabelImportY}
      />
    )
  }

  newBrunswickExplanation() {
    if (this.props.selectedEnergy === 'electricity'
      && this.props.name === 'NB') {
      const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 290 : 270
      const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 45 : 40
      return (<g>
        <ExplanationDot
          scale="scale(1)"
          lineStroke="1"
          textBoxWidth={140}
          linePath="
            M142.16,
            173.94l24.26,
            36.69a40.12,
            40.12,0,0,0,
            33.47,
            18H322.2"
          xPosition={28}
          yPosition={30}
          lineX={142.16}
          lineY={173.94}
          textX={40}
          textY={58}
          containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
          containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
          name="newBrunswickElectricity"
          text={`${this.props.tr(['explanations', 'newBrunswickArrow'])}`}
        />
              </g>)
    } return null
  }

  vermontExplanation() {
    if (this.props.name !== 'VT') { return null }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 185 : 190
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 410 : 435
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={130}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H295.2"
        xPosition={28}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
        name="vermontElectricity"
        text={`${this.props.tr(['explanations', 'vermontArrow'])}`}
      />
            </g>)
  }

  washingtonExplanation() {
    if (this.props.name !== 'WA') { return null }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 28 : -5
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 400 : 440
    return (<g>
      <ExplanationDot
        scale="scale(1) scale(-1 1)"
        lineStroke="1"
        textBoxWidth={120}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H314.2"
        xPosition={11}
        yPosition={-4}
        lineX={344.16}
        lineY={173}
        textX={40}
        textY={55}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
        name="washingtonElectricity"
        text={`${this.props.tr(['explanations', 'washingtonArrow'])}`}
      />
            </g>)
  }

  britishColumbiaExplanation() {
    if (this.props.name !== 'BC' || this.props.selectedEnergy === 'naturalGasLiquids') { return null }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 285 : 270
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -40 : -60
    return (<g>
      <ExplanationDot
        scale="scale(1 -1) translate(0 -100)"
        lineStroke="1"
        textBoxWidth={190}
        textBoxHeight={100}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H378.2"
        xPosition={8}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={55}
        textY={48}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
        name="britishColumbiaElectricity"
        text={`${this.props.tr(['explanations', 'britishColumbiaArrow'])}`}
      />
            </g>)
  }

  emersonExplanation() {
    if (this.props.name !== 'Emerson') { return null }
    let textString = `${this.props.tr(['explanations', 'EmersonNaturalGas'])}`
    if (['importsForReexport'].includes(this.props.activity)) {
      textString = `${this.props.tr(['explanations', 'EmersonTempImpNaturalGas'])}`
    }
    if (['exportsForReimport'].includes(this.props.activity)) {
      textString = `${this.props.tr(['explanations', 'EmersonTempExpNaturalGas'])}`
    }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 180 : 160
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 250 : 310
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={130}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H312.2"
        xPosition={-10}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 + scaleContainerY)}
        name="emersonExplanation"
        text={textString}
      />
            </g>)
  }

  cngExplanation() {
    if (this.props.name !== 'CNG') { return null }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -40 : -53
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 255 : 270
    return (<g>
      <ExplanationDot
        scale="scale(0.7) scale(-1 1) translate(-135 0)"
        lineStroke="1.3"
        textBoxWidth={210}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H514.2"
        xPosition={-10}
        yPosition={20}
        lineX={344.16}
        lineY={173}
        textX={0}
        textY={38}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 + scaleContainerY)}
        name="cngExplanation"
        text={`${this.props.tr(['explanations', 'cng'])}`}
      />
            </g>)
  }

  lngExplanation() {
    if (this.props.name !== 'LNG Other') { return null }
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -83 : -35
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 239 : 268
    return (<g>
      <ExplanationDot
        scale="scale(0.8) scale(-1.2 1) translate(-100 20)"
        lineStroke="1.3"
        textBoxWidth={190}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H384.2"
        xPosition={-10}
        yPosition={20}
        lineX={344.16}
        lineY={173}
        textX={58}
        textY={62}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 + scaleContainerY)}
        name="lngExplanation"
        text={`${this.props.tr(['explanations', 'lng'])}`}
      />
            </g>)
  }

  albertaExplanation() {
    if (this.props.name !== 'AB' || this.props.selectedEnergy !== 'naturalGasLiquids') { return null }
    let scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 241 : 190
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -16 : -30
    if (this.props.arrangeBy === 'location') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 247 : 190
    }
    return (<g>
      <ExplanationDot
        scale="scale(1 -1) translate(0 -100)"
        lineStroke="1"
        textBoxWidth={190}
        textBoxHeight={100}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H378.2"
        xPosition={8}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={48}
        textY={48}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
        name="albertaExplanation"
        text={`${this.props.tr(['explanations', 'albertaArrowNaturalGasLiquids'])}`}
      />
            </g>)
  }

  atlqExplanation() {
    if (this.props.name !== 'ATL-Q' || this.props.selectedEnergy !== 'naturalGasLiquids') { return null }
    let scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 277 : 248
    let scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -20 : -33
    if (this.props.arrangeBy === 'amount') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 248 : 215
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? -20 : -30
    }
    return (<g>
      <ExplanationDot
        scale="scale(1 -1) translate(0 -100)"
        lineStroke="1"
        textBoxWidth={190}
        textBoxHeight={100}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H378.2"
        xPosition={28}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={48}
        textY={48}
        containerX={this.props.viewport.get('changeWidthRatio') * (this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerX)}
        containerY={this.props.viewport.get('changeHeightRatio') * (this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us', 'mapPieceScale'], 1) + scaleContainerY)}
        name="atlqExplanation"
        text={`${this.props.tr(['explanations', 'atlqNaturalGasLiquids'])}`}
      />
            </g>)
  }

  renderMapPieceLabel() {
    return (
      <MapPieceLabel
        labelPosition={this.props.styles.get('labelPosition')}
        labelLineSpacing={this.props.styles.get('labelLineSpacing', 10)}
        topMargin={this.props.styles.get('bottomMargin')}
        bottomMargin={this.props.styles.get('topMargin')}
        mapPieceWidth={this.props.dimensions.get('width')}
        mapPieceHeight={this.props.dimensions.get('height')}
        mapPieceKey={this.props.mapPieceKey}
        name={this.props.name}
        mapPieceProps={this.props.mapPieceProps}
        styleClass={this.props.mapPieceStyleClass}
        text={this.props.text}
      />
    )
  }

  render() {
    let arrowStyle = {}
    if (this.props.overrideArroWPosition) {
      arrowStyle = this.props.styles.get('mapPieceArrowStyle')
    } else {
      arrowStyle = Constants.get('mapPieceArrowStyle')
    }
    let arrowTransform = `translate(${arrowStyle.get('x')}, ${arrowStyle.getIn('y') + 0.5})`
    if (this.props.styles.get('arrowPosition') === 'down') {
      arrowTransform = `translate(${arrowStyle.getIn('x')}, ${this.props.dimensions.get('height') - arrowStyle.getIn('y') + 4})`
    }

    let stroke = 'none'
    if (this.props.isMapPieceSelected === true && this.props.isOrigin) {
      stroke = 'black'
    }

    let opacity = 1
    if (this.props.isSelected === true && this.props.isMapPieceSelected === false && this.props.isOrigin) {
      opacity = 0.5
    }

    if (typeof this.props.mapPieceProps !== 'undefined'
      && typeof this.props.mapPieceProps.get('stroke') !== 'undefined'
      && this.props.mapPieceProps.get('stroke') !== '') {
      stroke = this.props.mapPieceProps.get('stroke')
    }

    let scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? -7 : -13
    let scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 8 : 8
    let textY = -34
    let textX = -80
    if (this.props.selectedEnergy === 'electricity' && this.props.arrangeBy === 'imports') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 10 : 10
    }
    let containerX = this.props.containerX + this.props.x1 + scaleContainerX
    let containerY = this.props.containerY + this.props.y1 + scaleContainerY
    if (this.props.selectedEnergy === 'naturalGasLiquids') {
      scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 255 : 225
      scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 65 : 80
      containerX = this.props.x1 * MapLayoutGridConstant.getIn(['naturalGasLiquids', 'ca', 'mapPieceScale'], 1) + scaleContainerX
      containerY = this.props.y1 * MapLayoutGridConstant.getIn(['naturalGasLiquids', 'ca', 'mapPieceScale'], 1) + scaleContainerY
    }
    if (this.props.selectedEnergy === 'naturalGasLiquids' && this.props.arrangeBy !== 'location') {
      textY = 10
    }
    if (this.props.country && this.props.country === 'powerpool') {
      containerX += 13
    }

    let strokeWidth = 1
    if (this.props.dimensions.get('strokeWidth')) {
      strokeWidth = this.props.dimensions.get('strokeWidth')
    }
    if (this.props.country === 'world') {
      textX = -55
    }
    const confidentialCount = this.props.confidential.reduce((acc, next) => acc + next, 0)
    let confidentialIcon = null
    if (confidentialCount !== 0 && this.props.confidentialityMenu) {
      const totalPoints = this.props.totalPoints.reduce((acc, next) => acc + next, 0)
      const valueString = `${confidentialCount} / ${totalPoints} ${this.props.tr('valuesConfidential')}`
      let confidentialContainerX = containerX
      let confidentialContainerY = containerY
      confidentialContainerX *= this.props.viewport.get('changeWidthRatio')
      confidentialContainerY *= this.props.viewport.get('changeHeightRatio')
      confidentialIcon = (
        <ConfidentialIcon
          styles={this.props.styles.get('confidentialStyle')}
          text={valueString}
          containerX={confidentialContainerX}
          containerY={confidentialContainerY}
          textX={textX}
          textY={textY}
          xPosition={30}
          yPosition={0}
          name={`${this.props.selectedEnergy}${this.props.name}`}
        />
      )
    }

    const mapContent = (
      <g className={`mapPiece ${this.props.legend ? 'legend' : ''}`}>
        <polygon
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={this.props.styles.get('color')}
          transform={!this.props.scaleMappiece ? 'scale(1)' : `scale(${this.props.scaleMappiece})`}
          points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"
        />
        {this.renderMapPieceLabel()}
        {this.drawLeftLabel(this.props.leftLabelText)}
        <g transform={arrowTransform}>
          {this.drawArrow('exports')}
          {this.drawArrow('imports')}
        </g>
        {confidentialIcon}
        {this.vermontExplanation()}
        {this.washingtonExplanation()}
        {this.newBrunswickExplanation()}
        {this.britishColumbiaExplanation()}
        {this.emersonExplanation()}
        {this.albertaExplanation()}
        {this.atlqExplanation()}
        {this.cngExplanation()}
        {this.lngExplanation()}
      </g>
    )

    if (this.props.legend) { return mapContent }

    return (
      <AnimatedGroup
        cssAnimation={{
          transform: `translate(${this.props.x1}px, ${this.props.y1}px)`,
          transition: 'all 1s',
        }}
        fallbackAttributes={{
          transform: `translate(${this.props.x1} ${this.props.y1})`,
        }}
        fallbackSMIL={<AnimatedMapPiece x={this.props.x1} y={this.props.y1} />}
        fillOpacity={opacity}
      >
        {mapContent}
      </AnimatedGroup>
    )
  }
}

export default connect((state, props) => ({
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
  tr: trSelector(state, props),
  viewport: state.viewport,
  arrangeBy: arrangeBy(state, props),
  activity: visualizationSettings(state, props).get('activity'),
}))(MapPiece)

