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

import trSelector from '../selectors/translate'
import tr from '../TranslationTable'

class MapPiece extends React.Component {
  static propTypes = {
    bins: PropTypes.instanceOf(Immutable.List),
    styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    dimensions: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.instanceOf(Immutable.Map).isRequired,
    legend: PropTypes.bool,
    confidentialityMenu: PropTypes.bool.isRequired,
    selectedEnergy: PropTypes.string.isRequired,
    isOrigin: PropTypes.bool,
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

  drawArrow(type) {
    let dataKey = !this.props.dataKey? []: this.props.dataKey.slice(0)
    dataKey.push(type)
    if (this.props.data.getIn(dataKey, 0) === 0) { return null}

    let color = this.getArrowColor(type, this.props.data.getIn(dataKey))
    if(typeof this.props.arrowProps !== 'undefined' && typeof this.props.arrowProps.get('fill') !== 'undefined'){
      color = this.props.arrowProps.get('fill') 
    }
    return (<ImportExportArrow
      arrowSpacing={this.props.styles.get('arrowSpacing')}
      type={type}
      color= {color}
      arrowProps={this.props.arrowProps}
      text = {this.props.text}
    />)
  }
  newBrunswickExplanation() {
    if (this.props.selectedEnergy === 'electricity'
      && this.props.data.get('name') === 'NB' ) {
      return (<g>
        <ExplanationDot
          scale="scale(1)"
          lineStroke="1"
          textBoxWidth={140}
          textBoxHeight={80}
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
          containerX={this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 333}
          containerY={this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 72}
          name="newBrunswickElectricity"
          text={`${this.props.tr(['explanations','newBrunswickArrow'])}`}
    /></g>)
    } return null
  }

  vermontExplanation() {
    if (this.props.data.get('name') !== 'VT') { return null }
    return (<g>
      <ExplanationDot
        scale="scale(1)"
        lineStroke="1"
        textBoxWidth={130}
        textBoxHeight={170}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H248.2"
        xPosition={28}
        yPosition={20}
        lineX={142.16}
        lineY={173.94}
        textX={40}
        textY={58}
        containerX={this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 263}
        containerY={this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 462}
        name="vermontElectricity"
        text={`${this.props.tr(['explanations','vermontArrow'])}`}
    /></g>)
  }

  washingtonExplanation() {
    if (this.props.data.get('name') !== 'WA') { return null }
    return (<g>
      <ExplanationDot
        scale="scale(1) scale(-1 1)"
        lineStroke="1"
        textBoxWidth={120}
        textBoxHeight={60}
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
        containerX={this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 55}
        containerY={this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 461}       
        name="washingtonElectricity"
        text={`${this.props.tr(['explanations','washingtonArrow'])}`}
    /></g>)
  }

  renderMapPieceLabel() {
    return <MapPieceLabel
        labelPosition={this.props.styles.get('labelPosition')}
        topMargin={this.props.styles.get('bottomMargin')}
        bottomMargin={this.props.styles.get('topMargin')}
        mapPieceHeight={this.props.dimensions.get('height')}
        name={this.props.data.get(this.props.mapPieceKey, '')}
        mapPieceProps={this.props.mapPieceProps}
        styleClass={this.props.mapPieceStyleClass}
        text = {this.props.text}
      />
  }

  render() {

    let arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${Constants.getIn(['mapPieceArrowStyle', 'y']) + 0.5})`
    if (this.props.styles.get('arrowPosition') === 'down') {
      arrowTransform = `translate(${Constants.getIn(['mapPieceArrowStyle', 'x'])}, ${this.props.dimensions.get('height') - Constants.getIn(['mapPieceArrowStyle', 'y']) + 4})`
    }

    let stroke = 'none'
    if (this.props.isMapPieceSelected === true) {
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

    let confidentialIcon = null
    const valueString = `${this.props.data.get('confidentialCount')} / ${this.props.data.get('totalCount')} values confidential`
    if (typeof this.props.data.get('confidentialCount') !== 'undefined'
        && this.props.data.get('confidentialCount') !== 0
        && this.props.confidentialityMenu) {
      confidentialIcon = <ConfidentialIcon
        styles={this.props.styles.get('confidentialStyle')}
        text={valueString}
        containerX={this.props.containerX + this.props.x1 + 13}
        containerY={this.props.containerY + this.props.y1 + 11}
        lineX={102}
        lineY={40}
        textX={40}
        textY={40}
        xPosition={30}
        yPosition={0}
        />
    }
    
    const mapContent = (
      <g>
        <polygon
          stroke={stroke}
          fill={this.props.styles.get('color')}
          points="37.09 9.68 18.54 0 0 9.68 0 29.05 18.54 38.73 37.09 29.05 37.09 9.68"
        />
        {this.renderMapPieceLabel()}
        <g transform={arrowTransform}>
          {this.drawArrow('exports')}
          {this.drawArrow('imports')}
        </g>
        {confidentialIcon}
        {this.vermontExplanation()}
        {this.washingtonExplanation()}
        {this.newBrunswickExplanation()}
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

const mapStateToProps = (state, props) => ({
  confidentialityMenu: state.confidentialityMenu,
  selectedEnergy: state.importExportVisualization,
  tr: trSelector(state, props),
})

export default connect(mapStateToProps)(MapPiece)
