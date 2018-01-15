const React = require('react')
const ReactRedux = require('react-redux')
const MapPiece = require('./MapPiece.jsx')
const MapLayoutGridConstant = require('../MapLayoutGridConstant.js')

import { setSelection } from '../actions/visualizationSettings.js'

require('./ElectricityMapLayout.scss')

const ElectrictySelector = require('../selectors/ElectricitySelector.js')
const { sortAggregatedLocationsSelector } = require('../selectors/data.js')

class ElectricityMapLayout extends React.Component {
  mapPieceTransform (xaxis, yaxis, position, dimensions, mapPieceScale){
    let startXaxis = xaxis + (position.get('x') * (mapPieceScale * dimensions.get('width') + dimensions.get('xAxisPadding')))
    let startYaxis = yaxis + (position.get('y') * (mapPieceScale * dimensions.get('height') + dimensions.get('yAxisPadding')))
    return`translate(${startXaxis+','+startYaxis}) scale(${mapPieceScale})`
  }

  onClick(country, originKey){
    const selection = this.props.selection
    let resultSelectedMapPieces = []
    if(selection.get('country') === country){
      const originKeyExists = selection.get('selectedMapPieces').indexOf(originKey)
      if(originKeyExists === -1){
        resultSelectedMapPieces = [ ...selection.get('selectedMapPieces'), originKey ]
      }else{
        resultSelectedMapPieces = selection.get('selectedMapPieces').filter(mappiece => mappiece !== originKey)
      }
    } else{
      resultSelectedMapPieces = [originKey]
    }


    //find all highlighted pieces destination
    let highlighted = {}
    resultSelectedMapPieces.forEach(destination => {
      let dataPoint =  this.props.dataPoints.get(destination)
      if(typeof dataPoint !== 'undefined'){
        let destinationCountries = dataPoint.get('destinationCountry')
        destinationCountries.forEach((value, key) => {
          if(key !== ''){
            highlighted[key] = highlighted[key]||[]
            highlighted[key] = highlighted[key].concat( value.toJS() )  
          }
        })
      }  
    })
    this.props.onMapPieceClick({
      country: country,
      selectedMapPieces: resultSelectedMapPieces,
      highlightedMapPieces : highlighted,
    })
  }

  isMapPieceSelected(key, country){
    let isSelected = this.props.selection.get('selectedMapPieces').indexOf(key)
    let result = false 
    if(isSelected !== -1){
      result = true
    } 
    if(typeof this.props.selection.get('highlightedMapPieces').get(country) !== 'undefined'){
      const existInList = this.props.selection.get('highlightedMapPieces').get(country).indexOf(key)
      result = result || ((existInList !== -1)?true: false)
    }
    return result
  }

  isSelected(){
    let length = this.props.selection.get('selectedMapPieces').size + this.props.selection.get('highlightedMapPieces').size
    return length > 0? true: false
  }


  render(){
    //Data from constant file
    const type = this.props.importExportVisualization
    
    //fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    
    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const layout = this.props.layout
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const xaxis = this.props.left
    const yaxis = this.props.top
    const isSelected = this.isSelected()
    return layout.map( (position,key) =>{

      return <g  className='mappiece' key = { key } onClick={this.onClick.bind(this, this.props.country, position.get('name'))} transform={this.mapPieceTransform(xaxis, yaxis, position, dimensions, mapPieceScale)} >
                <MapPiece 
                data = { position } 
                dimensions = { dimensions }
                legends = {MapLayoutGridConstant.getIn([type,'legends'])}
                styles = { styles }
                isMapPieceSelected = {this.isMapPieceSelected(position.get('name'), this.props.country)}
                isSelected = {isSelected}
                />
            </g>
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMapPieceClick: selection => {
      dispatch(setSelection(selection))
    }
  }
}

const mapStateToProps = (state,props) => {
  return {
    importExportVisualization: state.importExportVisualization,
    layout: ElectrictySelector.getElectrictyMapLayout(state,props),
    electricitySortState: state.electricitySortState,
    selection: ElectrictySelector.getSelectionSettings(state,props),
    dataPoints: sortAggregatedLocationsSelector(state)
    //selectedPowerPool: 'NE-ISO'
  }
}


module.exports = ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
  )(ElectricityMapLayout)
