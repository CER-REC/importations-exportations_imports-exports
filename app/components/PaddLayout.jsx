import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import PaddMapPiece from './PaddMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import {PaddSelector} from '../selectors/Padd'
import TRSelector from '../selectors/translate'

import PaddOne from './Padds/PaddOne'
import PaddTwo from './Padds/PaddTwo'
import PaddThree from './Padds/PaddThree'
import PaddFour from './Padds/PaddFour'
import PaddFive from './Padds/PaddFive'

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

  renderDefault(props){
    const paddData = Array
      .from(props.Padd)
      .sort((a, b) => {
        return b[1].get('value') - a[1].get('value') ;
      })
    let left = props.left
    const paddingBetweenSortedElement = 100
    const layout = paddData.reduce((acc, currentValue) => { 
      let paddLayout = null
      if(currentValue[0] !== 'ca'){
        let paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', 'us'],[]).toArray().indexOf(currentValue[1].get('destination'))
        paddGroup = paddGroup+1
        const text = props.TRSelector( ['Padd', props.country, paddGroup.toString()])
        const color = this.getPaddColor(currentValue[1].get('value'))
        switch(paddGroup){
          case 1:
            paddLayout = <PaddOne color={color} arrowLabel={text}/>
          break;
          case 2:
            paddLayout = <PaddTwo color={color} arrowLabel={text}/>
          break;
          case 3:
            paddLayout = <PaddThree color={color} arrowLabel={text}/>
          break;
          case 4:
            paddLayout = <PaddFour color={color} arrowLabel={text}/>
          break;
          case 5:
            paddLayout =  <PaddFive color={color} arrowLabel={text}/>
          break;
        }
        paddLayout = <g key={`${props.arrangeBy}_${currentValue[1].get('destination')}`} transform = {`translate(${ left} 0)`}>
          {paddLayout}
          { this.getArrow( props.arrangeBy, paddGroup) }
        </g>
        left += paddingBetweenSortedElement
      }
      if(paddLayout !== null){
        acc.push(paddLayout)    
      }    
      return acc
      }, [])
    return layout
  }

  renderLocation(props){
    const type = props.importExportVisualization
      const mapLayoutGrid = MapLayoutGridConstant.getIn(['PaddLayout', props.country])
      const dimensions = mapLayoutGrid.get('dimensions')
      const styles = mapLayoutGrid.get('styles')
      const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
      const layout = mapLayoutGrid.get('layout').filter(point => point.get('paddGroup') === props.paddGroup)
      const paddGroup = Constants.getIn(['dataloader', 'mapping', 'padd', props.country, `${props.paddGroup}`])
      const data = props.Padd.get(paddGroup)
      const color = this.getPaddColor(data.get('value'))
      return layout.map((position, key) => (
          <PaddMapPiece
            key={`paddLayout_${props.country}_${position.get('name')}`}
            originKey= {position.get('originKey')}
            dimensions={dimensions}
            styles= {styles}
            color= {color}
            left = {mapPieceTransformStartLeft( props.left, position, dimensions, mapPieceScale)}
            top = {mapPieceTransformStartTop( props.top, position, dimensions, mapPieceScale)}
            isLabelRquired = {props.arrangeBy === 'location'}
          />
      ))
  }

 renderPaddMapPiece(){
    if(this.props.arrangeBy === 'location' || this.props.country === 'ca'){
      return this.renderLocation(this.props)
    }
    else {
      return this.renderDefault(this.props)
    }
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
