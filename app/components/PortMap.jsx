import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { geoConicConformal, geoPath } from 'd3-geo'
import { getSelectionSettings } from '../selectors/NaturalGasSelector'
import { feature } from 'topojson-client'
import Request from 'client-request/promise'
import Tr from '../TranslationTable'

import Constants from '../Constants'
import RouteComputations from '../computations/RouteComputations'

import trSelector from '../selectors/translate'

import ExplanationDot from './ExplanationDot'
import tr from '../TranslationTable'

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
    Request({
      uri: RouteComputations.topoEndpoint(),
      json: true,
    }).then(({ body: topoData }) => {
      this.setState({
        regions: feature(topoData, topoData.objects.regions).features,
        topoData,
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
  isPortSelected = (port, province) => {
    const isPortSelected = this.props.selectionSettings.get('ports').indexOf(port)
    const isProvinceSelected = this.props.selectionSettings.get('provinces').indexOf(province)
    if (isPortSelected !== -1 || isProvinceSelected !== -1) { return true }
    return false
  }

  isSelected() {
    const length = this.props.selectionSettings.get('ports').count() + this.props.selectionSettings.get('provinces').count()
    return (length > 0)
  }

  portMapExplanation() {
    const scaleContainerX = this.props.viewport.get('changeWidthRatio') > 1.2 ? 490 : 270
    const scaleContainerY = this.props.viewport.get('changeHeightRatio') > 1.2 ? 72 : 70
    return (<g transform="scale(3.9) translate(-300)">
      <ExplanationDot
        scale="scale(0.5)"
        lineStroke="1.5"
        textBoxWidth={130}
        textBoxHeight={100}
        linePath="
          M142.16,
          173.94l24.26,
          36.69a40.12,
          40.12,0,0,0,
          33.47,
          18H422.2"
        xPosition={405}
        yPosition={190}
        lineX={142.16}
        lineY={173}
        textX={20}
        textY={29}
        containerX={this.props.left + scaleContainerX - 87}
        containerY={this.props.top + scaleContainerY + 13} 
        name="portMapDot"
        text={`${this.props.tr(['explanations','portNaturalGas'])}`}
    /></g>)
  }

  renderDots(ports, projection){
    if(ports === null){
      return null
    }
    return ports.map((port) => {
      const portSelected = this.isPortSelected(port.get('Port Name'), port.get('Province'))
      const position = projection.pointRadius(10)({
        type: 'Point',
        coordinates: [port.get('Longitude'), port.get('Latitude')],
      })
      const fillColor = portSelected? Constants.getIn(['styleGuide', 'colours', 'NeutralMedium']) : Constants.getIn(['styleGuide', 'colours', 'SandMedium'])
      return (
        <path
          key={port.get('Port Name')}
          d={position}
          fill={fillColor}
        />
      )
    })
  }
  getPortMapLabel(){
    if(this.props.selectionSettings.get('provinces').count() > 0){
      if(this.props.selectionSettings.get('provinces').count() > 1){
        return Tr.getIn(['portMap','multiple', this.props.language])
      } else {
        return Tr.getIn(['country', 'ca', this.props.selectionSettings.get('provinces').first(), this.props.language]) 
      }
    }else if(this.props.selectionSettings.get('ports').count() > 0){
      if(this.props.selectionSettings.get('ports').count() > 1){
          return Tr.getIn(['portMap','multiple', this.props.language])
      } else {
        return Tr.getIn(['portMap','portName', this.props.selectionSettings.get('ports').first(), this.props.language], this.props.selectionSettings.get('ports').first())
      }
    }
    return Tr.getIn(['portMap', 'default', this.props.language]) 
    //''
  }
  render() {
    if (!this.state.topoData.bbox) { return null }
    const projection = geoPath().projection(this.projection())
    let nonSelected = null
    let selected = null
    if(this.isSelected()){
      nonSelected = Ports.filter(port => !this.isPortSelected(port.get('Port Name'), port.get('Province')))
      selected = Ports.filter(port => this.isPortSelected(port.get('Port Name'), port.get('Province')))
    } else {
      selected = Ports
    }
    const portDotsNonSelected = this.renderDots(nonSelected, projection)
    const portDotsSelected = this.renderDots(selected, projection)
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}>
      <text className="portName">{this.getPortMapLabel()}</text>
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
        {this.portMapExplanation()}
        {(nonSelected !== null && portDotsNonSelected.count() > 0)?portDotsNonSelected.toArray():null}
        {portDotsSelected.toArray()}
      </svg>
    )
  }
}

const mapStateToprops = (state, props) => {
  return {
    viewport: state.viewport,
    tr: trSelector(state, props),
    selectionSettings: getSelectionSettings(state, props),
    language: state.language,
  }
}

export default connect(mapStateToprops)(PortMap)
