import React from 'react'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'
import MapLayoutGridConstant from '../MapLayoutGridConstant'

class NaturalGasMapContainer extends React.PureComponent {
  //get data from the selector in form 2 hrs
  //  AB:{}
  //  BC:{}
  //  SK:{}
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

export default NaturalGasMapContainer
