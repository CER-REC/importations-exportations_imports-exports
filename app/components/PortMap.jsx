import React from 'react'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'

/* eslint-disable object-curly-newline */
const Ports = [
  { 'Port Name': 'Aden', Province: 'AB', Latitude: 48.997778, Longitude: -111.258056, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Cardston', Province: 'AB', Latitude: 49.2025, Longitude: -113.301944, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Coutts', Province: 'AB', Latitude: 49, Longitude: -111.95, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Reagan Field', Province: 'AB', Latitude: 48.975278, Longitude: -112.512778, '': 'US', Description: '', Capacity: '' },
  { 'Port Name': 'Sierra', Province: 'AB', Latitude: 49.0023, Longitude: -111.9648, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Blaine', Province: 'BC', Latitude: 49.1044, Longitude: -122.8011, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Huntingdon', Province: 'BC', Latitude: 49, Longitude: -122.266667, '': 'US', Description: 'Huntingdon is an export point on the Westcoast system. Westcoast extends from points in the Yukon Territory, the Northwest Territories, Alberta and B.C. to the Canada-U.S. border near Huntingdon, B.C. At the border, Westcoast connects to Williams Northwest Pipeline, which supplies natural gas to the U.S. Pacific Northwest market.', Capacity: 1.7 },
  { 'Port Name': 'Kingsgate', Province: 'BC', Latitude: 49, Longitude: -116.1833, '': 'US', Description: 'Kingsgate is an export point on the  Foothills BC pipeline. The Foothills BC system transports natural gas from the WCSB to a point on the Canada U.S. border near Kingsgate, BC. At the border, Foothills BC connects to the Gas Transmission Northwest system, which serves markets in the Pacific Northwest and California.', Capacity: 1.6 },
  { 'Port Name': 'Emerson', Province: 'MB', Latitude: 49.006944, Longitude: -97.2078, '': '', Description: 'Emerson is an export point on the TransCanada Mainline. At the border point, the Mainline connects with the Great Lakes Gas Transmission and Viking pipelines, suppling markets in the mid-continent, as well as Ontario and Quebec.', Capacity: 2.9 },
  { 'Port Name': 'Sprague', Province: 'MB', Latitude: 49.035278, Longitude: -95.639167, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Brunswick', Province: 'NB', Latitude: 45.166111, Longitude: -67.2425, '': 'US', Description: 'Brunswick is an export point on the Emera Brunswick pipeline. The Brunswick Pipeline was commissioned in July 2009 and transports re-gasified natural gas 145 km from the Canaport LNG terminal near Saint John, NB to the Canada-US border near St. Stephen,', Capacity: 1 },
  { 'Port Name': 'Canaport', Province: 'NB', Latitude: 45.2733, Longitude: -66.0633, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'St Stephen', Province: 'NB', Latitude: 45.2, Longitude: -67.283333, '': '', Description: 'St Stephen is an export point on the Maritimes and Northeast Pipeline, which supplies markets in the Martitimes and New England.', Capacity: 0.55 },
  { 'Port Name': 'Chippawa', Province: 'ON', Latitude: 43.055833, Longitude: -79.046944, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Cornwall', Province: 'ON', Latitude: 45.0275, Longitude: -74.74, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Corunna', Province: 'ON', Latitude: 42.9745, Longitude: -82.4066, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Courtright', Province: 'ON', Latitude: 42.78333, Longitude: -82.35, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Fort Frances', Province: 'ON', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Iroquois', Province: 'ON', Latitude: 44.91667, Longitude: -75.26667, '': '', Description: 'Iroquois is an export point on the TransCanada Mainline.', Capacity: 1.2 },
  { 'Port Name': 'Niagara Falls', Province: 'ON', Latitude: 43.0896, Longitude: -79.0849, '': '', Description: 'Niagara Falls is an export point on the TransCanada Mainline.', Capacity: 0.7 },
  { 'Port Name': 'Ojibway (Windsor)', Province: 'ON', Latitude: 42.2659, Longitude: -83.0779, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Rainy River', Province: 'ON', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Sarnia', Province: 'ON', Latitude: 42.9745, Longitude: -82.4066, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Sarnia/Blue Water', Province: 'ON', Latitude: 42.999444, Longitude: -82.308889, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Sault Ste Marie', Province: 'ON', Latitude: 46.5219, Longitude: -84.3461, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'St Clair', Province: 'ON', Latitude: 42.78333, Longitude: -82.35, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Armstrong', Province: 'QB', Latitude: 45.8661, Longitude: -70.4332, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Champlain', Province: 'QB', Latitude: 44.9688, Longitude: -73.4498, '': 'US', Description: '', Capacity: '' },
  { 'Port Name': 'East Hereford', Province: 'QB', Latitude: 45.08333, Longitude: -71.5, '': '', Description: 'East Hereford is an export point on the TransCanada Mainline. At the border, the Mainline connects with the Portland Natura Gas Transmission, which serves markets in New England and the Maritimes.', Capacity: 0.25 },
  { 'Port Name': 'Highgate Springs', Province: 'QB', Latitude: 44.9795, Longitude: -73.1054, '': 'US', Description: '', Capacity: '' },
  { 'Port Name': 'Highwater', Province: 'QB', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Napierville', Province: 'QB', Latitude: 45.187058, Longitude: -73.401632, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Philipsburg', Province: 'QB', Latitude: 45.0333, Longitude: -73.05, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Elmore', Province: 'SK', Latitude: 49, Longitude: -101.633, '': '', Description: 'Elmore is an export point on the Alliance Pipeline. The Alliance pipeline is unique among major Canadian gas pipelines because natural gas liquids may be left in the gas stream. The system draws from 52 receipt points, largely concentrated near the northern end of the system in northeastern B.C. and northwestern Alberta. Alliance transports liquids-rich gas to the Chicago market hub. Extraction of natural gas liquids occurs at the Aux Sable facility located near Chicago', Capacity: 1.7 },
  { 'Port Name': 'Loomis', Province: 'SK', Latitude: 49.2, Longitude: -108.7333, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Monchy', Province: 'SK', Latitude: 49.01667, Longitude: -107.833889, '': '', Description: 'Monchy is an export point on the Foothills Saskatchewan pipeline. The Foothills SK system transports natural gas from the WCSB to the Canada U.S. border near Monchy, Saskatchewan. At the border, it connects to the Northern Border pipeline, which serves markets in the U.S. Midwest', Capacity: 2.9 },
  { 'Port Name': 'North Portal', Province: 'SK', Latitude: 49.054, Longitude: -102.668, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Port of Estevan', Province: 'SK', Latitude: 49.1231, Longitude: -102.9915, '': '', Description: '', Capacity: '' },
  { 'Port Name': 'Willow Creek', Province: 'SK', Latitude: '', Longitude: '', '': '', Description: '', Capacity: '' },
].filter(v => (v.Latitude && v.Longitude)) // Strip missing coordinates
/* eslint-enable */

const viewbox = { width: 960.6, height: 931.4 }

class PortMap extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      topoData: {},
      regions: [],
    }
  }

  componentDidMount() {
    fetch('data/topo.json').then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`)
        return
      }
      response.json().then((topoData) => {
        this.setState({
          regions: feature(topoData, topoData.objects.regions).features,
          topoData,
        })
      })
    })
  }

  projection() {
    const { bbox } = this.state.topoData
    const dataCenter = [
      (bbox[0] + bbox[2]) / 2,
      (bbox[1] + bbox[3]) / 2,
    ]
    const dataWidth = bbox[2] - bbox[0]
    const dataHeight = bbox[3] - bbox[1]
    const baseScale = Math.min(viewbox.width / dataWidth, viewbox.height / dataHeight)

    let projection = geoConicConformal()
      .parallels([49, 77])
      .rotate([-dataCenter[0], 0])

    // Center and scale so that the viewport contains the bounding box
    projection = projection.scale(baseScale)
    const xy1 = projection([bbox[0], bbox[3]]) // northwest
    const xy2 = projection([bbox[2], bbox[1]]) // southeast
    const xyCenter = [(xy1[0] + xy2[0]) / 2, (xy1[1] + xy2[1]) / 2]

    const xy3 = projection([bbox[0], bbox[1]]) // southwest
    const xy4 = projection([bbox[2], bbox[3]]) // northeast
    const xy5 = projection([(bbox[0] + bbox[2]) / 2, bbox[1]]) // due south

    const xMin = Math.min(xy1[0], xy2[0], xy3[0], xy4[0], xy5[0])
    const xMax = Math.max(xy1[0], xy2[0], xy3[0], xy4[0], xy5[0])
    const yMin = Math.min(xy1[1], xy2[1], xy3[1], xy4[1], xy5[1])
    const yMax = Math.max(xy1[1], xy2[1], xy3[1], xy4[1], xy5[1])

    const xySize = [xMax - xMin, yMax - yMin]
    const center = projection.invert(xyCenter)
    const scale = Math.min(viewbox.width / xySize[0], viewbox.height / xySize[1]) * baseScale * 1.25

    return projection
      .center([0, center[1]])
      .scale(scale)
      // Need to manually center it a bit, as the bounding box extends beyond Canada
      .translate([(viewbox.width / 2) - 75, viewbox.height / 2])
      .precision(0.2)
  }

  render() {
    if (!this.state.topoData.bbox) { return null }
    const projection = geoPath().projection(this.projection())
    const portDots = Ports.map((port) => {
      const position = projection.pointRadius(10)({
        type: 'Point',
        coordinates: [port.Longitude, port.Latitude],
      })
      return (
        <path
          key={port['Port Name']}
          d={position}
          fill={Constants.getIn(['styleGuide', 'colours', 'SandMedium'])}
        />
      )
    })

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}>
        <g className="regions">
          {
            this.state.regions.map((d, i) => (
              <path
                key={`path-${i}`}
                d={projection(d)}
                className="region"
                fill={Constants.getIn(['styleGuide', 'colours', 'SandLight'])}
                stroke="#fff"
                strokeWidth="2"
              />
            ))
          }
        </g>
        {portDots}
      </svg>
    )
  }
}

export default PortMap
