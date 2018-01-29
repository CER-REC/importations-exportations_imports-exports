import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import PaddMapPiece from './PaddMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import {PaddSelector} from '../selectors/Padd'
import TRSelector from '../selectors/translate'

import './ElectricityMapLayout.scss'

import ElectricitySelector from '../selectors/ElectricitySelector'
import { arrangeBy, binSelector, sortAggregatedLocationsSelector } from '../selectors/data'

const mapPieceTransformStartTop = ( top, position, dimensions, mapPieceScale) => {
  return top + (position.get('x') * ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding')))
}
const mapPieceTransformStartLeft = ( left, position, dimensions, mapPieceScale) => {
  return left + (position.get('y') * ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding')))
}

class PaddLayout extends React.Component {
  static propTypes = {
    dataPoints: PropTypes.instanceOf(Immutable.Map).isRequired,
    arrangeBy: PropTypes.string.isRequired,
    importExportVisualization: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
  }

  onClick = () => {
    console.log('clicked on the padd')
  }
  getPaddColor(value) {
    if (value === -1) { return '#fff' }

    const index = this.props.bins.findIndex(range => range.get(0) < value && value < range.get(1))
    return Constants.getIn(
      ['styleGuide', 'exportColours', index],
      Constants.getIn(['styleGuide', 'colours', 'ExportDefault']),
    )
  }
  getArrow(orderBy, paddGroupId ){
    if(paddGroupId > 0){
      orderBy = orderBy === 'location'? orderBy : 'default'
      const country = this.props.country
      const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', country])
      const fontClassName = mapLayoutGrid.getIn(['arrow', 'fontClass'])
      const transformTranslate =  mapLayoutGrid.getIn(['arrow', 'orderBy', orderBy, paddGroupId.toString()])
      const transformText =  mapLayoutGrid.getIn(['arrow', 'textTranslate', paddGroupId.toString()])
      const text = this.props.TRSelector( ['Padd', country, paddGroupId.toString()])
      if(this.props.country === 'ca'){
        return <g className={fontClassName} transform={`translate(${transformTranslate})`}> 
        <text transform={`translate(${transformText})`}>{text}</text>
        <polygon transform="translate(0 140)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68"/>
      </g>  
      } else {
        return <g className={fontClassName} transform={`translate(${transformTranslate})`}> 
          <text transform={`translate(${transformText})`}>{text}</text>
          <polygon transform="translate(0 140)" points="149.98 18.68 168.81 26.14 187.48 18.66 187.48 17.99 184.09 17.99 184.08 14.51 152.98 14.5 152.95 17.99 149.98 17.99 149.98 18.68"/>
        </g>
      }
      
    }
    return null
  }
 renderPaddMapPiece(){
    // Data from constant file
    const type = this.props.importExportVisualization

    // fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', this.props.country])

    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === this.props.paddGroup)
    const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', this.props.country, `${this.props.paddGroup}`])
    const data = this.props.Padd.get(paddGroup)
    const color = this.getPaddColor(data.get('value'))
    /*
    
    <g
          className="mappiece"
          onClick={this.onClick( this.props.country, position.get('name'))}
          transform={`scale(${mapPieceScale})`}
        >
     */
    return layout.map((position, key) => (
        <PaddMapPiece
          key={`paddLayout_${this.props.country}_${position.get('name')}`}
          originKey= {position.get('originKey')}
          dimensions={dimensions}
          styles= {styles}
          color= {color}
          left = {mapPieceTransformStartLeft( this.props.left, position, dimensions, mapPieceScale)}
          top = {mapPieceTransformStartTop( this.props.top, position, dimensions, mapPieceScale)}
          isLabelRquired = {this.props.arrangeBy === 'location'}
        />
    ))
  }

  render() {
    //here you can also add fill as well as on click
    //add padding
    return <g transform={`translate(${this.props.paddingX} ${this.props.paddingY})`}>
      {this.renderPaddMapPiece()}
      {this.getArrow( 
        this.props.arrangeBy,
        this.props.paddGroup)}
      </g>
  }
}

const mapDispatchToProps = { }

const mapStateToProps = (state, props) => ({
  importExportVisualization: state.importExportVisualization,
  dataPoints: sortAggregatedLocationsSelector(state, props),
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  Padd: PaddSelector(state, props),
  TRSelector: TRSelector(state, props),
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(PaddLayout)
