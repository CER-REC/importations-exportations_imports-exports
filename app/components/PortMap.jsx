import React from 'react'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import Constants from '../Constants'

/* eslint-disable object-curly-newline */
const Ports = Constants.getIn(['dataloader', 'mapping', 'ports'], []).filter(v => (v.get('Latitude') && v.get('Longitude'))) // Strip missing coordinates
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
        coordinates: [port.get('Longitude'), port.get('Latitude')],
      })
      return (
        <path
          key={port.get('Port Name')}
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
        {portDots.toArray()}
      </svg>
    )
  }
}

export default PortMap
