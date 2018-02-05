import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'
import NaturalGasMapPiece from './NaturalGasMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import { arrangeBy, binSelector, aggregateLocationNaturalGasSelector } from '../selectors/data'
import { getSelectionSettings } from '../selectors/naturalGasSelector'
import { handleInteraction } from '../utilities'
import { setSelection } from '../actions/visualizationSettings'

const mapPieceTransformStartTop = ( top, dimensions, mapPieceScale) =>  top * ((mapPieceScale * dimensions.get('height')) + dimensions.get('topPadding'))
const mapPieceTransformStartLeft = ( left, dimensions, mapPieceScale) => (left * ((mapPieceScale * dimensions.get('width')) + dimensions.get('leftPadding')))

class NaturalGasMapContainer extends React.PureComponent {
  orderBy = (provinceList, arrangeBy) => {
    return provinceList.map((points) => {
      switch (arrangeBy){
        case 'exports':
        case 'imports':
          return points.sort(
            (a, b) => b.getIn(['activities', arrangeBy], 0) - a.getIn(['activities', arrangeBy], 0)
          )
        case 'location':
        default:
          return points.sort(
            (a, b) => a.get('portName').localeCompare(b.get('portName'))
          )
      }
    })
  }

  onClick = ( portName, provinceName = null) => {
    const selection =  this.props.selectionSettings
    let ports = []
    let provinces = []
    if(provinceName !== null){
      provinces = [provinceName]
      const provinceExists = selection.get('provinces').indexOf(provinceName)
      if (provinceExists === -1) {
        provinces = selection.get('provinces').push(provinceName).toJS()
      } else {
        provinces = selection.get('provinces').delete(provinceExists)
      }
    } else{
      const portExists = selection.get('ports').indexOf(portName)
      if (portExists === -1) {
        ports = selection.get('ports').push(portName).toJS()
      } else {
        ports = selection.get('ports').delete(portExists)
      }
    }
    this.props.onMapPieceClick({
      provinces,
      ports,
    })
  }

  isMapPieceSelected = (port, province) => {
    const isPortSelected = this.props.selectionSettings.get('ports').indexOf(port)
    const isProvinceSelected = this.props.selectionSettings.get('provinces').indexOf(province)
    if (isPortSelected !== -1 || isProvinceSelected !== -1) { return true }
    return false
  }

  isSelected() {
    const length = this.props.selectionSettings.get('ports').count() + this.props.selectionSettings.get('provinces').count()
    return (length > 0)
  }

  render(){
  const type = this.props.importExportVisualization
  const arrangedData = this.orderBy(this.props.selector, this.props.arrangeBy)

  const mapLayoutGrid = MapLayoutGridConstant.get(type)

  const dimensions = mapLayoutGrid.get('dimensions')
  const styles = mapLayoutGrid.get('styles')
  let layout = mapLayoutGrid.get('layout')
  const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
  const rowPadding = 0
  const columnPadding = 50

  let leftPadding = 0
  let topPadding = 0
  layout =  layout.map((value) => {
    const ports = arrangedData.get(value)
    const portsCount = ports.count()
    const maximunRows = portsCount > 7 ? Math.round(portsCount / 2): portsCount
    
    let renderingNumber = 1
    let leftRendered = 0
    let row = 1
    let column = 0

    const mapLayout = ports.map( (port,key) => {
      if(row > maximunRows) {
        column += 1
        row = 1
        topPadding = 0 
      }
      //x1 = left
      //y1 = top
      const left = mapPieceTransformStartLeft(column, dimensions, mapPieceScale) + leftPadding
      const top = mapPieceTransformStartTop(row, dimensions, mapPieceScale) + topPadding
      topPadding += rowPadding
      row +=1
      return (<g key={`NaturalGasMapPiece_${port.get('Province')}_${port.get('portName')}`} 
        {...handleInteraction(this.onClick, port.get('portName'))}>
          <NaturalGasMapPiece
            data={port}
            dimensions={dimensions}
            bins={this.props.bins}
            styles={styles}
            isMapPieceSelected={this.isMapPieceSelected( port.get('portName'), value)}
            isSelected={this.isSelected()}
            x1={left}
            y1={top}
          />
        </g>)
    }) 
    const provinceTextPosition =  portsCount > 7 ? leftPadding +  dimensions.get('width')*0.7 : leftPadding + dimensions.get('width')*0.20
    leftPadding += dimensions.get('width') + columnPadding 
    leftPadding = portsCount > 7 ? leftPadding + columnPadding: leftPadding
    column += 1
    topPadding = 0
    row = 0
    return (
      <g key={`NaturalGasMap_${value}`} >
        <text className="portProvinceLabel" x={ provinceTextPosition } y={dimensions.get('topPadding')} 
        {...handleInteraction(this.onClick, '', value)}>{value}</text>
        {mapLayout.toArray()}
      </g>
    )
  } )

  return (
    <g key='NaturalGasMapContainer' transform={`translate(${this.props.left + 50} ${this.props.top})`}>
      {layout.toArray()}
    </g>
  )
  }
}
const mapDispatchToProps = { onMapPieceClick: setSelection }

const mapStateToprops = (state, props) => {
  return {
    importExportVisualization: state.importExportVisualization,
    arrangeBy: arrangeBy(state, props),
    bins: binSelector(state, props),
    selector: aggregateLocationNaturalGasSelector(state,props),
    selectionSettings: getSelectionSettings(state, props),
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(NaturalGasMapContainer)
