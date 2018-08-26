import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import MapPiece from './MapPiece'
import MapLayoutGridConstant from '../MapLayoutGridConstant'
import Constants from '../Constants'
import Tr from '../TranslationTable'
import TrSelector from '../selectors/translate'
import {
  visualizationSettings,
  showImportsSelector,
  showExportsSelector,
} from '../selectors/visualizationSettings'

import { setSelection } from '../actions/visualizationSettings'
import './ElectricityMapLayout.scss'

import { getMapLayout } from '../selectors/mapLayout'
import { arrangeBy, binSelector } from '../selectors/data'
import { handleInteractionWithTabIndex, analyticsReporter } from '../utilities'

const emptyMap = new Immutable.Map()

const mapPieceTransformStartXaxis = (position, dimensions, mapPieceScale) =>
  position.get('x') *
    ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding'))
const mapPieceTransformStartYaxis = (position, dimensions, mapPieceScale) =>
  position.get('y') *
    ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding'))


class ElectricityMapLayout extends React.Component {
  static propTypes = {
    /*
    selection: PropTypes.instanceOf(Immutable.Map).isRequired,
    dataPoints: PropTypes.instanceOf(Immutable.Map).isRequired,
    filteredDataPoints: PropTypes.instanceOf(Immutable.Map).isRequired,
    onMapPieceClick: PropTypes.func.isRequired,
    arrangeBy: PropTypes.string.isRequired,
    layout: PropTypes.instanceOf(Immutable.List).isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    */
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick = (country, originKey) => {
    const { selection } = this.props
    let origins = [originKey]
    if (selection.get('country') === country) {
      const originKeyExists = selection.get('origins').indexOf(originKey)
      if (originKeyExists === -1) {
        origins = selection.get('origins').concat(originKey)
      } else {
        origins = selection.get('origins').delete(originKeyExists)
      }
    }



    /** Analytics reporting: start */
    // Creating event detail
    const eventDetail = `${country}  ${originKey}`
    if (this.isMapPieceSelected(originKey, country)) {
      analyticsReporter(
        Constants.getIn(['analytics', 'category', 'mapPiece']),
        Constants.getIn(['analytics', 'action', 'unselected']),
        eventDetail,
      )
    } else {
      analyticsReporter(
        Constants.getIn(['analytics', 'category', 'mapPiece']),
        Constants.getIn(['analytics', 'action', 'selected']),
        eventDetail,
      )
    }
    /** Analytics reporting: Finish */
    this.props.onMapPieceClick({
      country,
      origins,
    })
  }

  getPowerPoolsOutline(key, country, xaxis, yaxis, position, dimensions, mapPieceScale) {
    if (this.isMapPieceSelected(key, country) && this.props.selection.get('country') === 'powerpool' && this.props.arrangeBy === 'location') {
      let result = ''
      let transform = '0 0'
      switch (key) {
        case 'PJM':
          transform = (this.props.viewport.get('changeWidthRatio')) > 1.2 ? 'scale(0.985 1.02) translate(-250 -352)' : 'scale(0.98 1.01) translate(-246.5 -343)'
          result = (<polygon
            className="powerPoolOutline"
            points="121.5,148.5 143.7,139.3 166,148.5 166,175.3 187.7,186.8 210.5,175.3 232.6,186.5 255.7,175.3
                    278,186.8 278,213.2 255.7,223.8 255.7,250.8 278.1,263.5 278,288.6 255.7,300 233.3,288.6 233.3,263.3 210.5,250.8 187.7,263.3
                    187.7,288.6 166,300 143.8,288.7 121.5,300 99.6,288.6 99.6,263.3 77,251.1 77,224.7 55.2,213.1 55.2,186.8 76.9,175.3 99.6,186.8
                    121.5,175.3 "
          />)
          break
        case 'MN/ND':
          transform = (this.props.viewport.get('changeWidthRatio')) > 1.2 ? 'scale(1 1.01) translate(-457 -354)' : 'scale(1 1.01) translate(-453 -345)'
          result = (<polygon
            className="powerPoolOutline"
            points="154.5,149.5 176.8,140.3 198.8,149.5 221,140.3 243.7,149.5 243.7,176.3 221,187.8 198.8,175.8
                    176.8,187.8 154.5,176.4 "
          />)
          break
        case 'NE-ISO':
          transform = (this.props.viewport.get('changeWidthRatio')) > 1.2 ? 'scale(1) translate(-162 -374)' : 'translate(-158 -364)'
          result = (<polygon
            className="powerPoolOutline"
            points="144.3,128.1 167,118.9 189,128.2 211.2,118.9 233.2,128.2 233.2,155.1 255.6,167.5 255.6,194.3
                  233.2,205.8 233.2,232.1 211.5,242.8 211.5,269.8 189.1,282.5 166.7,269.8 166.7,242.8 189,232.2 189,205.8 166.7,194.3
                  166.7,167.5 144.3,155.1 "
          />)
          break
        default:
          result = ''
      }
      return (
        <g transform={transform} >
          {result}
        </g>
      )
    }
    return null
  }
  isMapPieceSelected(key, country) {
    const isSelected = this.props.selection.get('origins').indexOf(key)
    if (isSelected !== -1) { return true }
    return this.props.selection.getIn(['destinations', country], new Immutable.List()).has(key)
  }
  isSelected() {
    const length = this.props.selection.get('origins').count()
    return (length > 0)
  }
  renderMapPiece() {
    // Data from constant file
    const type = 'electricity'

    // fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])

    const dimensions = mapLayoutGrid.get('dimensions')
    const styles = mapLayoutGrid.get('styles')
    const { layout } = this.props
    const mapPieceScale = mapLayoutGrid.get('mapPieceScale')
    const xaxis = this.props.left
    const yaxis = this.props.top
    const isSelected = this.isSelected()
    return layout
      .get('tilePositions')
      .sortBy((_, key) => key)
      .map((position, key) => {
        const humanName = this.props.Tr(['country', this.props.country, key])
        const value = layout.getIn(['values', key], emptyMap)
        return (
          <g key={`mapPieceKey_${this.props.country}_${key}`}>
            <g
              className="mappiece"
              {...handleInteractionWithTabIndex(
                layout.getIn(['tabIndexes', key]),
                this.onClick,
                this.props.country,
                key,
              )}
              aria-label={this.props.Tr(
                'mapTileLabel',
                humanName,
                value.get('imports', 0).toLocaleString(),
                value.get('exports', 0).toLocaleString(),
                this.props.unit,
              )}
              transform={`scale(${mapPieceScale})`}
            >
              <MapPiece
                value={value}
                confidential={layout.getIn(['confidential', key], emptyMap)}
                missing={layout.getIn(['missing', key], emptyMap)}
                totalPoints={layout.getIn(['totalPoints', key], emptyMap)}
                tilePosition={layout.getIn(['tilePositions', key], emptyMap)}
                dimensions={dimensions}
                legends={MapLayoutGridConstant.getIn([type, 'legends'])}
                bins={this.props.bins}
                styles={styles}
                isMapPieceSelected={this.isMapPieceSelected(key, this.props.country)}
                isSelected={isSelected}
                mapPieceStyleClass="mapPieceText"
                isOrigin={(this.props.selection.get('country') === this.props.country)}
                x1={mapPieceTransformStartXaxis(position, dimensions, mapPieceScale)}
                y1={mapPieceTransformStartYaxis(position, dimensions, mapPieceScale)}
                containerX={this.props.left}
                containerY={this.props.top}
                country={this.props.country}
                name={key}
              />
              {this.getPowerPoolsOutline(key, this.props.country, xaxis, yaxis, position, dimensions, mapPieceScale)}
            </g>
          </g>
        )
      })
      .toArray()
  }

  render() {
    return (<g>
      {this.renderMapPiece()}
    </g>)
  }
}

const mapDispatchToProps = { onMapPieceClick: setSelection }

const mapStateToProps = (state, props) => ({
  layout: getMapLayout(state, props),
  selection: visualizationSettings(state, props).get('selection'),
  arrangeBy: arrangeBy(state, props),
  bins: binSelector(state, props),
  Tr: TrSelector(state, props),
  unit: visualizationSettings(state, props).get('amount'),
  viewport: state.viewport,
})

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityMapLayout)
