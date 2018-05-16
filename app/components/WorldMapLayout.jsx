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
import { binSelector } from '../selectors/data'

import { handleInteractionWithTabIndex } from '../utilities'

const emptyMap = new Immutable.Map()

const mapPieceTransformStartXaxis = (position, dimensions, mapPieceScale) =>
  position.get('x') *
    ((mapPieceScale * dimensions.get('width')) + dimensions.get('xAxisPadding'))
const mapPieceTransformStartYaxis = (position, dimensions, mapPieceScale) =>
  position.get('y') *
    ((mapPieceScale * dimensions.get('height')) + dimensions.get('yAxisPadding'))

class WorldMapLayout extends React.Component {
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
    this.props.onMapPieceClick({
      country,
      origins,
    })
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
    const type = 'crudeOilImports'

    // fetching nested values
    const mapLayoutGrid = MapLayoutGridConstant.getIn([type, this.props.country])
    console.log(mapLayoutGrid)
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
  bins: binSelector(state, props),
  Tr: TrSelector(state, props),
  unit: visualizationSettings(state, props).get('amount'),
  viewport: state.viewport,
})

export default connect(mapStateToProps, mapDispatchToProps)(WorldMapLayout)
