import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import ImportExportArrow from './ImportExportArrow'
import MapPieceLabel from './MapPieceLabel'
import ConfidentialIcon from './ConfidentialIcon'
import Constants from '../Constants'
import AnimatedMapPiece from './SVGAnimation/AnimatedMapPiece'
import SafeAnimation from './SVGAnimation/SafeAnimation'
import MapLayoutGridConstant from '../MapLayoutGridConstant'

import ExplanationDot from './ExplanationDot'

class MapPiece extends React.Component {
  static propTypes = {
    bins: PropTypes.instanceOf(Immutable.List),
    styles: PropTypes.instanceOf(Immutable.Map).isRequired,
    dimensions: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.instanceOf(Immutable.Map).isRequired,
    legend: PropTypes.bool,
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

  newYorkExplanation() {
    if (this.props.data.get('name') !== 'NY') { return null }
    return (<g>
      <ExplanationDot
        linePath="M110,43 C248,257 312,213 633,213"
        xPosition={18}
        yPosition={5}
        lineX={110}
        lineY={43}
        textX={60}
        textY={55}
        containerX={this.props.x1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 223}
        containerY={this.props.y1 * MapLayoutGridConstant.getIn(['electricity', 'us' , 'mapPieceScale'], 1) + 470}
        text="New York has the highest exports into the US as well as the highest imports from the US"
    /></g>)
  }

  renderMapPieceLabel(){
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
    let confidentialIcon = ''
    if (typeof this.props.data.get('confidentialCount') !== 'undefined' && this.props.data.get('confidentialCount') !== 0) {
      // TODO: on click show pop over to show confidential values
      confidentialIcon = <ConfidentialIcon styles={this.props.styles.get('confidentialStyle')} />
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
    
    return (
      <g fillOpacity={opacity} >
        <SafeAnimation
          cssAnimation={{
            transform: `translate(${this.props.x1}px, ${this.props.y1}px)`,
            transition: 'all 1s',
          }}
          fallbackAttributes={{
            transform: `translate(${this.props.x1} ${this.props.y1})`,
          }}
        >
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
          {this.newYorkExplanation()}
        </SafeAnimation>
      </g>
    )
  }
}

export default MapPiece
