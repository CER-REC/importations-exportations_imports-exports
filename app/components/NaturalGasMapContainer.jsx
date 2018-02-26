import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fromJS} from 'immutable'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'
import MapPiece from './MapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import { arrangeBy, binSelector, aggregateLocationNaturalGasSelector } from '../selectors/data'
import { getSelectionSettings } from '../selectors/NaturalGasSelector'
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
  getAllPortsByProvinceName = (provinces) =>{
    const portList = Constants.getIn(['dataloader','mapping','ports'])
    let result = portList.filter(port=> provinces.includes(port.get('Province')))
    result = result.reduce((acc, nextValue) => {
      acc.push(nextValue.get('Port Name'))
      return  acc
    }, [])
    return result
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
      ports = this.getAllPortsByProvinceName(provinces)
    } else{
      ports = selection.get('provinces').count() > 0 ?[]:selection.get('ports').toJS()
      const portExists = selection.get('ports').indexOf(portName)
      if (portExists === -1) {
        ports.push(portName)
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

  render(province){
    const type = this.props.importExportVisualization
    const arrangedData = this.orderBy(this.props.selector, this.props.arrangeBy)
    const mapLayoutGrid = MapLayoutGridConstant.get(type)

    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    let layout = mapLayoutGrid.get('layout')
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const rowPadding = 0
    const columnPadding = 30

    let leftPadding = 0
    let topPadding = 0
    let provinceRendered =0
    layout =  layout.map((value) => {
      const ports = arrangedData.get(value, fromJS({}))
      const portsCount = ports.count()
      const maximunRows = portsCount > 7 ? Math.ceil(portsCount / 2): portsCount
      
      let renderingNumber = 1
      let leftRendered = 0
      let row = 1
      let column = 0
      provinceRendered += 1
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
          {...handleInteraction(this.onClick, port.get('portName'))}
          transform={`scale(${mapPieceScale})`}>
            <MapPiece
              data={port}
              dataKey={['activities']}
              dimensions={dimensions}
              bins={this.props.bins}
              styles={styles}
              isMapPieceSelected={this.isMapPieceSelected( port.get('portName'), value)}
              isSelected={this.isSelected()}
              isOrigin={true}
              mapPieceKey='portName'
              mapPieceStyleClass = 'portLabel'
              x1={left}
              y1={top}
            />
          </g>)
      }) 
      const provinceTextPosition =  portsCount > 7 ? leftPadding + columnPadding+ dimensions.get('width') - 95 : provinceRendered * 55 - 45 
      leftPadding += dimensions.get('width') + columnPadding 
      leftPadding = portsCount > 7 ? leftPadding + columnPadding + 20: leftPadding
      column += 1
      topPadding = 0
      row = 0
      if(portsCount > 7){
        provinceRendered += 0.75
      }
      const isProvinceSelected = this.props.selectionSettings.get('provinces').indexOf(value)
      const provinceClass = isProvinceSelected !== -1 ? 'provinceSelected': 'provinceDeselected'
      return (
        <g className="paddLayout" key={`NaturalGasMap_${value}`} >
          <rect class={`${provinceClass}`} x={ provinceTextPosition - 9} y={dimensions.get('topPadding') - 15}  
            width="29" height="15" fill="none" stroke="#a99372" strokeWidth="0.75"/>
          <text className="portProvinceLabel" x={ provinceTextPosition -4} y={dimensions.get('topPadding') - 2} 
          {...handleInteraction(this.onClick, '', value)}>{value}</text>
          {mapLayout.toArray()}
        </g>
      )
    } )

    return (
      <g key='NaturalGasMapContainer' transform={`scale(${this.props.viewport.get('changeWidthRatio')} ${this.props.viewport.get('changeHeightRatio')}) translate(${this.props.left} ${this.props.top})`}>
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
    viewport: state.viewport,
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(NaturalGasMapContainer)
