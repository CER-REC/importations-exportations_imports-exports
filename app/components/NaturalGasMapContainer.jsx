import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'
import NaturalGasMapPiece from './NaturalGasMapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import { arrangeBy, binSelector, aggregateLocationNaturalGasSelector } from '../selectors/data'

const mapPieceTransformStartTop = ( top, dimensions, mapPieceScale) =>  (top * ((mapPieceScale * dimensions.get('height')) + dimensions.get('topPadding')))
const mapPieceTransformStartLeft = ( left, dimensions, mapPieceScale) => (left * ((mapPieceScale * dimensions.get('width')) + dimensions.get('leftPadding')))

class NaturalGasMapContainer extends React.PureComponent {
  orderBy(provinceList, arrangeBy){
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

  render(){
    //done
    //get data from the selector in form 2 hrs
    //  AB:{}
    //  BC:{}
    //  SK:{}
  //TODO
  const type = this.props.importExportVisualization
  const arrangedData = this.orderBy(this.props.selector, this.props.arrangeBy)

  // fetching nested values
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
      const x1 = mapPieceTransformStartLeft(column, dimensions, mapPieceScale) + leftPadding
      const y1 = mapPieceTransformStartTop(row++, dimensions, mapPieceScale) + topPadding

      topPadding += rowPadding
      return <NaturalGasMapPiece
        key={`NaturalGasMapPiece_${port.get('Province')}_${port.get('portName')}`}
        data={port}
        dimensions={dimensions}
        bins={this.props.bins}
        styles={styles}
        isMapPieceSelected={false}
        isSelected={false}
        x1={x1}
        y1={y1}
      />
    }) 
    leftPadding += dimensions.get('width') + columnPadding 
    column += 1
    topPadding = 0
    row = 0
    return (
      <g key={`NaturalGasMap_${value}`} >
        <text x={leftPadding - columnPadding - dimensions.get('width')}>{value}</text>
        {mapLayout.toArray()}
      </g>
    )
  } )

  return (
    <g key='NaturalGasMapContainer' transform={`translate(${this.props.left + 50} ${this.props.top})`}>
      {layout.toArray()}
    </g>
  )
  //pass data to the map pieces 2 hrs
  //  create a maplayout for natural gas
  //check arrange by and update the order 
  // rearrange the map pieces alphabatically or by othegr params
  // get order for the provinces constant file
  // [BC, AB, SK]
  //   iterate over the order from the constant file
  // fetch number of columns and translate position using the add newline after cloumn is filled and if its last then center it to the middle
  // fetch data from the selector on the basis of key and pass it to the map pieces
  //create map piece
  //  fetch data and pass it to the map pieces
  //populate map piece
  //  populate arrow position using constant file
  }
}

const mapStateToprops = (state, props) => {
  return {
    importExportVisualization: state.importExportVisualization,
    arrangeBy: arrangeBy(state, props),
    bins: binSelector(state, props),
    selector: aggregateLocationNaturalGasSelector(state,props)
  }
}

export default connect(mapStateToprops)(NaturalGasMapContainer)
