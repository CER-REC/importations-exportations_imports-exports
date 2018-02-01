import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import { arrangeBy, binSelector, aggregateLocationNaturalGasSelector } from '../selectors/data'

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
  const arrangedData = this.orderBy(this.props.selector, this.props.arrangeBy)
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
    return null
  }
}

const mapStateToprops = (state, props) => {
  return {
    arrangeBy: arrangeBy(state, props),
    bins: binSelector(state, props),
    selector: aggregateLocationNaturalGasSelector(state,props)
  }
}

export default connect(mapStateToprops)(NaturalGasMapContainer)
